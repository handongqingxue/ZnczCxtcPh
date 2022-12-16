// pages/wzgl/wzlx/detail.js
var detailPage;
var rootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    detailPage=this;
    rootIP=getApp().getRootIP();
    let id=options.id;
    //let id=3;
    console.log(id)
    detailPage.setData({id:id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    detailPage.getWZLXInfo();
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
  getWZLXInfo:function(){
    let id=detailPage.data.id;
    wx.request({
      url: rootIP+"getWZLX",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let wzlx=data.wzlx;
        let mc=wzlx.mc;
        let px=wzlx.px;
        let cjsj=wzlx.cjsj;
        let bjsj=wzlx.bjsj;
        let bz=wzlx.bz;
        detailPage.setData({mc:mc,px:px,cjsj:cjsj,bjsj:bjsj,bz:bz});
      }
    })
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/wzgl/wzlx/list',
    })
  }
})