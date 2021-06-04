// pages/find/find.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    title: "",
    gender: "",
    department: "",
    grade: "",
    routine: "",
    location: "",
    user_number: "",
    body: "",
    post_time: "",
    log:app.globalData.islog,
    array1: ['male', 'female'],
    objectArray1: [
      {
        id: 0,
        name: 'male'
      },
      {
        id: 1,
        name: 'female'
      }

    ],
    index1: 0,

    array2: ['before 11 pm', 'after 11 pm'],
    objectArray2: [
      {
        id: 0,
        name: 'before 11 pm'
      },
      {
        id: 1,
        name: 'after 11 pm'
      }

    ],
    index2: 0,
    
    array3: ['dormitory', 'off campus'],
    objectArray3: [
      {
        id: 0,
        name: 'dormitory'
      },
      {
        id: 1,
        name: 'off campus'
      }

    ],
    index3: 0,
    array4: ['1', '2','3','4'],
    objectArray4: [
      {
        id: 0,
        name: '1'
      },
      {
        id: 1,
        name: '2'
      },{
        id: 2,
        name: '3'
      },
      {
        id: 3,
        name: '4'
      }

    ],
    index4: 0,

  },
  handleInput(event) {
    let type = event.currentTarget.dataset.type;
    this.setData({
      [type]: event.detail.value
    })
  },
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value,
      gender:this.data.array1[e.detail.value]
    })
    console.log(this.data.array1[e.detail.value])
  },

  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value,
      routine:this.data.array2[e.detail.value]
    })
    console.log(this.data.array2[e.detail.value])
  },
  bindPickerChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value,
      location:this.data.array3[e.detail.value]
    })
    console.log(this.data.array3[e.detail.value])
  },
  bindPickerChange4: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index4: e.detail.value,
      user_number:this.data.array4[e.detail.value]
    })
    console.log(this.data.array4[e.detail.value])
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.setData({
      log:app.globalData.islog
    });
  },
  submit(event) {
    let { title,
      gender,
      department,
      grade,
      routine,
      location,
      user_number,
      body,
      post_time
    } = this.data;
    this.setData({
      post_time: util.formatTime(new Date())
    });
    if (!title) {
      wx.showToast({
        title: 'Title cannot be empty',
        icon: 'none',
      })
    }
    else if (!gender) {
      wx.showToast({
        title: 'You have to choose gender',
        icon: 'none',
      })
    }
    else if (!routine) {
      wx.showToast({
        title: 'You have to choose routine',
        icon: 'none',

      })
    }
    else if (!location) {
      wx.showToast({
        title: 'You have to choose routine location',
        icon: 'none',
      })
    }
    else if (!user_number) {
      wx.showToast({
        title: 'You have to choose number',
        icon: 'none',
      })
    }
    else {
      wx.request({
        url: 'https://findu.club//create_topic', //
        method: 'post', //
        header: {
          // 'content-type': 'application/json' ,// 默认值, 
          'token': app.globalData.token
          // 'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTlAcXEuY29tIn0.iWRXFQ6uY0oQcUF05HRtFnUyftasMsNZ6M9pusBGFtA'
        },
        data: {
          title: title,
          gender: gender,
          routine: routine,
          location: location,
          user_number: user_number,
          body: body,
          post_time: util.formatTime(new Date())
        },
        success: (res) => {
          console.log('请求成功', res)
          if (res.data.message == 200) {
            this.setData({
              title: "",
              gender: "",
              department: "",
              grade: "",
              routine: "",
              location: "",
              user_number: "",
              body: "",
            })
            wx.showToast({
              title: 'Submit successfully',
              icon: 'success',
            })
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }, 2000)
          }
          else if (res.data.message == 1) {
            wx.showToast({
              title: "You've already created a topic",
              icon: 'none',
            })
          }
          else if (res.data.message == 0) {
            wx.showToast({
              title: "You've already applied a topic",
              icon: 'none',
            })
          }
          else if (res.data.message == 3) {
            wx.showToast({
              title: "Personal credit is low, unable to post.",
              icon: 'none',
            })
          }
          
        }
      })
    }
  }
})

