// pages/wzgl/wzlx/edit.js
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
    let id=options.id;
    //let id=3;
    console.log(id)
    editPage.setData({id:id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    editPage.getWZLXInfo();
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
      editPage.editWuZiLeiXing();
    }
  },
  getWZLXInfo:function(){
    let id=editPage.data.id;
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
        editPage.setData({mc:mc,px:px,cjsj:cjsj,bjsj:bjsj,bz:bz});
      }
    })
  },
  editWuZiLeiXing:function(){
    let id=editPage.data.id;
    let mc=editPage.data.mc;
    let px=editPage.data.px;
    let bz=editPage.data.bz;
    console.log(mc)
    console.log(px)
    console.log(bz)
    wx.request({
      url: rootIP+"editWuZiLeiXing",
      data:{id:id,mc:mc,px:px,bz:bz},
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
      editPage.setData({mc:mc});
    }
    else if(e.currentTarget.id=="px_inp"){
      let px=e.detail.value;
      editPage.setData({px:px});
    }
    else if(e.currentTarget.id=="bz_inp"){
      let bz=e.detail.value;
      editPage.setData({bz:bz});
    }
  },
  focusMc:function(){
    let mc=editPage.data.mc;
    if(mc=="名称不能为空"){
      editPage.setData({mc:''});
    }
  },
  checkMc:function(){
    let mc=editPage.data.mc;
    if(mc==""||mc==null||mc=="名称不能为空"){
      editPage.setData({mc:'名称不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/wzgl/wzlx/list',
    })
  }
})