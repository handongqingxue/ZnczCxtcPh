// pages/xtgl/jscx/edit.js
var editPage;
var rootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    showZtOption:false,
    showQxOption:false,
    showSaveBut:true,
    showSavingBut:false,
    showSavedBut:false,
    selectedQxList:[],
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
        let jsZt=constantFlagMap.jsZt;
        let constantFlags=jsZt;
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
        editPage.initZtSelectData();
        editPage.getQxSelectData();
      }
    })
  },
  initZtSelectData:function(){
    let ztMap=editPage.data.constantMap.jsZtMap;
    let ztList=[];
    ztList.push({"value":"","text":"请选择"});
    ztList.push({"value":ztMap.xzZt,"text":ztMap.xzZtMc});
    ztList.push({"value":ztMap.zcsyZt,"text":ztMap.zcsyZtMc});
    ztList.push({"value":ztMap.fqZt,"text":ztMap.fqZtMc});
    ztList.push({"value":ztMap.ywZt,"text":ztMap.ywZtMc});
    editPage.setData({ztList:ztList});
  },
  checkEdit:function(){
    if(editPage.checkMc()){
      if(editPage.checkZtId()){
        editPage.editJueSe();
      }
    }
  },
  editJueSe:function(){
    let id=editPage.data.id;
    let mc=editPage.data.mc;
    let ztSelectId=editPage.data.ztSelectId;
    let qxSelectIds=editPage.data.qxSelectIds;
    let qxSelectIdArr=qxSelectIds.split(",");
    let qxIds=qxSelectIdArr.sort().toString();
    if(qxIds.substring(0,1)==",")
      qxIds=qxIds.substring(1);
    let bz=editPage.data.bz;
    console.log(mc)
    console.log(qxIds);
    console.log(bz)
    wx.request({
      url: rootIP+"editJueSe",
      data:{id:id,mc:mc,zt:ztSelectId,qxIds:qxIds,bz:bz},
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
    else if(e.currentTarget.id=="ms_inp"){
      let ms=e.detail.value;
      editPage.setData({ms:ms});
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
  //验证状态
  checkZtId:function(){
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
  showZtOption() {
    editPage.setData({
      showZtOption: !editPage.data.showZtOption,
    });
  },
  // 点击下拉显示框
  showQxOption() {
    editPage.setData({
      showQxOption: !editPage.data.showQxOption,
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
  // 点击下拉列表
  selectQxOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let qxList=editPage.data.qxList;
    let qx=qxList[index];
    qx.selected=!qx.selected;
    console.log(index+","+qx.id+","+qx.mc+","+qx.selected);
    if(qx.selected){
      if(!editPage.checkIfQxInSelectedList(qx.id))
      editPage.pushQxInSelectedList(qx);
    }
    else{
      editPage.removeQxFromSelectedList(qx);
    }

    editPage.setData({
      qxSelectIndex: index,
      qxSelectId: qx.id,
      //showQxOption: !editPage.data.showQxOption,
      qxList:qxList
    });
  },
  pushQxInSelectedList:function(qx){
    console.log(qx)
    let selectedQxList=editPage.data.selectedQxList;
    selectedQxList.push(qx);
    console.log(selectedQxList)
    editPage.sortQxSelectedAttrs(selectedQxList);
  },
  removeQxFromSelectedList:function(qx){
    let selectedQxList=editPage.data.selectedQxList;
    for(let i=0;i<selectedQxList.length;i++){
      let selectedQx=selectedQxList[i];
      if(selectedQx.id==qx.id){
        selectedQxList.splice(i,1);
        break;
      }
    }
    console.log(selectedQxList)
    editPage.sortQxSelectedAttrs(selectedQxList);
  },
  checkIfQxInSelectedList:function(id){
    let flag=false;
    let selectedQxList=editPage.data.selectedQxList;
    for(let i=0;i<selectedQxList.length;i++){
      let selectedQx=selectedQxList[i];
      if(selectedQx.id==id){
        flag=true;
        break;
      }
    }
    console.log("flag==="+flag)
    return flag;
  },
  sortQxSelectedAttrs:function(selectedQxList){
    let qxSelectIds="";
    let qxSelectMcs="";
    for(let i=0;i<selectedQxList.length;i++){
      let selectedQx=selectedQxList[i];
      let qxId=selectedQx.id;
      let qxMc=selectedQx.mc;
      console.log("qxId="+qxId+",qxMc="+qxMc);
      qxSelectIds+=","+qxId;
      qxSelectMcs+=","+qxMc;
    }
    qxSelectIds=qxSelectIds.substring(1);
    qxSelectMcs=qxSelectMcs.substring(1);
    console.log("qxSelectIds="+qxSelectIds+",qxSelectMcs="+qxSelectMcs);
    this.setData({qxSelectIds:qxSelectIds,qxSelectMcs:qxSelectMcs});
  },
  getQxSelectData:function(){
    wx.request({
      url: rootIP+"getQuanXianSelectList",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let qxList=res.data.list;
        qxList.unshift({id:"",mc:"请选择"});
        for(let i=0;i<qxList.length;i++){
          let qx=qxList[i];
          qx.selected=false;
        }
        //console.log(qxList);
        editPage.setData({qxList:qxList});   
        editPage.getJueSeInfo();
      }
    })
  },
  getJueSeInfo:function(){
    let id=editPage.data.id;
    wx.request({
      url: rootIP+"getJueSe",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let js=data.js;
        let mc=js.mc;
        let zt=js.zt;
        let ztSelectIndex=editPage.getZtIndexInListById(zt);
        let qxIds=js.qxIds;
        editPage.getQxMcsByIds(qxIds);
        let ms=js.ms;
        editPage.setData({mc:mc,ztSelectId:zt,ztSelectIndex:ztSelectIndex,ms:ms});
      }
    })
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
  getQxMcsByIds:function(qxIds){
    let qxSelectMcs="";
    let qxList=editPage.data.qxList;
    let qxIdArr=qxIds.split(",");
    for(let i=0;i<qxIdArr.length;i++){
      let qxId=qxIdArr[i];
      for(let j=0;j<qxList.length;j++){
        let qx=qxList[j];
        if(qxId==qx.id){
          qx.selected=true;
          qxSelectMcs+=","+qx.mc;
          break;
        }
      }
    }
    if(qxSelectMcs.length>8)
      qxSelectMcs=qxSelectMcs.substring(1,8)+"...";
    else
      qxSelectMcs=qxSelectMcs.substring(1);
    editPage.setData({qxList:qxList,qxSelectMcs:qxSelectMcs});
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/xtgl/jscx/list',
    })
  }
})