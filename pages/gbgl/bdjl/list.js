// pages/gbgl/bdjl/list.js
var bdjlListPage;
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
    ddh:"",
    prePageFlag:1,
    nextPageFlag:2,
    prePageEnable:false,
    nextPageEnable:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bdjlListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    bdjlListPage.selectListData();
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
      bdjlListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      bdjlListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      bdjlListPage.setData({showToolBarView:true});
    }
    else{
      bdjlListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag=="true"){
      bdjlListPage.setData({showNoDataView:true});
    }
    else if(flag=="false"){
      bdjlListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="ddh_inp"){
      let ddh=e.detail.value;
      bdjlListPage.setData({ddh:ddh});
    }
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=bdjlListPage.data.prePageFlag;
    let nextPageFlag=bdjlListPage.data.nextPageFlag;
    let currentPage=bdjlListPage.data.currentPage;
    let pageCount=bdjlListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      bdjlListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      bdjlListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    bdjlListPage.setData({currentPage:currentPage});
    bdjlListPage.selectListData();
  },
  selectListData:function(){
    let currentPage=bdjlListPage.data.currentPage;
    let pageSize=bdjlListPage.data.pageSize;
    let ddh=bdjlListPage.data.ddh;
    wx.request({
      url: rootIP+"getBDJLList",
      data:{page:currentPage,rows:pageSize,ddh:ddh},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        if(status=="ok"){
          var ddztList=data.list;
          bdjlListPage.setData({ddztList:ddztList});
        }
        else{
          bdjlListPage.showNoDataView(true);
          bdjlListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        bdjlListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        bdjlListPage.showToolBarView(e);
      }
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})