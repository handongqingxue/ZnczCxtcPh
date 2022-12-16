// pages/wzgl/wzcx/new.js
var newPage;
var rootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    showWzlxOption:false,
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
    newPage.getWzlxSelectData();
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
      if(newPage.checkWZLXId()){
        newPage.newWuZi();
      }
    }
  },
  newWuZi:function(){
    let mc=newPage.data.mc;
    let wzlxSelectId=newPage.data.wzlxSelectId;
    console.log(mc)
    console.log("wzlxSelectId==="+wzlxSelectId)
    wx.request({
      url: rootIP+"newWuZi",
      data:{mc:mc,wzlxId:wzlxSelectId},
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
  //验证物资类型
  checkWZLXId:function(){
    let wzlxSelectId=newPage.data.wzlxSelectId;
    if(wzlxSelectId==null||wzlxSelectId==""){
      wx.showToast({
        title: "请选择物资类型",
      })
      return false;
    }
    else
      return true;
  },
  // 点击下拉显示框
  showWzlxOption() {
    newPage.setData({
      showWzlxOption: !newPage.data.showWzlxOption,
    });
  },
  // 点击下拉列表
  selectWzlxOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let wzlxList=newPage.data.wzlxList;
    let wzlx=wzlxList[index];
    console.log(index+","+wzlx.id+","+wzlx.mc);
    newPage.setData({
      wzlxSelectIndex: index,
      wzlxSelectId: wzlx.id,
      showWzlxOption: !newPage.data.showWzlxOption
    });
  },
  getWzlxSelectData:function(){
    wx.request({
      url: rootIP+"getWuZiLeiXingSelectList",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let wzlxList=res.data.list;
        //console.log(wzlxList);
        newPage.setData({wzlxList:wzlxList});
      }
    })
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/wzgl/wzcx/list',
    })
  }
})