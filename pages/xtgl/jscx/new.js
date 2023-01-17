// pages/xtgl/jscx/new.js
var newPage;
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
        let jsZt=constantFlagMap.jsZt;
        let constantFlags=jsZt;
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
        newPage.initZtSelectData();
        newPage.getQxSelectData();
      }
    })
  },
  initZtSelectData:function(){
    let ztMap=newPage.data.constantMap.jsZtMap;
    let ztList=[];
    ztList.push({"value":"","text":"请选择"});
    ztList.push({"value":ztMap.xzZt,"text":ztMap.xzZtMc});
    ztList.push({"value":ztMap.zcsyZt,"text":ztMap.zcsyZtMc});
    ztList.push({"value":ztMap.fqZt,"text":ztMap.fqZtMc});
    ztList.push({"value":ztMap.ywZt,"text":ztMap.ywZtMc});
    newPage.setData({ztList:ztList});
  },
  checkNew:function(){
    if(newPage.checkMc()){
      if(newPage.checkZtId()){
        newPage.newJueSe();
      }
    }
  },
  newJueSe:function(){
    let mc=newPage.data.mc;
    let ztSelectId=newPage.data.ztSelectId;
    let qxSelectIds=newPage.data.qxSelectIds;
    let qxSelectIdArr=qxSelectIds.split(",");
    let qxIds=qxSelectIdArr.sort().toString();
    if(qxIds.substring(0,1)==",")
      qxIds=qxIds.substring(1);
    let bz=newPage.data.bz;
    console.log(mc)
    console.log(qxIds);
    console.log(bz)
    wx.request({
      url: rootIP+"newJueSe",
      data:{mc:mc,zt:ztSelectId,qxIds:qxIds,bz:bz},
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
  //验证状态
  checkZtId:function(){
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
  showZtOption() {
    newPage.setData({
      showZtOption: !newPage.data.showZtOption,
    });
  },
  // 点击下拉显示框
  showQxOption() {
    newPage.setData({
      showQxOption: !newPage.data.showQxOption,
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
  // 点击下拉列表
  selectQxOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let qxList=newPage.data.qxList;
    let qx=qxList[index];
    qx.selected=!qx.selected;
    console.log(index+","+qx.id+","+qx.mc+","+qx.selected);
    if(qx.selected){
      if(!newPage.checkIfQxInSelectedList(qx.id))
      newPage.pushQxInSelectedList(qx);
    }
    else{
      newPage.removeQxFromSelectedList(qx);
    }

    newPage.setData({
      qxSelectIndex: index,
      qxSelectId: qx.id,
      //showQxOption: !newPage.data.showQxOption,
      qxList:qxList
    });
  },
  pushQxInSelectedList:function(qx){
    console.log(qx)
    let selectedQxList=newPage.data.selectedQxList;
    selectedQxList.push(qx);
    console.log(selectedQxList)
    newPage.sortQxSelectedAttrs(selectedQxList);
  },
  removeQxFromSelectedList:function(qx){
    let selectedQxList=newPage.data.selectedQxList;
    for(let i=0;i<selectedQxList.length;i++){
      let selectedQx=selectedQxList[i];
      if(selectedQx.id==qx.id){
        selectedQxList.splice(i,1);
        break;
      }
    }
    console.log(selectedQxList)
    newPage.sortQxSelectedAttrs(selectedQxList);
  },
  checkIfQxInSelectedList:function(id){
    let flag=false;
    let selectedQxList=newPage.data.selectedQxList;
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
        newPage.setData({qxList:qxList});
      }
    })
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/xtgl/jscx/list',
    })
  }
})