// pages/center/center.js
 var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'userName'
  },

  showInfo(){
    wx.navigateTo({
      url:"/pages/show/show"
    })
  },
  showNoti(){
    wx.navigateTo({
      url:"/pages/noti/noti"
    })
    
  },
  showPost(){
    wx.navigateTo({
      url:"/pages/post/post"
    })

  },
  logoutModal(){
    wx.showModal({
      title: 'Exit',
      content: 'Confirm to logout?',
      cancelText : 'No',
      confirmText : 'Yes',
      success (res) {
        if (res.confirm) {
          wx.showToast({
            title: 'Signed out',
            icon: 'success',
            duration: 2000
          })
          // 清除token
          app.globalData.token = ''
          // 跳转到登陆页面
          wx.reLaunch({
            url:"/pages/login/login"
          }) 
          console.log('user click "Yes"')
        } else if (res.cancel) {
          console.log('user click "No"')
        }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.request({
      url: 'https://findu.club/me/info',
      method: 'GET',
      header:{
        'token' :  app.globalData.token
      },
      sccess : (res) =>{
        console.log('get data successful',res.data)
        // that.setData({
        //   userName : res.data.name 
        // })
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