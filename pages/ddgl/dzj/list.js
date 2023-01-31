// pages/ddgl/dzj/list.js
var dzjListPage;
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
    prePageFlag:1,
    nextPageFlag:2,
    prePageEnable:false,
    nextPageEnable:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    dzjListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    dzjListPage.getConstantFlagMap();
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
        //dzjListPage.setData({constantFlagMap:constantFlagMap});
        let lxlx=constantFlagMap.lxlx;
        let ddzt=constantFlagMap.ddzt;
        let ddShlx=constantFlagMap.ddShlx;
        let constantFlags=lxlx+","+ddzt+","+ddShlx;
        dzjListPage.getConstantMap(constantFlags);
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
        dzjListPage.setData({constantMap:constantMap});
        dzjListPage.getListData();
      }
    })
  },
  showPageView:function(flag){
    if(flag){
      dzjListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      dzjListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      dzjListPage.setData({showToolBarView:true});
    }
    else{
      dzjListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      dzjListPage.setData({showNoDataView:true});
    }
    else{
      dzjListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="ddh_inp"){
      let ddh=e.detail.value;
      dzjListPage.setData({ddh:ddh});
    }
    else if(e.currentTarget.id=="cyclCph_inp"){
      let cyclCph=e.detail.value;
      dzjListPage.setData({cyclCph:cyclCph});
    }
  },
  resetToolBarData:function(){
    dzjListPage.setData({ddh:"",cyclCph:""});
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=dzjListPage.data.prePageFlag;
    let nextPageFlag=dzjListPage.data.nextPageFlag;
    let currentPage=dzjListPage.data.currentPage;
    let pageCount=dzjListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      dzjListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      dzjListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    dzjListPage.setData({currentPage:currentPage});
    dzjListPage.getListData();
  },
  getListData:function(){
    let currentPage=dzjListPage.data.currentPage;
    let pageSize=dzjListPage.data.pageSize;
    let ddh=dzjListPage.data.ddh;
    let ddztConstantMap=dzjListPage.data.constantMap.ddztMap;
    let defaultDdztMc=ddztConstantMap.djyDdztMc;
    let cyclCph=dzjListPage.data.cyclCph;
    
    wx.request({
      url: rootIP+"getDDZHCXList",
      data:{page:currentPage,rows:pageSize,ddh:ddh,ddztMc:defaultDdztMc,cyclCph:cyclCph},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        dzjListPage.setData({dshList:[]});
        if(status=="ok"){
          var dshList=data.list;
          for(let i=0;i<dshList.length;i++){
            let dsh=dshList[i];
            let lxlx=dsh.lxlx;
            let lxlxMc=dzjListPage.getLxlxMcById(lxlx);
            dsh.lxlxMc=lxlxMc;
          }
          dzjListPage.setData({dshList:dshList});
          dzjListPage.showNoDataView(false);
          dzjListPage.setData({noDataText:""});
        }
        else{
          dzjListPage.showNoDataView(true);
          dzjListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        dzjListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        dzjListPage.showToolBarView(e);
      }
    })
  },
  getLxlxMcById:function(lxlxId){
    let constantMap=dzjListPage.data.constantMap;
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
          let ddztConstantMap=dzjListPage.data.constantMap.ddztMap;
          let yjdsmDdztMc=ddztConstantMap.yjdsmDdztMc;
          let ddztMc;
          if(shjg)
            ddztMc=yjdsmDdztMc;
          let ddShlxConstantMap=dzjListPage.data.constantMap.ddShlxMap;
          let shlx=ddShlxConstantMap.zjshShlx;
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
       dzjListPage.goQrcodeInfoPage(cph);
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
      url: '/pages/ddgl/dzj/qrcodeInfo?cph='+cph,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})