// pages/dwgl/yss/list.js
var yssListPage;
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
    yssListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    yssListPage.getListData();
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
      yssListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      yssListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      yssListPage.setData({showToolBarView:true});
    }
    else{
      yssListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      yssListPage.setData({showNoDataView:true});
    }
    else{
      yssListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="mc_inp"){
      let mc=e.detail.value;
      yssListPage.setData({mc:mc});
    }
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=yssListPage.data.prePageFlag;
    let nextPageFlag=yssListPage.data.nextPageFlag;
    let currentPage=yssListPage.data.currentPage;
    let pageCount=yssListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      yssListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      yssListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    yssListPage.setData({currentPage:currentPage});
    yssListPage.getListData();
  },
  getListData:function(){
    let currentPage=yssListPage.data.currentPage;
    let pageSize=yssListPage.data.pageSize;
    let mc=yssListPage.data.mc;
    wx.request({
      url: rootIP+"getYunShuShangList",
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
        yssListPage.setData({yssList:[]});
        if(status=="ok"){
          var yssList=data.list;
          yssListPage.setData({yssList:yssList});
          yssListPage.showNoDataView(false);
          yssListPage.setData({noDataText:""});
        }
        else{
          yssListPage.showNoDataView(true);
          yssListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        yssListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        yssListPage.showToolBarView(e);
      }
    })
  },
  goAddPage:function(){
    wx.redirectTo({
      url: '/pages/dwgl/yss/new',
    })
  },
  goEditPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/dwgl/yss/edit?id='+id,
    })
  },
  goDetailPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/dwgl/yss/detail?id='+id,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})