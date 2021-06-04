// pages/noti/noti.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    notiList:[
 
    ],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://findu.club/notification',
      method: 'GET',
      header: {
        'token' :  app.globalData.token
      },
      success: (res) => {
        console.log('Request succeeded,', res);
        console.log('length is ', res.data.length);
        
        var size = res.data.length
        console.log('size is ', size);

        for(var i = 0;i < size;i++){
          var newArray = {
            title : res.data[i].message_title,
            body : res.data[i].body,
            time : res.data[i].time,
            message : res.data[i].message,
            applicant : res.data[i].applicant
          };
  
          that.data.notiList = that.data.notiList.concat(newArray);
  
          that.setData({
            notiList: that.data.notiList
          }); 
        }
  
      },
      fail: (err) => {
        console.log('Request failed', err)
      }
    })
  },

  toMoreInfo: function(e){
    let info = e.currentTarget.dataset
    console.log(info)

    var mes = e.currentTarget.dataset.message
    console.log(mes)


    if(mes == 1){
      var name  = e.currentTarget.dataset.applicant.name
      var email = e.currentTarget.dataset.applicant.email
      wx.navigateTo({
        url: '/pages/otherApp/otherApp?name='+name+
        '&email='+email
      })
    }else if(mes == 2){
      console.log('e:',e.currentTarget.dataset.applicant)
      console.log('type:', typeof e.currentTarget.dataset.applicant)

      let data = JSON.stringify(e.currentTarget.dataset.applicant)
      console.log('data:',data)

      wx.navigateTo({
        url: '/pages/approved/approved='+data
      })
    }else if (mes == 3){
      wx.navigateTo({
        url: '/pages/rejected/rejected'
      })
    }else if (mes == 4){

      console.log('e:',e.currentTarget.dataset.applicant)
      console.log('type:', typeof e.currentTarget.dataset.applicant)

      let data = JSON.stringify(e.currentTarget.dataset.applicant)
      console.log('data:',data)
      
      wx.navigateTo({
        url: '/pages/match/match?data='+data
      })
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