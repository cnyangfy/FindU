Page({
  data: {
    defaultType: true,
    passwordType: true,
    email: "",
    name: "",
    password: "",
    //设置初始的状态、包含字体、颜色、还有等待事件 > <
    sendTime: 'Get verification ',
    sendColor: '#FFFFFF',
    snsMsgWait: 60,
    code: "",

  },

  handleInput(event) {
    let type = event.currentTarget.dataset.type;
    this.setData({
      [type]: event.detail.value
    })
  },

  zhuce(event) {
    let { email, name, password, code} = this.data;
    let mailrange = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    let passwordrange = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,11}$/;

    if (!email) {
      wx.showToast({
        title: 'Mail cannot be empty',
        icon: 'none',
      })
    }
    else if (!name) {
      wx.showToast({
        title: 'Name cannot be empty',
        icon: 'none',
      })
    }
    else if (!mailrange.test(email)) {
      wx.showToast({
        title: 'Mail format is incorrect',
        icon: 'none',
      })
    }
    else if (!password) {
      wx.showToast({
        title: 'password cannot be empty',
        icon: 'none',
      })
    }
    else if (!passwordrange.test(password)) {
      wx.showToast({
        title: 'password format is incorrect',
        icon: 'none',
      })
    }
    else {
      wx.request({
        url: 'https://findu.club/register',//修改
        method: 'post',
        header: {
          'content-type': 'application/json',// 默认值, 
        },
        data: {
          email: email,
          name: name,
          code: code,
          password: password,
        },
        success: (res) => {
          console.log('请求成功', res)
          if (res.data.message == 200) {
            wx.showToast({
              title: 'Create successfully',
              icon: 'none',
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/login/login',
              });
             }, 2000) 
          }
          else if(res.data.message == 0){
            wx.showToast({
              title: 'Verification code error',
              icon: 'none',
            })
          }
          else if(res.data.message == 2){
            wx.showToast({
              title: 'Account already exists',
              icon: 'none',
            })
          }
        }
      })
    }

  },

  //defaultType：眼睛状态   passwordType：密码可见与否状态
  eyeStatus: function () {
    this.data.defaultType = !this.data.defaultType
    this.data.passwordType = !this.data.passwordType
    this.setData({
      defaultType: this.data.defaultType,
      passwordType: this.data.passwordType
    })

  },
  sendCode: function () {
    let { email, name, password } = this.data;
    wx.request({
      url: 'https://findu.club/sendCodeForC',
      method: 'get',
      header: {
        // 'content-type': 'application/json' ,// 默认值, 
      },
      data: {
        email:email,
      },
      success: (res) => {
        console.log('请求成功',res)
      },

      fail :(res)=>{
        console.log('失败',err)
      }
    })

    var inter = setInterval(function() {
      this.setData({
        smsFlag: true,
        sendColor: '#cccccc',
        sendTime: this.data.snsMsgWait + 's Resend',
        snsMsgWait: this.data.snsMsgWait - 1
      });
      if (this.data.snsMsgWait < 0) {
        clearInterval(inter)
        this.setData({
          sendColor: '#FFFFFF',
          sendTime: '获取验证码',
          snsMsgWait: 60,
          smsFlag: false
        });
      }
    }.bind(this), 1000);
   }

})

