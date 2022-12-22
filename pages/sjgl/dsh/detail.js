// pages/sjgl/dsh/detail.js
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
    //let id=options.id;
    let id=4;
    console.log(id);
    detailPage.setData({id:id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    detailPage.getSJInfo();
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
        detailPage.setData({xm:xm,sjh:sjh,sfzzp:sfzzp==null?null:serverRootIP+sfzzp,sfzh:sfzh,zgzyxqz:zgzyxqz,jzyxqz:jzyxqz,zgzs:zgzs==null?null:serverRootIP+zgzs,jz:jz==null?null:serverRootIP+jz});
      }
    })
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/sjgl/dsh/list',
    })
  },
})