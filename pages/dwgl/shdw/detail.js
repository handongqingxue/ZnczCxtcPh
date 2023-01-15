// pages/dwgl/shdw/detail.js
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
     //let id=6;
    console.log(id)
    detailPage.setData({id:id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    detailPage.getShdwInfo();
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
  getShdwInfo:function(){
    let id=detailPage.data.id;
    wx.request({
      url: rootIP+"getShouHuoDanWei",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let shdw=data.shdw;
        let mc=shdw.mc;
        let dlMc=shdw.dlMc;
        let bjsj=shdw.bjsj;
        detailPage.setData({mc:mc,dlMc:dlMc,bjsj:bjsj});
      }
    })
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/dwgl/shdw/list',
    })
  }
})