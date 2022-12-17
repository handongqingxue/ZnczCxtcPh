// pages/wzgl/wzcx/edit.js
var editPage;
var rootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    showWzlxOption:false,
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
    //let id=options.id;
    let id=2;
    console.log(id)
    editPage.setData({id:id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    editPage.getWzlxSelectData();
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
      if(editPage.checkWZLXId()){
        editPage.editWuZi();
      }
    }
  },
  getWuZiInfo:function(){
    let id=editPage.data.id;
    wx.request({
      url: rootIP+"getWuZi",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let wz=data.wz;
        let mc=wz.mc;
        let wzlxId=wz.wzlxId;
        let wzlxSelectIndex=editPage.getWzlxIndexInListById(wzlxId);
        let bjsj=wz.bjsj;
        editPage.setData({mc:mc,wzlxSelectId:wzlxId,wzlxSelectIndex:wzlxSelectIndex,bjsj:bjsj});
      }
    })
  },
  editWuZi:function(){
    editPage.saving(true);
    let id=editPage.data.id;
    let mc=editPage.data.mc;
    let wzlxSelectId=editPage.data.wzlxSelectId;
    console.log(mc)
    console.log(wzlxSelectId)
    wx.request({
      url: rootIP+"editWuZi",
      data:{id:id,mc:mc,wzlxId:wzlxSelectId},
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
  //验证物资类型
  checkWZLXId:function(){
    let wzlxSelectId=editPage.data.wzlxSelectId;
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
    editPage.setData({
      showWzlxOption: !editPage.data.showWzlxOption,
    });
  },
  // 点击下拉列表
  selectWzlxOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let wzlxList=editPage.data.wzlxList;
    let wzlx=wzlxList[index];
    console.log(index+","+wzlx.id+","+wzlx.mc);
    editPage.setData({
      wzlxSelectIndex: index,
      wzlxSelectId: wzlx.id,
      showWzlxOption: !editPage.data.showWzlxOption
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
        editPage.setData({wzlxList:wzlxList});
        editPage.getWuZiInfo();
      }
    })
  },
  getWzlxIndexInListById:function(wzlxId){
    let wzlxSelectIndex;
    let wzlxList=editPage.data.wzlxList;
    //console.log(wzlxList)
    for(let i=0;i<wzlxList.length;i++){
      let wzlx=wzlxList[i];
      if(wzlxId==wzlx.id){
        wzlxSelectIndex=i;
        break;
      }
    }
    return wzlxSelectIndex;
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
      url: '/pages/wzgl/wzcx/list',
    })
  }
})