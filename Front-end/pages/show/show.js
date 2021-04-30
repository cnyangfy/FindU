// pages/show/show.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uName: '',
    uGender: '',
    uGrade: '',
    uDepart: '',
    uRoutine: '',
    uContact: '',
    uDescrip: ''


  },
  toEdit() {
    wx.redirectTo({
      url: "/pages/info/info"
    })
  },

  onLoad: function (e) {
    let {
      uName,
      uGender,
      uGrade,
      uDepart,
      uRoutine,
      uContact,
      uDescrip,
    } = this.data;
    wx.request({
      url: 'https://findu.club/showInfo',
      method: 'GET',
      header: {
        'token' :  app.globalData.token
      },
      success: (res) => {
        console.log('Request succeeded,', res);
        this.setData({
          uName: res.data.name,
          uGender: res.data.gender,
          uGrade: res.data.grade,
          uDepart:res.data.department,
          uRoutine: res.data.routine,
          uContact: res.data.contact,
          uDescrip: res.data.description
        })
      },
      fail: (err) => {
        console.log('Request failed', err)
      }
    })
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

  }
})