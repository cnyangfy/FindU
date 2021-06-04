// pages/rejected/rejected.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postName:'贴子标题'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title : "Application Rejected"
   });

    // var that = this;
    // 请求post数据
    // wx.request({
    //   url: 'https://findu.club/me/myPost',
    //   method: 'GET',
    //   header:{
    //   'token' :  app.globalData.token
    //   },
    //   success:(res) => {
    //     console.log('Request succeeded,',res.data);
    //     that.setData({
    //       postName : res.data.myPost.title,
    //     })
    //   },
    //   fail: (err) => {
    //     console.log('Request failed', err)
    //   }
    // }) 
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