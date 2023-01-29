// pages/xtgl/yhcx/list.js
var yhcxListPage;
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
    yhm:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    yhcxListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    yhcxListPage.getConstantFlagMap();
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
        //yhcxListPage.setData({constantFlagMap:constantFlagMap});
        let yhShzt=constantFlagMap.yhShzt;
        let constantFlags=yhShzt;
        yhcxListPage.getConstantMap(constantFlags);
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
        yhcxListPage.setData({constantMap:constantMap});
        yhcxListPage.getListData();
      }
    })
  },
  showPageView:function(flag){
    if(flag){
      yhcxListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      yhcxListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      yhcxListPage.setData({showToolBarView:true});
    }
    else{
      yhcxListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      yhcxListPage.setData({showNoDataView:true});
    }
    else{
      yhcxListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="yhm_inp"){
      let yhm=e.detail.value;
      yhcxListPage.setData({yhm:yhm});
    }
  },
  resetToolBarData:function(){
    yhcxListPage.setData({yhm:""});
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=yhcxListPage.data.prePageFlag;
    let nextPageFlag=yhcxListPage.data.nextPageFlag;
    let currentPage=yhcxListPage.data.currentPage;
    let pageCount=yhcxListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      yhcxListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      yhcxListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    yhcxListPage.setData({currentPage:currentPage});
    yhcxListPage.getListData();
  },
  getListData:function(){
    let currentPage=yhcxListPage.data.currentPage;
    let pageSize=yhcxListPage.data.pageSize;
    let yhm=yhcxListPage.data.yhm;
    wx.request({
      url: rootIP+"getYongHuList",
      data:{page:currentPage,rows:pageSize,yhm:yhm},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        yhcxListPage.setData({yhList:[]});
        if(status=="ok"){
          var yhList=data.list;
          for(let i=0;i<yhList.length;i++){
            let yh=yhList[i];
            let shzt=yh.shzt;
            let shztMc=yhcxListPage.getShztMcById(shzt);
            yh.shztMc=shztMc;
          }
          yhcxListPage.setData({yhList:yhList});
          yhcxListPage.showNoDataView(false);
          yhcxListPage.setData({noDataText:""});
        }
        else{
          yhcxListPage.showNoDataView(true);
          yhcxListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        yhcxListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        yhcxListPage.showToolBarView(e);
      }
    })
  },
  getShztMcById:function(shztId){
    let constantMap=yhcxListPage.data.constantMap;
    let shztMap=constantMap.yhShztMap;
    //console.log(shztMap);
    var str;
    switch (shztId) {
    case shztMap.dshShzt:
      str=shztMap.dshShztMc;//待审核
      break;
    case shztMap.shtgShzt:
      str=shztMap.shtgShztMc;//审核通过
      break;
    case shztMap.bjzShzt:
      str=shztMap.bjzShztMc;//编辑中
      break;
    }
    return str;
  },
  goEditPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/xtgl/yhcx/edit?id='+id,
    })
  },
  goDetailPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/xtgl/yhcx/detail?id='+id,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})