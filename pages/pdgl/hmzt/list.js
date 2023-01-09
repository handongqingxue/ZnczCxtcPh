// pages/pdgl/hmzt/list.js
var hmztListPage;
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
    hmztListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    hmztListPage.getListData();
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
      hmztListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      hmztListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      hmztListPage.setData({showToolBarView:true});
    }
    else{
      hmztListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      hmztListPage.setData({showNoDataView:true});
    }
    else{
      hmztListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="mc_inp"){
      let mc=e.detail.value;
      hmztListPage.setData({mc:mc});
    }
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=hmztListPage.data.prePageFlag;
    let nextPageFlag=hmztListPage.data.nextPageFlag;
    let currentPage=hmztListPage.data.currentPage;
    let pageCount=hmztListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      hmztListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      hmztListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    hmztListPage.setData({currentPage:currentPage});
    hmztListPage.getListData();
  },
  getListData:function(){
    let currentPage=hmztListPage.data.currentPage;
    let pageSize=hmztListPage.data.pageSize;
    let mc=hmztListPage.data.mc;
    wx.request({
      url: rootIP+"getHMZTList",
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
        hmztListPage.setData({hmztList:[]});
        if(status=="ok"){
          var hmztList=data.list;
          hmztListPage.setData({hmztList:hmztList});
          hmztListPage.showNoDataView(false);
          hmztListPage.setData({noDataText:""});
        }
        else{
          hmztListPage.showNoDataView(true);
          hmztListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        hmztListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        hmztListPage.showToolBarView(e);
      }
    })
  },
  goAddPage:function(){
    wx.redirectTo({
      url: '/pages/pdgl/hmzt/new',
    })
  },
  goEditPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/pdgl/hmzt/edit?id='+id,
    })
  },
  goDetailPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/pdgl/hmzt/detail?id='+id,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})