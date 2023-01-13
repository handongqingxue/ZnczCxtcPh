// pages/pdgl/dlcx/detail.js
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
    let id=options.id;
    //let id=5;
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
        //dshListPage.setData({constantFlagMap:constantFlagMap});
        let dlJhxs=constantFlagMap.dlJhxs;
        let dlZt=constantFlagMap.dlZt;
        let constantFlags=dlJhxs+","+dlZt;
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
        detailPage.getDLInfo();
      }
    })
  },
  getDLInfo:function(){
    let id=detailPage.data.id;
    wx.request({
      url: rootIP+"getDuiLie",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let dl=data.dl;
        let mc=dl.mc;
        let dm=dl.dm;
        let jhxs=dl.jhxs;
        let jhxsMc=detailPage.getJhxsMcById(jhxs);
        let jhyz=dl.jhyz;
        let zt=dl.zt;
        let ztMc=detailPage.getZtMcById(zt);
        detailPage.setData({mc:mc,dm:dm,jhxsMc:jhxsMc,jhyz:jhyz,ztMc:ztMc});
      }
    })
  },
  getJhxsMcById:function(jhxsId){
    let constantMap=detailPage.data.constantMap;
    let jhxsMap=constantMap.dlJhxsMap;
    //console.log(jhxsMap);
    var str;
    switch (jhxsId) {
    case jhxsMap.zdjhJhxs:
      str=jhxsMap.zdjhJhxsMc;//自动叫号
      break;
    case jhxsMap.sdjhJhxs:
      str=jhxsMap.sdjhJhxsMc;//手动叫号
      break;
    }
    return str;
  },
  getZtMcById:function(ztId){
    let constantMap=detailPage.data.constantMap;
    let ztMap=constantMap.dlZtMap;
    //console.log(ztMap);
    var str;
    switch (ztId) {
    case ztMap.zyZt:
      str=ztMap.zyZtMc;//在用
      break;
    case ztMap.ztZt:
      str=ztMap.ztZtMc;//暂停
      break;
    case ztMap.fqZt:
      str=ztMap.fqZtMc;//废弃
      break;
    }
    return str;
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/pdgl/dlcx/list',
    })
  }
})