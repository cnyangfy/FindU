Page({
  data: {
    defaultType: true,
    passwordType: true,
    defaultType1: true,
    passwordType1: true,
    //设置初始的状态、包含字体、颜色、还有等待事件 > <
    sendTime: 'Get verification',
    sendColor: '#FFFFFF',
    snsMsgWait: 60,
    email: "",
    code: "",
    password: "",
    conpassword: ""
  },


  handleInput(event) {
    let type = event.currentTarget.dataset.type;
    this.setData({
      [type]: event.detail.value
    })
  },

  reset(event) {
    let { email, code, password, conpassword } = this.data;
    let mailrange = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    let passwordrange = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,11}$/;
    if (!email) {
      wx.showToast({
        title: 'Mail cannot be empty',
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
        title: 'Password cannot be empty',
        icon: 'none',
      })
    }
    else if (!passwordrange.test(password)) {
      wx.showToast({
        title: 'Password format is incorrect',
        icon: 'none',
      })
    }
    else if(password !=conpassword){
      wx.showToast({
        title: 'The password is inconsistent',
        icon: 'none',
      })
    }
    else {
      wx.request({
        url: 'https://findu.club/forgetPassword',
        method: 'post',
        header: {
          // 'content-type': 'application/json' ,// 默认值, 
        },
        data: {
          email: email,
          code: code,
          password: password,
        },
        success: (res) => {
          console.log('请求成功', res)
          if (res.data.message == 200) {
            wx.showToast({
              title: 'Reset successfully',
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
        },
        fail: (res) => {
          console.log('失败', err)
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
      passwordType: this.data.passwordType,
    })
  }

  , eyeStatus1: function () {
    this.data.defaultType1 = !this.data.defaultType1
    this.data.passwordType1 = !this.data.passwordType1
    this.setData({
      defaultType1: this.data.defaultType1,
      passwordType1: this.data.passwordType1,
    })
  },

  // 获取验证码
  sendCode: function () {
    let { email, code, password, conpassword } = this.data;
    // 60秒后重新获取验证码
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

    var inter = setInterval(function () {
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
          sendTime: 'Get verification',
          snsMsgWait: 60,
          smsFlag: false
        });
      }
    }.bind(this), 1000);
  },
})

