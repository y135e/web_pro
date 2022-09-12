$(function () {
  $('#link-log').on('click', function () {
    $('.login').show()
    $('.register').hide()
  })
  $('#link-reg').on('click', function () {
    $('.register').show()
    $('.login').hide()
  })


  // 从layui中获取form表单
  var form = layui.form
  var layer = layui.layer
  //  自定义校验规则
  form.verify({
    // 自定义一个pwd的规则
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    // 获取的是再次输入密码框里面的值
    repwd: function (value) {
      // 获取密码框里面的值，进行匹配
      // 属性选择器进行获取
      let pwd = $('#mima').val()
      if (pwd !== value) {
        return "两次密码不一致"
      }
    }
  })
  // 给注册form表单添加监听事件
  $('#zhuce').on('submit', function (e) {
    e.preventDefault()
    // 发起请求
    $.post('/api/reguser', { username: $('#yonghu').val(), password: $('#mima').val(), }, function (res) {
      // console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("注册成功，请登录");
      // 模仿点击，自动跳转登录页面
      $('#link-log').click()
    })
  })
  // 给登录form表单添加监听事件
  $('#denglu').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("登录成功");
        // 将登陆成功的字符串保存到本地
        localStorage.setItem('token', res.token)
        //  跳转到首页
        location.href = "/index.html"
      }

    })
  })
})