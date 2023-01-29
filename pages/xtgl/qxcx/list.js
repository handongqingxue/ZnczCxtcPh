// pages/xtgl/qxcx/list.js
var qxListPage;
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
    qxListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    qxListPage.getListData();
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
      qxListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      qxListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      qxListPage.setData({showToolBarView:true});
    }
    else{
      qxListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      qxListPage.setData({showNoDataView:true});
    }
    else{
      qxListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="mc_inp"){
      let mc=e.detail.value;
      qxListPage.setData({mc:mc});
    }
  },
  resetToolBarData:function(){
    qxListPage.setData({mc:""});
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=qxListPage.data.prePageFlag;
    let nextPageFlag=qxListPage.data.nextPageFlag;
    let currentPage=qxListPage.data.currentPage;
    let pageCount=qxListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      qxListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      qxListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    qxListPage.setData({currentPage:currentPage});
    qxListPage.getListData();
  },
  getListData:function(){
    let currentPage=qxListPage.data.currentPage;
    let pageSize=qxListPage.data.pageSize;
    let mc=qxListPage.data.mc;
    wx.request({
      url: rootIP+"getQuanXianList",
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
        qxListPage.setData({qxList:[]});
        if(status=="ok"){
          var qxList=data.list;
          for(let i=0;i<qxList.length;i++){
            let qx=qxList[i];
            let ms=qx.ms;
            let msRowHeight=qxListPage.jiSuanRowHeight(ms);
            qx.msRowHeight=msRowHeight;
          }
          qxListPage.setData({qxList:qxList});
          qxListPage.showNoDataView(false);
          qxListPage.setData({noDataText:""});
        }
        else{
          qxListPage.showNoDataView(true);
          qxListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        qxListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        qxListPage.showToolBarView(e);
      }
    })
  },
  jiSuanRowHeight:function(val){
    let rowHeight;
    if(val.length==0)
      rowHeight=40;
    else
      rowHeight=val.length/10*20+30;
    return rowHeight;
  },
  goAddPage:function(){
    wx.redirectTo({
      url: '/pages/xtgl/qxcx/new',
    })
  },
  goEditPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/xtgl/qxcx/edit?id='+id,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})