// pages/dwgl/shdw/new.js
var newPage;
var rootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    showDlOption:false,
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
    newPage.getConstantFlagMap();
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
        let dlZt=constantFlagMap.dlZt;
        let constantFlags=dlZt;
        newPage.getConstantMap(constantFlags);
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
        newPage.setData({constantMap:constantMap});
        newPage.getDlSelectData();
      }
    })
  },
  checkNew:function(){
    if(newPage.checkMc()){
      newPage.newShouHuoDanWei();
    }
  },
  newShouHuoDanWei:function(){
    let mc=newPage.data.mc;
    let dlSelectId=newPage.data.dlSelectId;
    console.log(mc)
    console.log("dlSelectId==="+dlSelectId)
    wx.request({
      url: rootIP+"newShouHuoDanWei",
      data:{mc:mc,dlId:dlSelectId},
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
  // 点击下拉显示框
  showDlOption() {
    newPage.setData({
      showDlOption: !newPage.data.showDlOption,
    });
  },
  // 点击下拉列表
  selectDlOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let dlList=newPage.data.dlList;
    let dl=dlList[index];
    console.log(index+","+dl.id+","+dl.mc);
    newPage.setData({
      dlSelectIndex: index,
      dlSelectId: dl.id,
      showDlOption: !newPage.data.showDlOption
    });
  },
  getDlSelectData:function(){
    let dlZtMap=newPage.data.constantMap.dlZtMap;
    let zyZt=dlZtMap.zyZt;
    wx.request({
      url: rootIP+"getDuiLieSelectList",
      data:{zt:zyZt},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let dlList=res.data.list;
        dlList.unshift({"id":"","mc":"请选择"});
        //console.log(dlList);
        newPage.setData({dlList:dlList});
      }
    })
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/dwgl/shdw/list',
    })
  }
})