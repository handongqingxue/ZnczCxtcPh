// pages/xtgl/yhcx/edit.js
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
    selectedJsList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    editPage=this;
    rootIP=getApp().getRootIP();
    let id=options.id;
    //let id=11;
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
        let yhShzt=constantFlagMap.yhShzt;
        let constantFlags=yhShzt;
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
        editPage.getJsSelectData();
      }
    })
  },
  getJsSelectData:function(){
    wx.request({
      url: rootIP+"getJueSeSelectList",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let jsList=res.data.list;
        jsList.unshift({id:"",mc:"请选择"});
        for(let i=0;i<jsList.length;i++){
          let js=jsList[i];
          js.selected=false;
        }
        //console.log(jsList);
        editPage.setData({jsList:jsList});
        editPage.getYHInfo();
      }
    })
  },
  // 点击下拉显示框
  showJsOption() {
    editPage.setData({
      showJsOption: !editPage.data.showJsOption,
    });
  },
  // 点击下拉列表
  selectJsOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let jsList=editPage.data.jsList;
    let js=jsList[index];
    js.selected=!js.selected;
    console.log(index+","+js.id+","+js.mc+","+js.selected);
    if(js.selected){
      if(!editPage.checkIfJsInSelectedList(js.id))
        editPage.pushJsInSelectedList(js);
    }
    else{
      editPage.removeJsFromSelectedList(js);
    }

    this.setData({
      jsSelectIndex: index,
      jsSelectId: js.id,
      //showJsOption: !this.data.showJsOption,
      jsList:jsList
    });
  },
  pushJsInSelectedList:function(js){
    console.log(js)
    let selectedJsList=editPage.data.selectedJsList;
    selectedJsList.push(js);
    console.log(selectedJsList)
    editPage.sortJsSelectedAttrs(selectedJsList);
  },
  removeJsFromSelectedList:function(js){
    let selectedJsList=editPage.data.selectedJsList;
    for(let i=0;i<selectedJsList.length;i++){
      let selectedJs=selectedJsList[i];
      if(selectedJs.id==js.id){
        selectedJsList.splice(i,1);
        break;
      }
    }
    console.log(selectedJsList)
    editPage.sortJsSelectedAttrs(selectedJsList);
  },
  checkIfJsInSelectedList:function(id){
    let flag=false;
    let selectedJsList=editPage.data.selectedJsList;
    for(let i=0;i<selectedJsList.length;i++){
      let selectedJs=selectedJsList[i];
      if(selectedJs.id==id){
        flag=true;
        break;
      }
    }
    console.log("flag==="+flag)
    return flag;
  },
  sortJsSelectedAttrs:function(selectedJsList){
    let jsSelectIds="";
    let jsSelectMcs="";
    for(let i=0;i<selectedJsList.length;i++){
      let selectedJs=selectedJsList[i];
      let jsId=selectedJs.id;
      let jsMc=selectedJs.mc;
      console.log("jsId="+jsId+",jsMc="+jsMc);
      jsSelectIds+=","+jsId;
      jsSelectMcs+=","+jsMc;
    }
    jsSelectIds=jsSelectIds.substring(1);
    jsSelectMcs=jsSelectMcs.substring(1);
    console.log("jsSelectIds="+jsSelectIds+",jsSelectMcs="+jsSelectMcs);
    this.setData({jsSelectIds:jsSelectIds,jsSelectMcs:jsSelectMcs});
  },
  getYHInfo:function(){
    let id=editPage.data.id;
    wx.request({
      url: rootIP+"getYongHu",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let yh=data.yh;
        let id=yh.id;
        let yhm=yh.yhm;
        let xm=yh.xm;
        let cjsj=yh.cjsj;
        let shzt=yh.shzt;
        let shztMc=editPage.getShztMcById(shzt);
        let js=yh.js;
        let jsIds=yh.jsIds;
        editPage.getJsMcsByIds(jsIds);
        editPage.setData({id:id,yhm:yhm,xm:xm,cjsj:cjsj,shztMc:shztMc,js:js});
      }
    })
  },
  getShztMcById:function(shztId){
    let constantMap=editPage.data.constantMap;
    let shztMap=constantMap.yhShztMap;
    //console.log(shztMap);
    var str;
    switch (shztId) {
    case shztMap.dshShzt:
      str=shztMap.dshShztMc;//待审核
      break;
    case shztMap.shtgShzt:
      str=shztMap.shtgShztMc;//审核通过
      break;
    case shztMap.bjzShzt:
      str=shztMap.bjzShztMc;//编辑中
      break;
    }
    return str;
  },
  getJsMcsByIds:function(jsIds){
    let jsSelectMcs="";
    let jsList=editPage.data.jsList;
    let jsIdArr=jsIds.split(",");
    for(let i=0;i<jsIdArr.length;i++){
      let jsId=jsIdArr[i];
      for(let j=0;j<jsList.length;j++){
        let js=jsList[j];
        if(jsId==js.id){
          js.selected=true;
          jsSelectMcs+=","+js.mc;
          break;
        }
      }
    }
    jsSelectMcs=jsSelectMcs.substring(1);
    editPage.setData({jsList:jsList,jsSelectMcs:jsSelectMcs});
  },
  checkEdit:function(){
    editPage.editYongHu();
  },
  editYongHu:function(){
    editPage.saving(true);
    let id=editPage.data.id;
    let jsSelectIds=editPage.data.jsSelectIds;
    let jsSelectIdArr=jsSelectIds.split(",");
    let jsIds=jsSelectIdArr.sort().toString();
    if(jsIds.substring(0,1)==",")
      jsIds=jsIds.substring(1);
    console.log(jsIds);
    //return false;
    wx.request({
      url: rootIP+"editYongHu",
      data:{id:id,jsIds:jsIds},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        console.log("message==="+message)
        if(message=="ok"){
            setTimeout(() => {
              editPage.goListPage();
            }, 1000);
        }
        else{
          wx.showToast({
            title: data.info,
          })
        }
      }
    })
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
      url: '/pages/xtgl/yhcx/list',
    })
  },
})