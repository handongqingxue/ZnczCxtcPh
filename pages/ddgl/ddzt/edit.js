// pages/ddgl/ddzt/edit.js
var editPage;
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
    editPage=this;
    rootIP=getApp().getRootIP();
    let id=1;//options.id;
    console.log(id)
    editPage.setData({id:id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    editPage.getDdztInfo();
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
  checkEdit:function(){
    if(editPage.checkMc()){
      editPage.editDingDanZhuangTai();
    }
  },
  getDdztInfo:function(){
    let id=editPage.data.id;
    wx.request({
      url: rootIP+"getDDZT",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let ddzt=data.ddzt;
        editPage.setData({ddzt:ddzt});
      }
    })
  },
  editDingDanZhuangTai:function(){
    let ddzt=editPage.data.ddzt;
    let id=ddzt.id;
    let mc=ddzt.mc;
    let px=ddzt.px;
    console.log(mc)
    console.log(px)
    wx.request({
      url: rootIP+"editDingDanZhuangTai",
      data:{id:id,mc:mc,px:px},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        console.log("message==="+message)
        if(message=="ok"){
          wx.showToast({
            title: data.info,
          })
          editPage.goListPage();          
        }
        else{
          wx.showToast({
            title: data.info,
          })
        }
      }
    })
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="mc_inp"){
      let mc=e.detail.value;
      let ddzt=editPage.data.ddzt;
      ddzt.mc=mc;
      editPage.setData({ddzt:ddzt});
    }
    else if(e.currentTarget.id=="px_inp"){
      let px=e.detail.value;
      let ddzt=editPage.data.ddzt;
      ddzt.px=px;
      editPage.setData({ddzt:ddzt});
    }
  },
  focusMc:function(){
    let mc=editPage.data.ddzt.mc;
    if(mc=="名称不能为空"){
      let ddzt=editPage.data.ddzt;
      ddzt.mc='';
      editPage.setData({ddzt:ddzt});
    }
  },
  checkMc:function(){
    let mc=editPage.data.ddzt.mc;
    if(mc==""||mc==null||mc=="名称不能为空"){
      let ddzt=editPage.data.ddzt;
      ddzt.mc='名称不能为空';
      editPage.setData({ddzt:ddzt});
      return false;
    }
    else{
      return true;
    }
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/ddgl/ddzt/list',
    })
  }
})