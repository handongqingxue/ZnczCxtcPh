// pages/ddgl/zhcx/detail.js
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
    //let id=16;
    console.log(id);
    detailPage.setData({id:id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    detailPage.getDDInfo();
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
  getDDInfo:function(){
    let id=detailPage.data.id;
    wx.request({
      url: rootIP+"getDingDan",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let dd=data.dd;
        let dfgbjl=data.dfgbjl;
        let yzxzl=dd.yzxzl;
        let lxlx=dd.lxlx;
        let sjzl=dd.sjzl;
        let jhysrq=dd.jhysrq;
        let bz=dd.bz;
        let jszl=dd.jszl;
        let bs=dd.bs;
        let ks=dd.ks;
        let dfgbjz=dfgbjl.dfgbjz;
        let dfgbpz=dfgbjl.dfgbpz;
        let dfgbmz=dfgbjl.dfgbmz;
        let dfbdzp=dfgbjl.dfbdzp;
        let dfgbsj=dfgbjl.dfgbsj;
        let yssMc=dd.yssMc;
        let wzlxMc=dd.wzlxMc;
        let wzMc=dd.wzMc;
        let fhdwMc=dd.fhdwMc;
        let shdwMc=dd.shdwMc;
        let cyclCph=dd.cyclCph;
        let cysjXm=dd.cysjXm;
        detailPage.setData({yzxzl:yzxzl,lxlx:lxlx,sjzl:sjzl,jhysrq:jhysrq,bz:bz,jszl:jszl,bs:bs,ks:ks,dfgbjz:dfgbjz,dfgbpz:dfgbpz,dfgbmz:dfgbmz,dfbdzp:serverRootIP+dfbdzp,dfgbsj:dfgbsj,yssMc:yssMc,wzlxMc:wzlxMc,wzMc:wzMc,fhdwMc:fhdwMc,shdwMc:shdwMc,cyclCph:cyclCph,cysjXm:cysjXm});
      }
    })
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/ddgl/zhcx/list',
    })
  },
})