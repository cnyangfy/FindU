var util = require('../../utils/util.js');

Page({
  data: {
    message:'',
    gender: '',
    location: '',
    member: '',
    topic_id: 0,
    routine: '',
    title: '',
    showModal: false,
    showPop: false,
    text:'',
    intro:'Hi, my name is jackey. Nice to meet you',
    info:[{}],
    details:[{
  
      name:'Jacky'
    
    }],
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      gender:options.gender,
      location:options.location,
      member:options.member,
      topic_id:options.postid,
      routine:options.routine,
      title:options.title,
    })
  },


  showDialogBtn: function() {
    this.setData({
      showModal: true
    })
  },

  preventTouchMove: function() {
      return
  },
  
  hideModal: function() {
    this.setData({
      showModal: false
  });
  },

  onCancel: function() {
    this.hideModal();
  },

  onConfirm: function() {
      this.hideModal();
  },

  bindTextAreaBlur: function(e) {
    this.setData({
     text:e.detail.value
    }) 
  },

  
  hidePop:function(){
    this.setData({
      showPop: false
    })
  },

  showPop:function(){
    this.setData({
      showPop:true
    })
  },

  popCancel:function(){
    this.hidePop();
  },


  popConfirm:function(e){
    var self = this
    var now_time = util.formatTime(new Date());
    console.log(now_time)
    wx.request({
      url: 'https://findu.club//apply',
      data: {
        "topic_id": self.data.topic_id,
        "introduction": self.data.text,
        "applytime": now_time
      },
      header: {
        'token':"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTExQHFxLmNvbSJ9.u3VxG7Q-89xGZcRhJWRUXHDDmZhIfeGbFwp2zqgYCb",
      },
      method: 'POST',
      success: (result) => {
        var message = result.data
        console.log(result)
        self.setData({
          message:message
        })
      },
    })
    self.hidePop();
    self.showDialogBtn();
  }
})