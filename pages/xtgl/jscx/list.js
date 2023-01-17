// pages/xtgl/jscx/list.js
var jsListPage;
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
    jsListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    jsListPage.getConstantFlagMap();
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
  getConstantFlagMap:function(){
    wx.request({
      url: rootIP+"getConstantFlagMap",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let constantFlagMap=res.data;
        console.log(constantFlagMap);
        let jsZt=constantFlagMap.jsZt;
        let constantFlags=jsZt;
        jsListPage.getConstantMap(constantFlags);
      }
    })
  },
  getConstantMap:function(flags){
    wx.request({
      url: rootIP+"getConstantMap",
      data:{flags:flags},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let constantMap=res.data;
        console.log(constantMap);
        jsListPage.setData({constantMap:constantMap});
        jsListPage.getListData();
      }
    })
  },
  showPageView:function(flag){
    if(flag){
      jsListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      jsListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      jsListPage.setData({showToolBarView:true});
    }
    else{
      jsListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      jsListPage.setData({showNoDataView:true});
    }
    else{
      jsListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="mc_inp"){
      let mc=e.detail.value;
      jsListPage.setData({mc:mc});
    }
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=jsListPage.data.prePageFlag;
    let nextPageFlag=jsListPage.data.nextPageFlag;
    let currentPage=jsListPage.data.currentPage;
    let pageCount=jsListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      jsListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      jsListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    jsListPage.setData({currentPage:currentPage});
    jsListPage.getListData();
  },
  getListData:function(){
    let currentPage=jsListPage.data.currentPage;
    let pageSize=jsListPage.data.pageSize;
    let mc=jsListPage.data.mc;
    wx.request({
      url: rootIP+"getJueSeList",
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
        jsListPage.setData({jsList:[]});
        if(status=="ok"){
          var jsList=data.list;
          for(let i=0;i<jsList.length;i++){
            let js=jsList[i];
            let zt=js.zt;
            let ztMc=jsListPage.getZtMcById(zt);
            js.ztMc=ztMc;
          }
          jsListPage.setData({jsList:jsList});
          jsListPage.showNoDataView(false);
          jsListPage.setData({noDataText:""});
        }
        else{
          jsListPage.showNoDataView(true);
          jsListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        jsListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        jsListPage.showToolBarView(e);
      }
    })
  },
  getZtMcById:function(ztId){
    let constantMap=jsListPage.data.constantMap;
    let ztMap=constantMap.jsZtMap;
    //console.log(ztMap);
    var str;
    switch (ztId) {
    case ztMap.xzZt:
      str=ztMap.xzZtMc;//新增
      break;
    case ztMap.zcsyZt:
      str=ztMap.zcsyZtMc;//正常使用
      break;
    case ztMap.fqZt:
      str=ztMap.fqZtMc;//废弃
      break;
    case ztMap.ywZt:
      str=ztMap.ywZtMc;//有误
      break;
    }
    return str;
  },
  goAddPage:function(){
    wx.redirectTo({
      url: '/pages/xtgl/jscx/new',
    })
  },
  goEditPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/xtgl/jscx/edit?id='+id,
    })
  },
  goDetailPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/xtgl/jscx/detail?id='+id,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})