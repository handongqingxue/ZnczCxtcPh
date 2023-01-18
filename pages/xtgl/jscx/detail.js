// pages/xtgl/jscx/detail.js
var detailPage;
var rootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    qxMcsRowHeight:40,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    detailPage=this;
    rootIP=getApp().getRootIP();
    let id=options.id;
    //let id=1;
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
        let jsZt=constantFlagMap.jsZt;
        let constantFlags=jsZt;
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
        detailPage.getJueSeInfo();
      }
    })
  },
  getJueSeInfo:function(){
    let id=detailPage.data.id;
    wx.request({
      url: rootIP+"getJueSe",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let js=data.js;
        let id=js.id;
        let mc=js.mc;
        let zt=js.zt;
        let ztMc=detailPage.getZtMcById(zt);
        let qxMcs=js.qxMcs;
        let qxMcsRowHeight=qxMcs.length/11*20;
        console.log(qxMcsRowHeight)
        let ms=js.ms;
        detailPage.setData({id:id,mc:mc,ztMc:ztMc,qxMcs:qxMcs,qxMcsRowHeight:qxMcsRowHeight,ms:ms});
      }
    })
  },
  getZtMcById:function(ztId){
    let constantMap=detailPage.data.constantMap;
    let jsZtMap=constantMap.jsZtMap;
    //console.log(jsZtMap);
    var str;
    switch (ztId) {
    case jsZtMap.xzZt:
      str=jsZtMap.xzZtMc;//新增
      break;
    case jsZtMap.zcsyZt:
      str=jsZtMap.zcsyZtMc;//正常使用
      break;
    case jsZtMap.fqZt:
      str=jsZtMap.fqZtMc;//废弃
      break;
    case jsZtMap.ywZt:
      str=jsZtMap.ywZtMc;//有误
      break;
    }
    return str;
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/xtgl/jscx/list',
    })
  },
})