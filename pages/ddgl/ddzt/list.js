// pages/ddgl/ddzt/ddzt.js
var ddztListPage;
var rootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    showDjckgdView:true,
    showPageView:false,
    showToolBarView:true,
    currentPage:1,
    pageSize:10,
    showNoDataView:false,
    mc:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ddztListPage=this;
    rootIP=getApp().getRootIP();
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

  },
  showPageView:function(flag){
    if(flag){
      ddztListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      ddztListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag=="true"){
      ddztListPage.setData({showToolBarView:true});
    }
    else if(flag=="false"){
      ddztListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag=="true"){
      ddztListPage.setData({showNoDataView:true});
    }
    else if(flag=="false"){
      ddztListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="mc_inp"){
      let mc=e.detail.value;
      ddztListPage.setData({mc:mc});
    }
  },
  selectListData:function(){
    let currentPage=ddztListPage.data.currentPage;
    let pageSize=ddztListPage.data.pageSize;
    let mc=ddztListPage.data.mc;
    wx.request({
      url: rootIP+"queryDDZTList",
      data:{page:currentPage,rows:pageSize,mc:mc},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        if(status=="ok"){
          var ddztList=data.list;
          ddztListPage.setData({ddztList:ddztList});
        }
        else{
          ddztListPage.showNoDataView(true);
          ddztListPage.setData({noDataText:data.message});
        }
        let e={currentTarget:{dataset:{flag:"false"}}};
        ddztListPage.showToolBarView(e);
      }
    })
  }
})