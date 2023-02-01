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
        let lxlx=constantFlagMap.lxlx;
        let ddzt=constantFlagMap.ddzt;
        let ddShlx=constantFlagMap.ddShlx;
        let constantFlags=lxlx+","+ddzt+","+ddShlx;
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
        let id=dingDan.id;
        let ddh=dingDan.ddh;
        let cyclCph=dingDan.cyclCph;
        let wzMc=dingDan.wzMc;
        let yssMc=dingDan.yssMc;
        let fhdwMc=dingDan.fhdwMc;
        let shdwMc=dingDan.shdwMc;
        let lxlx=dingDan.lxlx;
        let lxlxMc=qrcodeInfoPage.getLxlxMcById(lxlx);
        let jhysrq=dingDan.jhysrq;
        let yzxzl=dingDan.yzxzl;
        qrcodeInfoPage.setData({id:id,ddh:ddh,cyclCph:cyclCph,wzMc:wzMc,yssMc:yssMc,fhdwMc:fhdwMc,shdwMc:shdwMc,lxlxMc:lxlxMc,jhysrq:jhysrq,yzxzl:yzxzl});
      }
    })
  },
  getLxlxMcById:function(lxlxId){
    let constantMap=qrcodeInfoPage.data.constantMap;
    let lxlxMap=constantMap.lxlxMap;
    //console.log(lxlxMap);
    var str;
    switch (lxlxId) {
      case lxlxMap.syLxlx:
        str=lxlxMap.syLxlxMc;//送运
        break;
      case lxlxMap.qyLxlx:
        str=lxlxMap.qyLxlxMc;//取运
        break;
    }
    return str;
  },
  checkById:function(e){
    let confirmStr="请确保所有订单都认真审核过！";
    wx.showModal({
      title: "提示",
      content: confirmStr,
      success (res) {
        if (res.confirm) {
          //console.log('用户点击确定')
          let id=qrcodeInfoPage.data.id;
          let shjg=e.currentTarget.dataset.shjg;
          let ddztConstantMap=qrcodeInfoPage.data.constantMap.ddztMap;
          let yjdsmDdztMc=ddztConstantMap.yjdsmDdztMc;
          let ddztMc;
          if(shjg)
            ddztMc=yjdsmDdztMc;
          let ddShlxConstantMap=qrcodeInfoPage.data.constantMap.ddShlxMap;
          let shlx=ddShlxConstantMap.zjshShlx;
          let yongHu=wx.getStorageSync("yongHu");
          let shrId=yongHu.id;
          wx.request({
            url: rootIP+"checkDingDanByIds",
            data:{ids:id,ddztMc:ddztMc,shlx:shlx,shjg:shjg,shrId:shrId},
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            success: function (res) {
              let data=res.data;
              let status=data.status;
              console.log("status==="+status)
              if(status==1){
                wx.showToast({
                  title: data.msg,
                })
                qrcodeInfoPage.goListPage();
              }
              else{
                wx.showToast({
                  title: data.msg,
                })
              }
            }
          })
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/ddgl/dzj/list',
    })
  }
})