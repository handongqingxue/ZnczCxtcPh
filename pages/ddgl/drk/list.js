// pages/ddgl/drk/list.js
var drkListPage;
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
    cyclCph:"",
    yssMc:"",
    wzMc:"",
    fhdwMc:"",
    shdwMc:"",
    cysjXm:"",
    cysjSfzh:"",
    prePageFlag:1,
    nextPageFlag:2,
    prePageEnable:false,
    nextPageEnable:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    drkListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    drkListPage.getConstantFlagMap();
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
        //drkListPage.setData({constantFlagMap:constantFlagMap});
        let lxlx=constantFlagMap.lxlx;
        let ddzt=constantFlagMap.ddzt;
        let ddShlx=constantFlagMap.ddShlx;
        let constantFlags=lxlx+","+ddzt+","+ddShlx;
        drkListPage.getConstantMap(constantFlags);
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
        drkListPage.setData({constantMap:constantMap});
        drkListPage.getListData();
      }
    })
  },
  showPageView:function(flag){
    if(flag){
      drkListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      drkListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      drkListPage.setData({showToolBarView:true});
    }
    else{
      drkListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      drkListPage.setData({showNoDataView:true});
    }
    else{
      drkListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="ddh_inp"){
      let ddh=e.detail.value;
      drkListPage.setData({ddh:ddh});
    }
    else if(e.currentTarget.id=="cyclCph_inp"){
      let cyclCph=e.detail.value;
      drkListPage.setData({cyclCph:cyclCph});
    }
    else if(e.currentTarget.id=="yssMc_inp"){
      let yssMc=e.detail.value;
      drkListPage.setData({yssMc:yssMc});
    }
    else if(e.currentTarget.id=="wzMc_inp"){
      let wzMc=e.detail.value;
      drkListPage.setData({wzMc:wzMc});
    }
    else if(e.currentTarget.id=="fhdwMc_inp"){
      let fhdwMc=e.detail.value;
      drkListPage.setData({fhdwMc:fhdwMc});
    }
    else if(e.currentTarget.id=="shdwMc_inp"){
      let shdwMc=e.detail.value;
      drkListPage.setData({shdwMc:shdwMc});
    }
    else if(e.currentTarget.id=="cysjXm_inp"){
      let cysjXm=e.detail.value;
      drkListPage.setData({cysjXm:cysjXm});
    }
    else if(e.currentTarget.id=="cysjSfzh_inp"){
      let cysjSfzh=e.detail.value;
      drkListPage.setData({cysjSfzh:cysjSfzh});
    }
  },
  resetToolBarData:function(){
    drkListPage.setData({ddh:"",cyclCph:"",yssMc:"",wzMc:"",fhdwMc:"",shdwMc:"",cysjXm:"",cysjSfzh:""});
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=drkListPage.data.prePageFlag;
    let nextPageFlag=drkListPage.data.nextPageFlag;
    let currentPage=drkListPage.data.currentPage;
    let pageCount=drkListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      drkListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      drkListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    drkListPage.setData({currentPage:currentPage});
    drkListPage.getListData();
  },
  getListData:function(){
    let currentPage=drkListPage.data.currentPage;
    let pageSize=drkListPage.data.pageSize;
    let ddh=drkListPage.data.ddh;
    let ddztConstantMap=drkListPage.data.constantMap.ddztMap;
    let defaultDdztMc=ddztConstantMap.drkDdztMc;
    let cyclCph=drkListPage.data.cyclCph;
    let yssMc=drkListPage.data.yssMc;
    let wzMc=drkListPage.data.wzMc;
    let fhdwMc=drkListPage.data.fhdwMc;
    let shdwMc=drkListPage.data.shdwMc;
    let cysjXm=drkListPage.data.cysjXm;
    let cysjSfzh=drkListPage.data.cysjSfzh;
    
    wx.request({
      url: rootIP+"getDDZHCXList",
      data:{page:currentPage,rows:pageSize,ddh:ddh,ddztMc:defaultDdztMc,cyclCph:cyclCph,yssMc:yssMc,wzMc:wzMc,fhdwMc:fhdwMc,shdwMc:shdwMc,cysjXm:cysjXm,cysjSfzh:cysjSfzh},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        drkListPage.setData({dshList:[]});
        if(status=="ok"){
          var dshList=data.list;
          for(let i=0;i<dshList.length;i++){
            let dsh=dshList[i];
            let lxlx=dsh.lxlx;
            let lxlxMc=drkListPage.getLxlxMcById(lxlx);
            dsh.lxlxMc=lxlxMc;
          }
          drkListPage.setData({dshList:dshList});
          drkListPage.showNoDataView(false);
          drkListPage.setData({noDataText:""});
        }
        else{
          drkListPage.showNoDataView(true);
          drkListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        drkListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        drkListPage.showToolBarView(e);
      }
    })
  },
  getLxlxMcById:function(lxlxId){
    let constantMap=drkListPage.data.constantMap;
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
          let ddztConstantMap=drkListPage.data.constantMap.ddztMap;
          let ejdsmDdztMc=ddztConstantMap.ejdsmDdztMc;
          let ddztMc;
          if(shjg)
            ddztMc=ejdsmDdztMc;
          let ddShlxConstantMap=drkListPage.data.constantMap.ddShlxMap;
          let shlx=ddShlxConstantMap.rkshShlx;
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
  /**
   * 扫码事件:https://blog.csdn.net/qq_29528701/article/details/117391740
   */
  scanCodeEvent: function(){
    wx.scanCode({
      //onlyFromCamera: true,// 只允许从相机扫码
      success(res){
        let cph=res.result;
        drkListPage.goQrcodeInfoPage(cph);
      }
    })
  },
  goQrcodeInfoPage:function(cph){
    /*
    console.log('扫码成功：'+cph)
    wx.showToast({
      title: '扫码成功：'+JSON.stringify(res),
    })
    */
    wx.redirectTo({
      url: '/pages/ddgl/drk/qrcodeInfo?cph='+cph,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})