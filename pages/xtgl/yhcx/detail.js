// pages/xtgl/yhcx/detail.js
var detailPage;
var rootIP;
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
    //let id=options.id;
    let id=11;
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
        let yhShzt=constantFlagMap.yhShzt;
        let constantFlags=yhShzt;
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
        detailPage.getYHInfo();
      }
    })
  },
  getYHInfo:function(){
    let id=detailPage.data.id;
    wx.request({
      url: rootIP+"getYongHu",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let yh=data.yh;
        let id=yh.id;
        let yhm=yh.yhm;
        let xm=yh.xm;
        let cjsj=yh.cjsj;
        let shzt=yh.shzt;
        let shztMc=detailPage.getShztMcById(shzt);
        let js=yh.js;
        let jsMcs=yh.jsMcs;
        detailPage.setData({id:id,yhm:yhm,xm:xm,cjsj:cjsj,shztMc:shztMc,js:js,jsMcs:jsMcs});
      }
    })
  },
  getShztMcById:function(shztId){
    let constantMap=detailPage.data.constantMap;
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
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/xtgl/yhcx/list',
    })
  },
})