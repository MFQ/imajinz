$('.delete').click((e) => {
  var el = $(e.target);
  var url = el.data('url');
  $.ajax({
    method: 'delete',
    url: `/images/${url}`,
    success(data) {
      window.location.href = window.location.href;
    },
  });
  el.parent().remove();
});
console.log('I am here');
