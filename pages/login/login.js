// pages/login/login.js
var login;
var rootIP;
var utilMd5;//https://cloud.tencent.com/developer/article/1931813
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    login=this;
    rootIP=getApp().getRootIP();
    utilMd5 = require('../../utils/md5.js');
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
  checkInfo:function(){
    if(login.checkYhm()){
      if(login.checkMm()){
        login.login();
      }
    }
  },
  login:function(){
    let yhm=login.data.yhm;
    let mm=utilMd5.hexMD5(login.data.mm).toUpperCase();
    wx.request({
      url: rootIP+"login",
      data:{yhm:yhm,mm:mm},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        if(status=="ok"){
          wx.setStorageSync("yongHu",data.yongHu);
          wx.redirectTo({
            url: '/pages/xtgl/yhxx',
          })
        }
        else{
          wx.showToast({
            title: '登录失败',
          })
        }
      }
    })
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="yhm_inp"){
      let yhm=e.detail.value;
      login.setData({yhm:yhm});
    }
    else if(e.currentTarget.id=="mm_inp"){
      let mm=e.detail.value;
      login.setData({mm:mm});
    }
  },
  focusYhm:function(){
    let yhm=login.data.yhm;
    if(yhm=="用户名不能为空"){
      login.setData({yhm:''});
    }
  },
  checkYhm:function(){
    let yhm=login.data.yhm;
    if(yhm==""||yhm==null||yhm=="用户名不能为空"){
      login.setData({yhm:'用户名不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkMm:function(){
    let mm=login.data.mm;
    if(mm==""||mm==null){
      wx.showToast({
        title: '密码不能为空',
      })
      return false;
    }
    else{
      return true;
    }
  }
})