// pages/pdgl/dlcx/new.js
var newPage;
var rootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    showSaveBut:true,
    showSavingBut:false,
    showSavedBut:false,
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
        let dlJhxs=constantFlagMap.dlJhxs;
        let dlZt=constantFlagMap.dlZt;
        let constantFlags=dlJhxs+","+dlZt;
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
        newPage.initJhxsSelectData();
        newPage.initZtSelectData();
      }
    })
  },
  initJhxsSelectData:function(){
    let dlJhxsMap=newPage.data.constantMap.dlJhxsMap;
    let jhxsList=[];
    jhxsList.push({"value":"","text":"请选择"});
    jhxsList.push({"value":dlJhxsMap.zdjhJhxs,"text":dlJhxsMap.zdjhJhxsMc});
    jhxsList.push({"value":dlJhxsMap.sdjhJhxs,"text":dlJhxsMap.sdjhJhxsMc});
    newPage.setData({jhxsList:jhxsList});
  },
  initZtSelectData:function(){
    let dlZtMap=newPage.data.constantMap.dlZtMap;
    let ztList=[];
    ztList.push({"value":"","text":"请选择"});
    ztList.push({"value":dlZtMap.zyZt,"text":dlZtMap.zyZtMc});
    ztList.push({"value":dlZtMap.ztZt,"text":dlZtMap.ztZtMc});
    ztList.push({"value":dlZtMap.fqZt,"text":dlZtMap.fqZtMc});
    newPage.setData({ztList:ztList});
  },
  checkNew:function(){
    if(newPage.checkMc()){
      if(newPage.checkDm()){
        if(newPage.checkJhxs()){
          if(newPage.checkJhyz()){
            if(newPage.checkZt()){
              newPage.newDuiLie();
            }
          }
        }
      }
    }
  },
  newDuiLie:function(){
    let mc=newPage.data.mc;
    let dm=newPage.data.dm;
    let jhxsSelectIndex=newPage.data.jhxsSelectIndex;
    let jhyz=newPage.data.jhyz;
    let ztSelectIndex=newPage.data.ztSelectIndex;
    console.log(mc)
    console.log(dm)
    console.log(jhxsSelectIndex)
    console.log(jhyz)
    console.log(ztSelectIndex)
    wx.request({
      url: rootIP+"newDuiLie",
      data:{mc:mc,dm:dm,jhxs:jhxsSelectIndex,jhyz:jhyz,zt:ztSelectIndex},
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
    else if(e.currentTarget.id=="dm_inp"){
      let dm=e.detail.value;
      newPage.setData({dm:dm});
    }
    else if(e.currentTarget.id=="jhyz_inp"){
      let jhyz=e.detail.value;
      newPage.setData({jhyz:jhyz});
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
  focusDm:function(){
    let dm=newPage.data.dm;
    if(dm=="代码不能为空"){
      newPage.setData({dm:''});
    }
  },
  checkDm:function(){
    let dm=newPage.data.dm;
    if(dm==""||dm==null||dm=="代码不能为空"){
      newPage.setData({dm:'代码不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkJhxs:function(){
    let jhxsSelectId=newPage.data.jhxsSelectId;
    if(jhxsSelectId==null||jhxsSelectId==""){
        wx.showToast({
          title: "请选择叫号形式",
        })
        return false;
    }
    else
      return true;
  },
  focusJhyz:function(){
    let jhyz=newPage.data.jhyz;
    if(jhyz=="叫号阈值不能为空"){
      newPage.setData({jhyz:''});
    }
  },
  checkJhyz:function(){
    let jhyz=newPage.data.jhyz;
    if(jhyz==""||jhyz==null||jhyz=="叫号阈值不能为空"){
      newPage.setData({jhyz:'叫号阈值不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkZt:function(){
    let ztSelectId=newPage.data.ztSelectId;
    if(ztSelectId==null||ztSelectId==""){
        wx.showToast({
          title: "请选择状态",
        })
        return false;
    }
    else
      return true;
  },
  // 点击下拉显示框
  showJhxsOption() {
    newPage.setData({
      showJhxsOption: !newPage.data.showJhxsOption,
    });
  },
  // 点击下拉列表
  selectJhxsOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let jhxsList=newPage.data.jhxsList;
    let lxlx=jhxsList[index];
    console.log(index+","+lxlx.value+","+lxlx.text);
    newPage.setData({
      jhxsSelectIndex: index,
      jhxsSelectId: lxlx.value,
      showJhxsOption: !newPage.data.showJhxsOption
    });
  },
  // 点击下拉显示框
  showZtOption() {
    newPage.setData({
      showZtOption: !newPage.data.showZtOption,
    });
  },
  // 点击下拉列表
  selectZtOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let ztList=newPage.data.ztList;
    let zt=ztList[index];
    console.log(index+","+zt.value+","+zt.text);
    newPage.setData({
      ztSelectIndex: index,
      ztSelectId: zt.value,
      showZtOption: !newPage.data.showZtOption
    });
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/pdgl/dlcx/list',
    })
  }
})