// pages/post/post.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postName:'',
    sexNum : 0,
    sexInfo : 'userGender',
    routineInfo : 'userRoutine',
    locationInfo : 'userLocation',
    intro:'Sorry, the user did not add introduction',

    credit : 0,

    maxMember:0,
    nowMember:0,
    hasPost: true

  },
  deletePost: function (e){
    var that = this

    wx.showModal({
      title: 'Delete',
      content: 'Your credit is: ' + that.data.credit +'/ 3 \r\n Be sure to delete posts?',
      cancelText : 'No',
      confirmText : 'Yes',
      success (res) {
        if (res.confirm) {
          console.log('user click "Yes"')
          wx.request({
            url:'https://findu.club/me/myPost/delete',
            method: 'GET',
            header:{
              'token' :  app.globalData.token
            },
            data:{},
            success: (res) => {
              console.log('Deleted successfully：', res)
                wx.showToast({
                  title: 'Deleted Successfully',
                  icon: 'success',
                  duration: 2000
                })
                wx.switchTab({
                  url: '/pages/center/center'
                })
                
            },
            fail: (err) => {
              console.log('Deleted failed', err)
              wx.showToast({
                title: 'Deleted Failed',
                icon: 'error',
                duration: 2000
              })
            }
          }),
          that.setData({
            hasPost : false
          })
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
    

    var text = this.data.postName

    if(!text){
      this.setData({
        hasPost : true
      })
    }else{
      this.setData({
        hasPost : false
      })
    }
    this.getPostInfo()
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
        if(res.data.message == "0"){
          this.setData({
            hasPost : false
          })
        }else {
          console.log('Request succeeded,',res.data);
  　　　　 that.setData({
            postName : res.data.myPost.title,
            sexInfo : res.data.myPost.gender,
            routineInfo : res.data.myPost.routine,
            locationInfo : res.data.myPost.location,
            intro : res.data.myPost.body,
            maxMember : res.data.myPost.user_number,
            nowMember : res.data.myPost.now_number,
            credit : res.data.credit,
  　　　　 })
        }
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