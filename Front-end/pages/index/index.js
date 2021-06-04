//const app = getApp()
Page({
  data: {
    tabTxt: ['Gender', 'Routine', 'Location'],
    tab: [true, true, true],
    gender_id: 0,
    gender_txt: '',
    routine_id: 0,
    routine_txt: '',
    location_id: 0,
    location_txt: '',
    pageNo:1,
    details:[{
      title:'Choose Tag to find roomate!',
      gender:'Welcome',
      routine:'To',
      location:'FindU'
    }],
  },
 
  //Tab
  filterTab: function (e) {
    var data = [true, true, true], index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },

  filter: function (e) {
    var self = this, id = e.currentTarget.dataset.id, txt = e.currentTarget.dataset.txt, tabTxt = this.data.tabTxt;
    switch (e.currentTarget.dataset.index) {
      case '0':
        tabTxt[0] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          gender_id: id,
          gender_txt: txt,
        });
        break;
      case '1':
        tabTxt[1] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          routine_id: id,
          routine_txt: txt
        });
        break;
      case '2':
        tabTxt[2] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          location_id: id,
          location_txt: txt
        });
        break;
    }
    self.getData();
  },

  onLoad:function(){
  },

  //Get data
  getData:function(){
    var self = this;
    var arr = [].concat(self.data.tabTxt);
    if(arr[1] == "all") {
      arr.splice(1,1,"");
    }
    if(arr[2] == "all"){
      arr.splice(2,1,"");
    };
    wx.request({
      url: 'https://findu.club//search',
      data:{
        "gender": arr[0],
        "routine": arr[1],
        "location": arr[2],
      },
      header: {
        'token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTExQHFxLmNvbSJ9.u3VxG7Q-89xGZcRhJWRUXHDDmZhIfeGbFwp2zqgYCb",
      },
      method:'GET',
      success(res){
        console.log(res.data)
        let result = res.data;
        self.setData({
          details:result
        })
      },
    })
  },

  onReachBottom:function(){
    this.data.pageNo++;
    this.getData();
  },

  onPullDownRefresh:function(){
    this.data.pageNo=1;
    this.data.details=[];
    this.getData();
  },

  gotop:function(e){
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: 'Warning',
        content: 'Fail!'
      })
    }
  },

  toDetail: function(e){
   console.log(e)
   let info_list = e.currentTarget.dataset
   console.log(info_list)
   
   var gender = e.currentTarget.dataset.gender
   var location = e.currentTarget.dataset.location
   var member = e.currentTarget.dataset.member
   var postid = e.currentTarget.dataset.postid
   var routine = e.currentTarget.dataset.routine
   var title = e.currentTarget.dataset.title

   wx.navigateTo({
     url: '/pages/logs/logs?gender='+gender+
     '&location='+location+
     '&member='+member+
     '&postid='+postid+
     '&routine='+routine+
     '&title='+title,
   })
  }

},)