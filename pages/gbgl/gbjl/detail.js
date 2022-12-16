// pages/gbgl/gbjl/detail.js
var detailPage;
var rootIP;
var serverRootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    detailPage=this;
    rootIP=getApp().getRootIP();
    serverRootIP=getApp().getServerRootIP();
    let id=options.id;
    //let id=19;
    console.log(id);
    detailPage.setData({id:id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    detailPage.getConstantFlagMap();
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
        let gbjlGbzt=constantFlagMap.gbjlGbzt;
        let gblx=constantFlagMap.gblx;
        let constantFlags=gbjlGbzt+","+gblx;
        detailPage.getConstantMap(constantFlags);
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
        detailPage.setData({constantMap:constantMap});
        detailPage.getGBJLInfo();
      }
    })
  },
  getGBJLInfo:function(){
    let id=detailPage.data.id;
    wx.request({
      url: rootIP+"getGBJL",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let gbjl=data.gbjl;
        let ddh=gbjl.ddh;
        let gbzl=gbjl.gbzl;
        let gbsj=gbjl.gbsj;
        let gbzt=gbjl.gbzt;
        let gbztMc=detailPage.getGbztMcById(gbzt);
        let gblx=gbjl.gblx;
        let gblxMc=detailPage.getGblxMcById(gblx);
        let zp1=gbjl.zp1;
        let zp2=gbjl.zp2;
        let zp3=gbjl.zp3;
        detailPage.setData({ddh:ddh,gbzl:gbzl,gbsj:gbsj,gbztMc:gbztMc,gblxMc:gblxMc,zp1:serverRootIP+zp1,zp2:serverRootIP+zp2,zp3:serverRootIP+zp3});
      }
    })
  },
  getGbztMcById:function(gbztId){
    let constantMap=detailPage.data.constantMap;
    let gbztMap=constantMap.gbjlGbztMap;
    //console.log(gbztMap);
    var str;
    switch (gbztId) {
    case gbztMap.zcGbzt:
      str=gbztMap.zcGbztMc;//正常
      break;
    case gbztMap.ycGbzt:
      str=gbztMap.ycGbztMc;//异常
      break;
    }
    return str;
  },
  getGblxMcById:function(gblxId){
    let constantMap=detailPage.data.constantMap;
    let gblxMap=constantMap.gblxMap;
    //console.log(gblxMap);
    var str;
    switch (gblxId) {
    case gblxMap.rcgbGblx:
      str=gblxMap.rcgbGblxMc;//入厂过磅
      break;
    case gblxMap.ccgbGblx:
      str=gblxMap.ccgbGblxMc;//出厂过磅
      break;
    }
    return str;
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/gbgl/gbjl/list',
    })
  },
})