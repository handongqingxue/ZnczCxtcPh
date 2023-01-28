// pages/ddgl/dsh/list.js
var dshListPage;
var rootIP;
var lxlxMap;
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
    wzMc:"",
    yssMc:"",
    fhdwMc:"",
    shdwMc:"",
    prePageFlag:1,
    nextPageFlag:2,
    prePageEnable:false,
    nextPageEnable:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    dshListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    dshListPage.getConstantFlagMap();
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
        //dshListPage.setData({constantFlagMap:constantFlagMap});
        let lxlx=constantFlagMap.lxlx;
        let ddzt=constantFlagMap.ddzt;
        let ddShlx=constantFlagMap.ddShlx;
        let constantFlags=lxlx+","+ddzt+","+ddShlx;
        dshListPage.getConstantMap(constantFlags);
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
        dshListPage.setData({constantMap:constantMap});
        dshListPage.getListData();
      }
    })
  },
  showPageView:function(flag){
    if(flag){
      dshListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      dshListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      dshListPage.setData({showToolBarView:true});
    }
    else{
      dshListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      dshListPage.setData({showNoDataView:true});
    }
    else{
      dshListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="ddh_inp"){
      let ddh=e.detail.value;
      dshListPage.setData({ddh:ddh});
    }
    else if(e.currentTarget.id=="wzMc_inp"){
      let wzMc=e.detail.value;
      dshListPage.setData({wzMc:wzMc});
    }
    else if(e.currentTarget.id=="yssMc_inp"){
      let yssMc=e.detail.value;
      dshListPage.setData({yssMc:yssMc});
    }
    else if(e.currentTarget.id=="fhdwMc_inp"){
      let fhdwMc=e.detail.value;
      dshListPage.setData({fhdwMc:fhdwMc});
    }
    else if(e.currentTarget.id=="shdwMc_inp"){
      let shdwMc=e.detail.value;
      dshListPage.setData({shdwMc:shdwMc});
    }
  },
  resetToolBarData:function(){
    dshListPage.setData({ddh:"",wzMc:"",yssMc:"",fhdwMc:"",shdwMc:""});
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=dshListPage.data.prePageFlag;
    let nextPageFlag=dshListPage.data.nextPageFlag;
    let currentPage=dshListPage.data.currentPage;
    let pageCount=dshListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      dshListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      dshListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    dshListPage.setData({currentPage:currentPage});
    dshListPage.getListData();
  },
  getListData:function(){
    let currentPage=dshListPage.data.currentPage;
    let pageSize=dshListPage.data.pageSize;
    let ddh=dshListPage.data.ddh;
    let ddztConstantMap=dshListPage.data.constantMap.ddztMap;
    let defaultDdztMc=ddztConstantMap.dshDdztMc;
    let wzMc=dshListPage.data.wzMc;
    let yssMc=dshListPage.data.yssMc;
    let fhdwMc=dshListPage.data.fhdwMc;
    let shdwMc=dshListPage.data.shdwMc;
    
    wx.request({
      url: rootIP+"getDDZHCXList",
      data:{page:currentPage,rows:pageSize,ddh:ddh,ddztMc:defaultDdztMc,wzMc:wzMc,yssMc:yssMc,fhdwMc:fhdwMc,shdwMc:shdwMc},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        dshListPage.setData({dshList:[]});
        if(status=="ok"){
          var dshList=data.list;
          for(let i=0;i<dshList.length;i++){
            let dsh=dshList[i];
            let lxlx=dsh.lxlx;
            let lxlxMc=dshListPage.getLxlxMcById(lxlx);
            dsh.lxlxMc=lxlxMc;
          }
          dshListPage.setData({dshList:dshList});
          dshListPage.showNoDataView(false);
          dshListPage.setData({noDataText:""});
        }
        else{
          dshListPage.showNoDataView(true);
          dshListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        dshListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        dshListPage.showToolBarView(e);
      }
    })
  },
  getLxlxMcById:function(lxlxId){
    let constantMap=dshListPage.data.constantMap;
    let lxlxMap=constantMap.lxlxMap;
    //console.log(lxlxMap);
    var str;
    switch (lxlxId) {
      case lxlxMap.syLxlx:
        str=lxlxMap.syLxlxMc;//送运
        break;
      case lxlxMap.qyLxlx:
        str=lxlxMap.qyLxlxMc;//取运
        break;
    }
    return str;
  },
  checkById:function(e){
    let confirmStr="请确保所有订单都认真审核过！";
    wx.showModal({
      title: "提示",
      content: confirmStr,
      success (res) {
        if (res.confirm) {
          //console.log('用户点击确定')
          let id=e.currentTarget.dataset.id;
          let shjg=e.currentTarget.dataset.shjg;
          let ddztConstantMap=dshListPage.data.constantMap.ddztMap;
          let yxdDdztMc=ddztConstantMap.yxdDdztMc;
          let bjzDdztMc=ddztConstantMap.bjzDdztMc;
          let ddztMc;
          if(shjg)
            ddztMc=yxdDdztMc;
          else
            ddztMc=bjzDdztMc;
          let ddShlxConstantMap=dshListPage.data.constantMap.ddShlxMap;
          let shlx=ddShlxConstantMap.xdshShlx;
          let yongHu=wx.getStorageSync("yongHu");
          let shrId=yongHu.id;
          wx.request({
            url: rootIP+"checkDingDanByIds",
            data:{ids:id,ddztMc:ddztMc,shlx:shlx,shjg:shjg,shrId:shrId},
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            success: function (res) {
              let data=res.data;
              let status=data.status;
              console.log("status==="+status)
              if(status==1){
                wx.showToast({
                  title: data.msg,
                })
              }
              else{
                
              }
            }
          })
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})