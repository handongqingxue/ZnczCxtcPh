// pages/clgl/dsh/detail.js
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
    //let id=7;
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
        let clPfjd=constantFlagMap.clPfjd;
        let clYslx=constantFlagMap.clYslx;
        let constantFlags=clPfjd+","+clYslx;
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
        detailPage.getCLInfo();
      }
    })
  },
  getCLInfo:function(){
    let id=detailPage.data.id;
    wx.request({
      url: rootIP+"getCheLiang",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let cl=data.cl;
        let cph=cl.cph;
        let fdjhm=cl.fdjhm;
        let clsbdh=cl.clsbdh;
        let zcrq=cl.zcrq;
        let pfjd=cl.pfjd;
        let pfjdMc=detailPage.getPfjdMcById(pfjd);
        let clyslx=cl.clyslx;
        let clyslxMc=detailPage.getYslxMcById(clyslx);
        let ppxh=cl.ppxh;
        let czxx=cl.czxx;
        let fzrq=cl.fzrq;
        let pz=cl.pz;
        let cllx=cl.cllx;
        let cllxMc;
        switch (cllx) {
          case 1:
            cllxMc="重型";
            break;
        }
        let zp=cl.zp;
        let xsz=cl.xsz;
        let scqd=cl.scqd;
        let pfjdcxjt=cl.pfjdcxjt;
        let sfzy=cl.sfzy;
        let sfzyMc=sfzy?"是":"否";
        let bz=cl.bz;
        detailPage.setData({cph:cph,fdjhm:fdjhm,clsbdh:clsbdh,zcrq:zcrq,pfjdMc:pfjdMc,clyslxMc:clyslxMc,ppxh:ppxh,czxx:czxx,fzrq:fzrq,pz:pz,cllxMc:cllxMc,zp:zp==null?null:serverRootIP+zp,xsz:xsz==null?null:serverRootIP+xsz,scqd:scqd==null?null:serverRootIP+scqd,pfjdcxjt:pfjdcxjt==null?null:serverRootIP+pfjdcxjt,sfzyMc:sfzyMc,bz:bz});
      }
    })
  },
  getPfjdMcById:function(pfjdId){
    let constantMap=detailPage.data.constantMap;
    let pfjdMap=constantMap.clPfjdMap;
    //console.log(pfjdMap);
    var str;
    switch (pfjdId) {
    case pfjdMap.gwryPfjd:
      str=pfjdMap.gwryPfjdMc;//国五燃油
      break;
    case pfjdMap.gwrqPfjd:
      str=pfjdMap.gwrqPfjdMc;//国五燃气
      break;
    case pfjdMap.glryPfjd:
      str=pfjdMap.glryPfjdMc;//国六燃油
      break;
    case pfjdMap.glrqPfjd:
      str=pfjdMap.glrqPfjdMc;//国六燃气
      break;
    case pfjdMap.ddPfjd:
      str=pfjdMap.ddPfjdMc;//电动
      break;
    }
    return str;
  },
  getYslxMcById:function(yslxId){
    let constantMap=detailPage.data.constantMap;
    let yslxMap=constantMap.clYslxMap;
    //console.log(yslxMap);
    var str;
    switch (yslxId) {
    case yslxMap.physYslx:
      str=yslxMap.physYslxMc;//普货运输
      break;
    case yslxMap.cnysYslx:
      str=yslxMap.cnysYslxMc;//厂内运输
      break;
    case yslxMap.whpysYslx:
      str=yslxMap.whpysYslxMc;//危化品运输
      break;
    }
    return str;
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/clgl/dsh/list',
    })
  },
})