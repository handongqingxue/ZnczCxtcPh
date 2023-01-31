// pages/ddgl/dzj/qrcodeInfo.js
var qrcodeInfoPage;
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
  onLoad: function (options) {
    qrcodeInfoPage=this;
    rootIP=getApp().getRootIP();
    let cph=options.cph;
    console.log(cph)
    qrcodeInfoPage.setData({cph:cph});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    qrcodeInfoPage.getConstantFlagMap();
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
        let ddzt=constantFlagMap.ddzt;
        let constantFlags=ddzt;
        qrcodeInfoPage.getConstantMap(constantFlags);
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
        qrcodeInfoPage.setData({constantMap:constantMap});
        qrcodeInfoPage.getDzjInfo();
      }
    })
  },
  getDzjInfo:function(){
    let cph=qrcodeInfoPage.data.cph;
    let djyDdztMc=qrcodeInfoPage.data.constantMap.ddztMap.djyDdztMc;
    wx.request({
      url: rootIP+"getQrcodeInfoByCphZt",
      method: 'POST',
      data: {cyclCph:cph,ddztMc:djyDdztMc},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let dingDan=data.dingDan;
        let ddh=dingDan.ddh;
        let cyclCph=dingDan.cyclCph;
        qrcodeInfoPage.setData({ddh:ddh,cyclCph:cyclCph});
      }
    })
  },
})