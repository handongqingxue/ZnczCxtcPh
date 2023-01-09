// pages/sjgl/zhcx/detail.js
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
    //let id=6;
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
        let sjShzt=constantFlagMap.sjShzt;
        let constantFlags=sjShzt;
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
        detailPage.getSJInfo();
      }
    })
  },
  getSJInfo:function(){
    let id=detailPage.data.id;
    wx.request({
      url: rootIP+"getSiJi",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let sj=data.sj;
        let xm=sj.xm;
        let sjh=sj.sjh;
        let sfzzp=sj.sfzzp;
        let sfzh=sj.sfzh;
        let zgzyxqz=sj.zgzyxqz;
        let jzyxqz=sj.jzyxqz;
        let zgzs=sj.zgzs;
        let jz=sj.jz;
        let zyzt=sj.zyzt;
        let zyztMc=zyzt?"是":"否";
        let shzt=sj.shzt;
        let shztMc=detailPage.getShztMcById(shzt);
        detailPage.setData({xm:xm,sjh:sjh,sfzzp:sfzzp==null?null:serverRootIP+sfzzp,sfzh:sfzh,zgzyxqz:zgzyxqz,jzyxqz:jzyxqz,zgzs:zgzs==null?null:serverRootIP+zgzs,jz:jz==null?null:serverRootIP+jz,zyztMc:zyztMc,shztMc:shztMc});
      }
    })
  },
  getShztMcById:function(shztId){
    let constantMap=detailPage.data.constantMap;
    let shztMap=constantMap.sjShztMap;
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
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/sjgl/zhcx/list',
    })
  },
})