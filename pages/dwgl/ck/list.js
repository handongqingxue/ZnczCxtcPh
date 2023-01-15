// pages/dwgl/ck/list.js
var ckListPage;
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
    ckListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    ckListPage.getListData();
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
      ckListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      ckListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      ckListPage.setData({showToolBarView:true});
    }
    else{
      ckListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      ckListPage.setData({showNoDataView:true});
    }
    else{
      ckListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="mc_inp"){
      let mc=e.detail.value;
      ckListPage.setData({mc:mc});
    }
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=ckListPage.data.prePageFlag;
    let nextPageFlag=ckListPage.data.nextPageFlag;
    let currentPage=ckListPage.data.currentPage;
    let pageCount=ckListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      ckListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      ckListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    ckListPage.setData({currentPage:currentPage});
    ckListPage.getListData();
  },
  getListData:function(){
    let currentPage=ckListPage.data.currentPage;
    let pageSize=ckListPage.data.pageSize;
    let mc=ckListPage.data.mc;
    wx.request({
      url: rootIP+"getCangKuList",
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
        ckListPage.setData({ckList:[]});
        if(status=="ok"){
          var ckList=data.list;
          ckListPage.setData({ckList:ckList});
          ckListPage.showNoDataView(false);
          ckListPage.setData({noDataText:""});
        }
        else{
          ckListPage.showNoDataView(true);
          ckListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        ckListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        ckListPage.showToolBarView(e);
      }
    })
  },
  goAddPage:function(){
    wx.redirectTo({
      url: '/pages/dwgl/ck/new',
    })
  },
  goEditPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/dwgl/ck/edit?id='+id,
    })
  },
  goDetailPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/dwgl/ck/detail?id='+id,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})