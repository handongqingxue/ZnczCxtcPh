// pages/dwgl/ck/new.js
var newPage;
var rootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    bz:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    newPage=this;
    rootIP=getApp().getRootIP();
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
  checkNew:function(){
    if(newPage.checkMc()){
      if(newPage.checkWZ()){
        newPage.newCangKu();
      }
    }
  },
  newCangKu:function(){
    let mc=newPage.data.mc;
    let wz=newPage.data.wz;
    let bz=newPage.data.bz;
    console.log(mc)
    console.log(wz)
    console.log(bz)
    wx.request({
      url: rootIP+"newCangKu",
      data:{mc:mc,wz:wz,bz:bz},
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
          newPage.goListPage();          
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
      newPage.setData({mc:mc});
    }
    else if(e.currentTarget.id=="wz_inp"){
      let wz=e.detail.value;
      newPage.setData({wz:wz});
    }
    else if(e.currentTarget.id=="bz_inp"){
      let bz=e.detail.value;
      newPage.setData({bz:bz});
    }
  },
  focusMc:function(){
    let mc=newPage.data.mc;
    if(mc=="名称不能为空"){
      newPage.setData({mc:''});
    }
  },
  checkMc:function(){
    let mc=newPage.data.mc;
    if(mc==""||mc==null||mc=="名称不能为空"){
      newPage.setData({mc:'名称不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusWZ:function(){
    let wz=newPage.data.wz;
    if(wz=="位置不能为空"){
      newPage.setData({wz:''});
    }
  },
  checkWZ:function(){
    let wz=newPage.data.wz;
    if(wz==""||wz==null||wz=="位置不能为空"){
      newPage.setData({wz:'位置不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/dwgl/ck/list',
    })
  }
})