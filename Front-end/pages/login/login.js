const app = getApp()
Page({
  data: {
    defaultType: true,
    passwordType: true,
    email: "",
    password: "",
    // token:"",
    // token : getApp().globalData.token
  },
  onLoad: function (options) {
  },

  handleInput(event) {
    // let type=event.currentTarget.id;
    let type = event.currentTarget.dataset.type;
    this.setData({
      [type]: event.detail.value
    })
  },

  denglu(event) {
    let { email, password } = this.data;
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
        title: 'password format is incorrect',
        icon: 'none',
      })
    }
    else {
      wx.request({
        url: 'https://findu.club/logByEmail',
        method: 'post',
        header: {
          // 'content-type': 'application/json' ,// 默认值, 
        },
        data: {
          email: email,
          password: password
        },

        success: (res) => {
          console.log('请求成功', res)
          if (res.data.message == 1) {
            wx.showToast({
              title: 'This account does not exist',
              icon: 'none',
            })
          }
          else if (res.data.message == 200) {  //
            app.globalData.token = res.data.token
            console.log(app.globalData.token)
            wx.showToast({
              title: 'Login successfully',
              icon: 'none',
            })
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/index/index',
              });
            }, 2000)

          }
          else if (res.data.message == 0) {
            wx.showToast({
              title: 'Wrong password',
              icon: 'none',
            })
          }
          else if (res.data.message == 1) {  //需要测试
            wx.showToast({
              title: 'Account does not exist',
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
      passwordType: this.data.passwordType
    })
  }

})

