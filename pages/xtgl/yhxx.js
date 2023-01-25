// pages/xtgl/yhxx.js
var yhxxPage;
var rootIP;
var utilMd5;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    showXgmmView:false,
    showXgyhxxView:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    yhxxPage=this;
    rootIP=getApp().getRootIP();
    utilMd5 = require('../../utils/md5.js');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let yongHu=wx.getStorageSync("yongHu");
    let nc=yongHu.nc;
    let xm=yongHu.xm;
    let js=yongHu.js;
    yhxxPage.setData({yongHu:yongHu,nc:nc,xm:xm,js:js});
    yhxxPage.getConstantFlagMap();
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
        //dshListPage.setData({constantFlagMap:constantFlagMap});
        let yhShzt=constantFlagMap.yhShzt;
        let constantFlags=yhShzt;
        yhxxPage.getConstantMap(constantFlags);
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
        yhxxPage.setData({constantMap:constantMap});
      }
    })
  },
  showXgmmView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      yhxxPage.setData({showXgmmView:true});
    }
    else{
      yhxxPage.setData({showXgmmView:false});
    }
  },
  showXgyhxxView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      yhxxPage.setData({showXgyhxxView:true});
    }
    else{
      yhxxPage.setData({showXgyhxxView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="mm_inp"){
      let mm=e.detail.value;
      yhxxPage.setData({mm:mm});
    }
    else if(e.currentTarget.id=="xmm_inp"){
      let xmm=e.detail.value;
      yhxxPage.setData({xmm:xmm});
    }
    else if(e.currentTarget.id=="xmm2_inp"){
      let xmm2=e.detail.value;
      yhxxPage.setData({xmm2:xmm2});
    }
    else if(e.currentTarget.id=="nc_inp"){
      let nc=e.detail.value;
      yhxxPage.setData({nc:nc});
    }
    else if(e.currentTarget.id=="xm_inp"){
      let xm=e.detail.value;
      yhxxPage.setData({xm:xm});
    }
    else if(e.currentTarget.id=="js_ta"){
      let js=e.detail.value;
      yhxxPage.setData({js:js});
    }
  },
  checkMm:function(){
    let mm=yhxxPage.data.mm;
    if(mm==""||mm==null){
      wx.showToast({
        title: "原密码不能为空",
      })
      return false;
    }
    else{
      let yhm=yhxxPage.data.yongHu.yhm;
      mm=utilMd5.hexMD5(mm).toUpperCase();
      wx.request({
        url: rootIP+"checkMm",
        data:{mm:mm,yhm:yhm},
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          let data=res.data;
          let status=data.status;
          console.log("status==="+status)
          if(status=="ok"){
            if(yhxxPage.checkXmm()){
              if(yhxxPage.checkXmm2()){
                yhxxPage.updateMmByYhId();
              }
            }
          }
          else{
            wx.showToast({
              title: data.message,
            })
          }
        }
      })
    }
  },
  checkXmm:function(){
    let mm=yhxxPage.data.mm;
    let xmm=yhxxPage.data.xmm;
    if(xmm==""||xmm==null){
      wx.showToast({
        title: "新密码不能为空",
      })
      return false;
    }
    if(xmm==mm){
      wx.showToast({
        title: "新密码不能和原密码一致！",
      })
      return false;
    }
    else{
      return true;
    }
  },
  //验证确认密码
  checkXmm2:function(){
    let xmm=yhxxPage.data.xmm;
    let xmm2=yhxxPage.data.xmm2;
    if(xmm2==null||xmm2==""){
      wx.showToast({
        title: "确认密码不能为空",
      })
      return false;
    }
    else if(xmm!=xmm2){
      wx.showToast({
        title: "两次密码不一致！",
      })
      return false;
    }
    else
      return true;
  },
  checkEditMm:function(){
    yhxxPage.checkMm();
  },
  updateMmByYhId:function(){
    let id=yhxxPage.data.yongHu.id;
    let mm=yhxxPage.data.xmm;
    mm=utilMd5.hexMD5(mm).toUpperCase();
    wx.request({
      url: rootIP+"updateMmByYhId",
      data:{mm:mm,id:id},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        if(status=="ok"){
          //https://blog.csdn.net/Tir_zhang/article/details/124158066
          wx.showModal({
            title: "提示",
            content: data.message,
            success (res) {
              if (res.confirm) {
                //console.log('用户点击确定')
                yhxxPage.exit();
              } else if (res.cancel) {
                //console.log('用户点击取消')
              }
            }
          })
        }
        else{
          wx.showToast({
            title: data.message,
          })
        }
      }
    })
  },
  focusNc:function(){
    let nc=yhxxPage.data.nc;
    if(nc=="昵称不能为空"){
      yhxxPage.setData({nc:''});
    }
  },
  checkNc:function(){
    let nc=yhxxPage.data.nc;
    if(nc==""||nc==null||nc=="昵称不能为空"){
      yhxxPage.setData({nc:'昵称不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusXm:function(){
    let xm=yhxxPage.data.xm;
    if(xm=="姓名不能为空"){
      yhxxPage.setData({xm:''});
    }
  },
  checkXm:function(){
    let xm=yhxxPage.data.xm;
    if(xm==""||xm==null||xm=="姓名不能为空"){
      yhxxPage.setData({xm:'姓名不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkEditYhxx:function(){
    if(yhxxPage.checkNc()){
      if(yhxxPage.checkXm()){
        yhxxPage.editYongHu();
      }
    }
  },
  editYongHu:function(){
    let data=yhxxPage.data;
    let yongHu=data.yongHu;
    let yhShztMap=data.constantMap.yhShztMap;
    let id=yongHu.id;
    let nc=data.nc;
    let xm=data.xm;
    let js=data.js;
    let shzt=yongHu.shzt;
    let dshShzt=yhShztMap.dshShzt;
    let bjzShzt=yhShztMap.bjzShzt;
    console.log(id)
    console.log(shzt)
    console.log(dshShzt)
    console.log(bjzShzt)
    if(shzt==bjzShzt)
				shzt=dshShzt;
    wx.request({
      url: rootIP+"editYongHu",
      data:{id:id,nc:nc,xm:xm,js:js,shzt:shzt},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        console.log("message==="+message)
        if(message=="ok"){
          //https://blog.csdn.net/Tir_zhang/article/details/124158066
          wx.showModal({
            title: "提示",
            content: data.info,
            success (res) {
              if (res.confirm) {
                //console.log('用户点击确定')
                yhxxPage.exit();
              } else if (res.cancel) {
                //console.log('用户点击取消')
              }
            }
          })
        }
        else{
          wx.showToast({
            title: data.message,
          })
        }
      }
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  },
  exit:function(){
    wx.redirectTo({
      url: '/pages/login/login',
    })
  }
})