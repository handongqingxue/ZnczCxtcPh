// pages/clgl/cntz/detail.js
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
  onLoad(options) {
    detailPage=this;
    rootIP=getApp().getRootIP();
    serverRootIP=getApp().getServerRootIP();
    let id=options.id;
    //let id=13;
    console.log(id);
    detailPage.setData({id:id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    detailPage.getCLTZInfo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  getCLTZInfo:function(){
    let id=detailPage.data.id;
    wx.request({
      url: rootIP+"getCLTZ",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let cltz=data.cltz;
        let ddh=cltz.ddh;
        let cyclCph=cltz.cyclCph;
        let ddztMc=cltz.ddztMc;
        let lxlxMc=cltz.lxlx==1?"送运":"取运";
        let jcsj=cltz.jcsj;
        let jczp=cltz.jczp;
        detailPage.setData({ddh:ddh,cyclCph:cyclCph,ddztMc:ddztMc,lxlxMc:lxlxMc,jcsj:jcsj,jczp:jczp==null?null:serverRootIP+jczp});
      }
    })
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/clgl/cntz/list',
    })
  },
})