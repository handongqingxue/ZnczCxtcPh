// pages/home/home.js
var home;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ddgl_ddzt:1,
    ddgl_dsh:2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    home=this;

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  goPage:function(e){
    let pageFlag=e.currentTarget.dataset.pageflag;
    let url="/pages/";
    console.log(pageFlag)
    switch (pageFlag) {
      case home.data.ddgl_ddzt:
        url+='ddgl/ddzt/list';
        break;
        case home.data.ddgl_dsh:
          url+='ddgl/dsh/list';
          break;
    }
    wx.redirectTo({
      url: url,
    })
  }
})