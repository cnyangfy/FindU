// pages/approved/approved.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postName:'帖子标题',
    roommateList:[

    ]
  },
  toMoreInfo: function(e){
    let info = e.currentTarget.dataset
    console.log(info)

    var email = e.currentTarget.dataset.friEmail
    console.log(email)
    console.log(typeof email)

    wx.navigateTo({
      url:"/pages/otherInfo/otherInfo?email="+email
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title : "Application Approved"
   });
    //请求post数据
    wx.request({
      url: 'https://findu.club/me/myPost',
      method: 'GET',
      header:{
      'token' :  app.globalData.token
      },
      success:(res) => {
        console.log('Request succeeded,',res.data);
        that.setData({
          postName : res.data.myPost.title,
        })
      },
      fail: (err) => {
        console.log('Request failed', err)
      }
    }); 

    var that = this;

    let data = options.data
    console.log('data:',data)
    let map = data.split(",")
    console.log('map:',map)

    var size = map.length
    console.log('size of map is ', size);
    

    for(var i = 0;i < size;i++){
      var list = (map[i]).split(":")
      console.log(list);
      var email = list[0]
      var name = list[1]
      var newArray = {
        friAvater: "/image/publisher.png",
        friEmail : email,
        friName : name
      };
      var roomList = that.data.roommateList.concat(newArray);

      that.setData({
        roommateList: roomList
      }); 
    }
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