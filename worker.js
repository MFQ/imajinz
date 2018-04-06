const NodeResque = require('node-resque');
const jobs = require('./jobs');
const connectionDetails = require('./config/redis.js');

async function boot() {
  // /////////////////
  // START A WORKER //
  // /////////////////

  const worker = new NodeResque.Worker({ connection: connectionDetails, queues: ['images'] }, jobs);
  await worker.connect();
  // optional: cleanup any previous improperly shutdown workers on this host
  await worker.workerCleanup();
  worker.start();

  // //////////////////////
  // REGESTER FOR EVENTS //
  // //////////////////////

  worker.on('start', () => { console.log('worker started'); });
  worker.on('end', () => { console.log('worker ended'); });
  worker.on('cleaning_worker', (_worker, pid) => { console.log(`cleaning old worker ${_worker} and PID ${pid}`); });
  worker.on('poll', (queue) => { console.log(`worker polling ${queue}`); });
  worker.on('job', (queue, job) => { console.log(`working job ${queue} ${JSON.stringify(job)}`); });
  worker.on('reEnqueue', (queue, job, plugin) => { console.log(`reEnqueue job (${plugin}) ${queue} ${JSON.stringify(job)}`); });
  worker.on('success', (queue, job, result) => { console.log(`job success ${queue} ${JSON.stringify(job)} >> ${result}`); });
  worker.on('failure', (queue, job, failure) => { console.log(`job failure ${queue} ${JSON.stringify(job)} >> ${failure}`); });
  worker.on('error', (error, queue, job) => { console.log(`error ${queue} ${JSON.stringify(job)}  >> ${error}`); });
  worker.on('pause', () => { console.log('worker paused'); });

  // ////////////////////////////
  // EXITING WORKER GRACEFULLY //
  // ////////////////////////////

  const shutdownTimeout = 1000 * 60;
  const stopProcess = () => {
    setTimeout(() => {
      throw new Error('process stop timeout reached.  terminating now.');
    }, shutdownTimeout);
    worker.end();
    worker.on('end', process.exit);
  };

  process.on('SIGINT', stopProcess);
  process.on('SIGTERM', stopProcess);
}
boot();
