// pages/ddgl/ddzt/list.js
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
    showToolBarView:false,
    currentPage:1,
    pageSize:10,
    showNoDataView:false,
    mc:"",
    prePageFlag:1,
    nextPageFlag:2,
    prePageEnable:false,
    nextPageEnable:true
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
    ddztListPage.getListData();
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
    if(flag){
      ddztListPage.setData({showToolBarView:true});
    }
    else{
      ddztListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      ddztListPage.setData({showNoDataView:true});
    }
    else{
      ddztListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="mc_inp"){
      let mc=e.detail.value;
      ddztListPage.setData({mc:mc});
    }
  },
  resetToolBarData:function(){
    ddztListPage.setData({mc:""});
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=ddztListPage.data.prePageFlag;
    let nextPageFlag=ddztListPage.data.nextPageFlag;
    let currentPage=ddztListPage.data.currentPage;
    let pageCount=ddztListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      ddztListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      ddztListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    ddztListPage.setData({currentPage:currentPage});
    ddztListPage.getListData();
  },
  getListData:function(){
    let currentPage=ddztListPage.data.currentPage;
    let pageSize=ddztListPage.data.pageSize;
    let mc=ddztListPage.data.mc;
    wx.request({
      url: rootIP+"getDDZTList",
      data:{page:currentPage,rows:pageSize,mc:mc},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        ddztListPage.setData({wzlxList:[]});
        if(status=="ok"){
          var ddztList=data.list;
          ddztListPage.setData({ddztList:ddztList});
          ddztListPage.showNoDataView(false);
          ddztListPage.setData({noDataText:""});
        }
        else{
          ddztListPage.showNoDataView(true);
          ddztListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        ddztListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        ddztListPage.showToolBarView(e);
      }
    })
  },
  goAddPage:function(){
    wx.redirectTo({
      url: '/pages/ddgl/ddzt/new',
    })
  },
  goEditPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/ddgl/ddzt/edit?id='+id,
    })
  },
  goDetailPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/ddgl/ddzt/detail?id='+id,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})