$.ajaxPrefilter(function (option) {
  option.url = ' http://big-event-api-t.itheima.net' + option.url
  console.log(option.url);
})