// pages/otherApp/otherApp.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    friAvater:"/image/publisher.png",
    friName:'',
    friEmail:'',
    postName:'',
    postId:'',
    result:''

  },

  getPostInfo(){
    var that=this
    wx.request({
      url: 'https://findu.club/me/myPost',
      method: 'GET',
      header:{
       'token' :  app.globalData.token
      },
      data:{},
      success:(res) => {
        console.log('Request succeeded,',res.data);
　　　　 that.setData({
          postName : res.data.myPost.title,
          postId : res.data.myPost.id
  　　　　 })
      },
      fail: (err) => {
        console.log('Request failed', err)
      }
    }) 
  },
  toInfo(){
    var email = this.data.friEmail
    wx.navigateTo({
      url:"/pages/otherInfo/otherInfo?email="+email
    })
  },
  selectYes: function (e){
    var that = this
    wx.request({
      url:'https://findu.club/confirm',
      method: 'GET',
      header:{},
      data:{
        topic_id : that.data.postId,
        email : that.data.friEmail,
        control : 1
      },
      success: (res) => {
        console.log('Agree successfully：', res)
        that.setData({
          result : res.data
        })
        wx.showToast({
          title: that.data.result,
          icon: 'none',
          duration: 2000,
        })
        wx.redirectTo({
          url:'/pages/noti/noti'
        })
      },
      fail: (err) => {
        console.log('Agree failed', err)
      }
    })
  },
  selectNo: function (e){
    var that = this
    wx.request({
      url:'https://findu.club/confirm',
      method: 'GET',
      header:{},
      data:{
        topic_id : that.data.postId,
        email : that.data.friEmail,
        control : 0
      },
      success: (res) => {
        console.log('Disagree successfully：', res)
        that.setData({
          result : res.data
        })
        wx.showToast({
          title: that.data.result,
          icon: 'none',
          duration: 2000,
        })
        wx.redirectTo({
          url:'/pages/noti/noti'
        })
      },
      fail: (err) => {
        console.log('Disagree failed', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title : "New Application"
   });

   this.getPostInfo()

   console.log(options)
   this.setData({
      friName : options.name,
      friEmail : options.email
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