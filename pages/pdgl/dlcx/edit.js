// pages/pdgl/dlcx/edit.js
var editPage;
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
    editPage=this;
    rootIP=getApp().getRootIP();
    //let id=options.id;
    let id=5;
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
        let dlJhxs=constantFlagMap.dlJhxs;
        let dlZt=constantFlagMap.dlZt;
        let constantFlags=dlJhxs+","+dlZt;
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
        editPage.initJhxsSelectData();
        editPage.initZtSelectData();
        editPage.getDLInfo();
      }
    })
  },
  initJhxsSelectData:function(){
    let dlJhxsMap=editPage.data.constantMap.dlJhxsMap;
    let jhxsList=[];
    jhxsList.push({"value":"","text":"请选择"});
    jhxsList.push({"value":dlJhxsMap.zdjhJhxs,"text":dlJhxsMap.zdjhJhxsMc});
    jhxsList.push({"value":dlJhxsMap.sdjhJhxs,"text":dlJhxsMap.sdjhJhxsMc});
    editPage.setData({jhxsList:jhxsList});
  },
  initZtSelectData:function(){
    let dlZtMap=editPage.data.constantMap.dlZtMap;
    let ztList=[];
    ztList.push({"value":"","text":"请选择"});
    ztList.push({"value":dlZtMap.zyZt,"text":dlZtMap.zyZtMc});
    ztList.push({"value":dlZtMap.ztZt,"text":dlZtMap.ztZtMc});
    ztList.push({"value":dlZtMap.fqZt,"text":dlZtMap.fqZtMc});
    editPage.setData({ztList:ztList});
  },
  getDLInfo:function(){
    let id=editPage.data.id;
    wx.request({
      url: rootIP+"getDuiLie",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let dl=data.dl;
        let mc=dl.mc;
        let dm=dl.dm;
        let jhxs=dl.jhxs;
        let jhxsSelectIndex=editPage.getJhxsIndexInListById(jhxs);
        let jhyz=dl.jhyz;
        let zt=dl.zt;
        let ztSelectIndex=editPage.getZtIndexInListById(zt);
        editPage.setData({mc:mc,dm:dm,jhxsSelectId:jhxs,jhxsSelectIndex:jhxsSelectIndex,jhyz:jhyz,ztSelectId:zt,ztSelectIndex:ztSelectIndex});
      }
    })
  },
  getJhxsIndexInListById:function(jhxsId){
    let jhxsSelectIndex;
    let jhxsList=editPage.data.jhxsList;
    //console.log(jhxsList)
    for(let i=0;i<jhxsList.length;i++){
      let jhxs=jhxsList[i];
      if(jhxsId==jhxs.value){
        jhxsSelectIndex=i;
        break;
      }
    }
    return jhxsSelectIndex;
  },
  getZtIndexInListById:function(ztId){
    let ztSelectIndex;
    let ztList=editPage.data.ztList;
    //console.log(ztList)
    for(let i=0;i<ztList.length;i++){
      let zt=ztList[i];
      if(ztId==zt.value){
        ztSelectIndex=i;
        break;
      }
    }
    return ztSelectIndex;
  },
  checkEdit:function(){
    if(editPage.checkMc()){
      if(editPage.checkDm()){
        if(editPage.checkJhxs()){
          if(editPage.checkJhyz()){
            if(editPage.checkZt()){
              editPage.editDuiLie();
            }
          }
        }
      }
    }
  },
  editDuiLie:function(){
    editPage.saving(true);
    let id=editPage.data.id;
    let mc=editPage.data.mc;
    let dm=editPage.data.dm;
    let jhxsSelectIndex=editPage.data.jhxsSelectIndex;
    let jhyz=editPage.data.jhyz;
    let ztSelectIndex=editPage.data.ztSelectIndex;
    console.log(mc)
    console.log(dm)
    console.log(jhxsSelectIndex)
    console.log(jhyz)
    console.log(ztSelectIndex)
    wx.request({
      url: rootIP+"editDuiLie",
      data:{id:id,mc:mc,dm:dm,jhxs:jhxsSelectIndex,jhyz:jhyz,zt:ztSelectIndex},
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
    else if(e.currentTarget.id=="dm_inp"){
      let dm=e.detail.value;
      editPage.setData({dm:dm});
    }
    else if(e.currentTarget.id=="jhyz_inp"){
      let jhyz=e.detail.value;
      editPage.setData({jhyz:jhyz});
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
  focusDm:function(){
    let dm=editPage.data.dm;
    if(dm=="代码不能为空"){
      editPage.setData({dm:''});
    }
  },
  checkDm:function(){
    let dm=editPage.data.dm;
    if(dm==""||dm==null||dm=="代码不能为空"){
      editPage.setData({dm:'代码不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkJhxs:function(){
    let jhxsSelectId=editPage.data.jhxsSelectId;
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
    let jhyz=editPage.data.jhyz;
    if(jhyz=="叫号阈值不能为空"){
      editPage.setData({jhyz:''});
    }
  },
  checkJhyz:function(){
    let jhyz=editPage.data.jhyz;
    if(jhyz==""||jhyz==null||jhyz=="叫号阈值不能为空"){
      editPage.setData({jhyz:'叫号阈值不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkZt:function(){
    let ztSelectId=editPage.data.ztSelectId;
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
    editPage.setData({
      showJhxsOption: !editPage.data.showJhxsOption,
    });
  },
  // 点击下拉列表
  selectJhxsOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let jhxsList=editPage.data.jhxsList;
    let lxlx=jhxsList[index];
    console.log(index+","+lxlx.value+","+lxlx.text);
    editPage.setData({
      jhxsSelectIndex: index,
      jhxsSelectId: lxlx.value,
      showJhxsOption: !editPage.data.showJhxsOption
    });
  },
  // 点击下拉显示框
  showZtOption() {
    editPage.setData({
      showZtOption: !editPage.data.showZtOption,
    });
  },
  // 点击下拉列表
  selectZtOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let ztList=editPage.data.ztList;
    let zt=ztList[index];
    console.log(index+","+zt.value+","+zt.text);
    editPage.setData({
      ztSelectIndex: index,
      ztSelectId: zt.value,
      showZtOption: !editPage.data.showZtOption
    });
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
      url: '/pages/pdgl/dlcx/list',
    })
  }
})