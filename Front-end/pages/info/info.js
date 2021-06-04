// pages/info/info.js
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userSex: 'Male',
    userGrade: 'Year 1',
    userDepart: 'IBSS',
    userRoutine: 'Before 23:00',
    userContact: '',
    userDescrip: '',

    arrayOfSex: ['Male', 'Female'],
    objectArraySex: [
      {
        id: 0,
        name: 'Male'
      },
      {
        id: 1,
        name: 'Female'
      }
    ],
    indexOfSex: 0,

    arrayOfGrade: ['Year 1', 'Year 2', 'Year 3', 'Year 4'],
    objectArrayGrade: [
      {
        id: 0,
        name: 'Year 1'
      },
      {
        id: 1,
        name: 'Year 2'
      },
      {
        id: 2,
        name: 'Year 3'
      },
      {
        id: 3,
        name: 'Year 4'
      }
    ],
    indexOfGrade: 0,

    arrayOfDepart: ['IBSS', 'Design', 'Flim and Arts', 'Humanities and Social Science', 'Science', 'Languages', 'Advancved Technology'],
    objectArrayDepart: [
      {
        id: 0,
        name: 'IBSS'
      },
      {
        id: 1,
        name: 'Design'
      },
      {
        id: 2,
        name: 'Flim and Arts'
      },
      {
        id: 3,
        name: 'Humanities and Social Science'
      },
      {
        id: 4,
        name: 'Sciencee'
      },
      {
        id: 5,
        name: 'Languages'
      },
      {
        id: 6,
        name: 'Advancved Technology'
      }
    ],
    indexOfDepart: 0,

    arrayOfRoutine: ['Before 23:00', 'After 23:00'],
    objectArrayRoutine: [
      {
        id: 0,
        name: 'Before 23:00'
      },
      {
        id: 1,
        name: 'After 23:00'
      }
    ],
    indexOfRoutine: 0,

  },
  sexPickerChange: function (e) {
    var index = this.data.indexOfSex
    console.log('picker has changed,the index is', e.detail.value)
    console.log('picker has changed,the value is', this.data.arrayOfSex[index])
    this.setData({
      indexOfSex: e.detail.value,
      userSex: this.data.arrayOfSex[e.detail.value]
    })
  },
  gradePickerChange: function (e) {
    var index = this.data.indexOfGrade
    console.log('picker has changed,the index is', e.detail.value)
    console.log('picker has changed,the value is', this.data.arrayOfGrade[index])
    this.setData({
      indexOfGrade: e.detail.value,
      userGrade: this.data.arrayOfGrade[e.detail.value]
    })
  },
  departPickerChange: function (e) {
    var index = this.data.indexOfDepart
    console.log('picker has changed,the index is', e.detail.value)
    console.log('picker has changed,the value is', this.data.arrayOfDepart[index])
    this.setData({
      indexOfDepart: e.detail.value,
      userDepart: this.data.arrayOfDepart[e.detail.value]
    })
  },
  routinePickerChange: function (e) {
    var index = this.data.indexOfRoutine
    console.log('picker has changed,the index is', e.detail.value)
    console.log('picker has changed,the value is', this.data.arrayOfRoutine[index])
    this.setData({
      indexOfRoutine: e.detail.value,
      userRoutine: this.data.arrayOfRoutine[e.detail.value]
    })
  },
  nameBlur: function (e) {
    this.setData({
      userName: e.detail.value
    })
    console.log(this.data.userName)
  },
  contactBlur: function (e) {
    this.setData({
      userContact: e.detail.value
    })
    console.log(this.data.userContact)
  },
  descripBlur: function (e) {
    this.setData({
      userDescrip: e.detail.value
    })
    console.log(this.data.userDescrip)
  },
  formSubmit: function (e) {
    console.log('A submit event occurred in the orm, and the data carried is：', e.detail.value)
    let { userName,
      userSex,
      userGrade,
      userDepart,
      userRoutine,
      userContact,
      userDescrip
    } = this.data;

    if (!userName || !userSex || !userGrade || !userDepart || !userRoutine || !userContact) {
      wx.showToast({
        title: 'Missing Information！',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'https://findu.club/fillInfo',
        method: 'POST',
        header: {
          'token' :  app.globalData.token
        },
        data: {
          name: userName,
          gender: userSex,
          grade: userGrade,
          department: userDepart,
          routine: userRoutine,
          description: userDescrip,
          contact: userContact
        },
        success: (res) => {
          console.log('Request succeeded：', res)
          wx.reLaunch({
            url:'/pages/center/center'
          })
          //  wx.reLaunch({
          //   url:'/pages/me/me'
          // })
        },
        fail: (err) => {
          console.log('Request failed,', err)
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

 },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})