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
    maxMember:0,
    nowMember:0,
    hasPost: true

  },
  deletePost: function (e){
    var that = this

    wx.showModal({
      title: 'Delete',
      content: 'Confiem to delete this post?',
      cancelText : 'No',
      confirmText : 'Yes',
      success (res) {
        if (res.confirm) {
          console.log('user click "Yes"')
          wx.request({
            url:'https://findu.club/me/myPost/delete',
            method: 'GET',
            header:{
              // 'token' :  app.globalData.token
              'token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTExMUBxcS5jb20ifQ.MZFZeTiRs13u0vqFlnGS9CxgLY9vCIF6HXqMWe3YnVI'
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
    this.getPostInfo()

    var text = this.data.postName

    if(text == ''){
      this.setData({
        hasPost : false
      })
    }else{
      this.setData({
        hasPost : true
      })
    }
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
          sexInfo : res.data.myPost.gender,
          routineInfo : res.data.myPost.routine,
          locationInfo : res.data.myPost.location,
          intro : res.data.myPost.body,
          maxMember : res.data.myPost.user_number,
          // nowMember : res.data.myPost.now_number,
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