// pages/dwgl/shdw/edit.js
var editPage;
var rootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    showDlOption:false,
    showSaveBut:true,
    showSavingBut:false,
    showSavedBut:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    editPage=this;
    rootIP=getApp().getRootIP();
    let id=options.id;
    //let id=6;
    console.log(id)
    editPage.setData({id:id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    editPage.getConstantFlagMap();
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
        editPage.getConstantMap(constantFlags);
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
        editPage.setData({constantMap:constantMap});
        editPage.getDlSelectData();
      }
    })
  },
  checkEdit:function(){
    if(editPage.checkMc()){
      editPage.editShouHuoDanWei();
    }
  },
  getSHDWInfo:function(){
    let id=editPage.data.id;
    wx.request({
      url: rootIP+"getShouHuoDanWei",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let shdw=data.shdw;
        let mc=shdw.mc;
        let dlId=shdw.dlId;
        let dlSelectIndex=editPage.getDlIndexInListById(dlId);
        let bjsj=shdw.bjsj;
        editPage.setData({mc:mc,dlSelectId:dlId,dlSelectIndex:dlSelectIndex,bjsj:bjsj});
      }
    })
  },
  editShouHuoDanWei:function(){
    editPage.saving(true);
    let id=editPage.data.id;
    let mc=editPage.data.mc;
    let dlSelectId=editPage.data.dlSelectId;
    console.log(mc)
    console.log(dlSelectId)
    wx.request({
      url: rootIP+"editShouHuoDanWei",
      data:{id:id,mc:mc,dlId:dlSelectId},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        console.log("message==="+message)
        if(message=="ok"){
          editPage.saving(false);
          wx.showToast({
            title: data.info,
          })
          setTimeout(() => {
            editPage.goListPage();
          }, 2000);    
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
  // 点击下拉显示框
  showDlOption() {
    editPage.setData({
      showDlOption: !editPage.data.showDlOption,
    });
  },
  // 点击下拉列表
  selectDlOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let dlList=editPage.data.dlList;
    let dl=dlList[index];
    console.log(index+","+dl.id+","+dl.mc);
    editPage.setData({
      dlSelectIndex: index,
      dlSelectId: dl.id,
      showDlOption: !editPage.data.showDlOption
    });
  },
  getDlSelectData:function(){
    let dlZtMap=editPage.data.constantMap.dlZtMap;
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
        editPage.setData({dlList:dlList});
        editPage.getSHDWInfo();
      }
    })
  },
  getDlIndexInListById:function(dlId){
    let dlSelectIndex;
    let dlList=editPage.data.dlList;
    //console.log(dlList)
    for(let i=0;i<dlList.length;i++){
      let dl=dlList[i];
      if(dlId==dl.id){
        dlSelectIndex=i;
        break;
      }
    }
    return dlSelectIndex;
  },
  saving:function(flag){
    if(flag){
      editPage.setData({showSaveBut:false,showSavingBut:true});
    }
    else{
      editPage.setData({showSavingBut:false,showSavedBut:true});
    }
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/dwgl/shdw/list',
    })
  }
})