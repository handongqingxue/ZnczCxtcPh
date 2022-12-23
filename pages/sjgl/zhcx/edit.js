// pages/sjgl/zhcx/edit.js
var editPage;
var rootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    zgzyxqz:'',
    zgzyxqzPlaceholder:'请选择有效期',
    jzyxqz:'',
    jzyxqzPlaceholder:'请选择有效期',
    showSaveBut:true,
    showSavingBut:false,
    showSavedBut:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    editPage=this;
    rootIP=getApp().getRootIP();
    serverRootIP=getApp().getServerRootIP();
    //let id=options.id;
    let id=6;
    console.log(id)
    editPage.setData({id:id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    editPage.getConstantFlagMap();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

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
        let sjShzt=constantFlagMap.sjShzt;
        let sjZyzt=constantFlagMap.sjZyzt;
        let sjWjlx=constantFlagMap.sjWjlx;
        let constantFlags=sjShzt+","+sjZyzt+","+sjWjlx;
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
        editPage.initZyztSelectData();
        editPage.initShztSelectData();
        editPage.initWjlxList();
      }
    })
  },
  initZyztSelectData:function(){
    let sjZyztMap=editPage.data.constantMap.sjZyztMap;
    let zyztList=[];
    zyztList.push({"value":"","text":"请选择"});
    zyztList.push({"value":sjZyztMap.shiZyzt,"text":sjZyztMap.shiZyztMc});
    zyztList.push({"value":sjZyztMap.fouZyzt,"text":sjZyztMap.fouZyztMc});
    editPage.setData({zyztList:zyztList});
  },
  initShztSelectData:function(){
    let sjShztMap=editPage.data.constantMap.sjShztMap;
    let shztList=[];
    shztList.push({"value":"","text":"请选择"});
    shztList.push({"value":sjShztMap.dshShzt,"text":sjShztMap.dshShztMc});
    shztList.push({"value":sjShztMap.shtgShzt,"text":sjShztMap.shtgShztMc});
    shztList.push({"value":sjShztMap.bjzShzt,"text":sjShztMap.bjzShztMc});
    editPage.setData({shztList:shztList});
  },
  initWjlxList:function(){
    let sjWjlxMap=editPage.data.constantMap.sjWjlxMap;
    let wjlxList=[];
    wjlxList.push(sjWjlxMap.zpWjlx);
    wjlxList.push(sjWjlxMap.zgzsWjlx);
    wjlxList.push(sjWjlxMap.jzWjlx);
    editPage.setData({wjlxList:wjlxList});
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="xm_inp"){
      let xm=e.detail.value;
      editPage.setData({xm:xm});
    }
    else if(e.currentTarget.id=="sjh_inp"){
      let sjh=e.detail.value;
      editPage.setData({sjh:sjh});
    }
    else if(e.currentTarget.id=="sfzh_inp"){
      let sfzh=e.detail.value;
      editPage.setData({sfzh:sfzh});
    }
  },
  checkNew:function(){
    if(editPage.checkXm()){
      if(editPage.checkSjh()){
        if(editPage.checkSfzh()){
          if(editPage.checkZyzt()){
            editPage.newSiJi();
          }
        }
      }
    }
  },
  newSiJi:function(){
    editPage.saving(true);
    let xm=editPage.data.xm;
    let sjh=editPage.data.sjh;
    let sfzh=editPage.data.sfzh;
    let zgzyxqz=editPage.data.zgzyxqz;
    let jzyxqz=editPage.data.jzyxqz;
    let zyztSelectId=editPage.data.zyztSelectId;
    let sjShztMap=editPage.data.constantMap.sjShztMap;
    let shzt=sjShztMap.dshShzt;

    console.log("xm==="+xm)
    console.log("sjh==="+sjh)
    console.log("sfzh==="+sfzh)
    console.log("zgzyxqz==="+zgzyxqz)
    console.log("jzyxqz==="+jzyxqz)
    console.log("zyztSelectId==="+zyztSelectId)
    console.log("shzt==="+shzt)
    //return false;
    wx.request({
      url: rootIP+"newSiJi",
      data:{xm:xm,sjh:sjh,sfzh:sfzh,zgzyxqz:zgzyxqz,jzyxqz:jzyxqz,zyzt:zyztSelectId,shzt:shzt},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        console.log("message==="+message)
        if(message=="ok"){
          let sfzzp=editPage.data.sfzzp;
          console.log("sfzzp==="+sfzzp)
          if(sfzzp==undefined){
            editPage.saving(false);
            wx.showToast({
              title: data.info,
            })
            setTimeout(() => {
              editPage.goListPage();
            }, 1000);
          }
          else{
            console.log("sjId==="+data.sjId);
            editPage.setData({sjId:data.sjId});
            let sfzzpWjlx=editPage.data.constantMap.sjWjlxMap.sfzzpWjlx;
            editPage.uploadFile(sfzzpWjlx); 
          }
        }
        else{
          wx.showToast({
            title: data.info,
          })
        }
      }
    })
  },
  focusXm:function(){
    let xm=editPage.data.xm;
    if(xm=="姓名不能为空"){
      editPage.setData({xm:''});
    }
  },
  checkXm:function(){
    let xm=editPage.data.xm;
    if(xm==""||xm==null||xm=="姓名不能为空"){
      editPage.setData({xm:'姓名不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusSjh:function(){
    let sjh=editPage.data.sjh;
    if(sjh=="手机号不能为空"){
      editPage.setData({sjh:''});
    }
  },
  checkSjh:function(){
    let sjh=editPage.data.sjh;
    if(sjh==""||sjh==null||sjh=="手机号不能为空"){
      editPage.setData({sjh:'手机号不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusSfzh:function(){
    let sfzh=editPage.data.sfzh;
    if(sfzh=="身份证号不能为空"){
      editPage.setData({sfzh:''});
    }
  },
  checkSfzh:function(){
    let sfzh=editPage.data.sfzh;
    if(sfzh==""||sfzh==null||sfzh=="身份证号不能为空"){
      editPage.setData({sfzh:'身份证号不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  //验证在用状态
  checkZyzt:function(){
    let zyztSelectId=editPage.data.zyztSelectId;
    if(zyztSelectId==null||zyztSelectId==""){
        wx.showToast({
          title: "请选择在用状态",
        })
        return false;
    }
    else
      return true;
  },
  pickerZgzyxqzChange:function(e){
    let value = e.detail.value;
    console.log(value)
    editPage.setData({zgzyxqz:value});
  },
  pickerJzyxqzChange:function(e){
    let value = e.detail.value;
    console.log(value)
    editPage.setData({jzyxqz:value});
  },
  pickerZgzyxqzCancel:function(){
    editPage.setData({zgzyxqz:''});
  },
  pickerJzyxqzCancel:function(){
    editPage.setData({jzyxqz:''});
  },
  // 点击下拉显示框
  showZyztOption() {
    editPage.setData({
      showZyztOption: !editPage.data.showZyztOption,
    });
  },
  // 点击下拉列表
  selectZyztOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let zyztList=editPage.data.zyztList;
    let zyzt=zyztList[index];
    console.log(index+","+zyzt.value+","+zyzt.text);
    editPage.setData({
      zyztSelectIndex: index,
      zyztSelectId: zyzt.value,
      showZyztOption: !editPage.data.showZyztOption
    });
  },
  takeSfzzp:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("res.tempFilePaths==="+res.tempFilePaths)
        
        let tempFilePaths=res.tempFilePaths;
        let data=editPage.data;
        if(data.sfzzp==null)
          editPage.setData({sfzzp:tempFilePaths[0]});
      }
    })
  },
  takeZgzs:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("res.tempFilePaths==="+res.tempFilePaths)
        
        let tempFilePaths=res.tempFilePaths;
        let data=editPage.data;
        if(data.zgzs==null)
          editPage.setData({zgzs:tempFilePaths[0]});
      }
    })
  },
  takeJz:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("res.tempFilePaths==="+res.tempFilePaths)
        
        let tempFilePaths=res.tempFilePaths;
        let data=editPage.data;
        if(data.jz==null)
          editPage.setData({jz:tempFilePaths[0]});
      }
    })
  },
  deleteSfzzp:function(){
    editPage.setData({sfzzp:null});
  },
  deleteZgzs:function(){
    editPage.setData({zgzs:null});
  },
  deleteJz:function(){
    editPage.setData({jz:null});
  },
  saving:function(flag){
    if(flag){
      editPage.setData({showSaveBut:false,showSavingBut:true});
    }
    else{
      editPage.setData({showSavingBut:false,showSavedBut:true});
    }
  },
  uploadFile:function(index){
    let sjId=editPage.data.sjId;
    let sjWjlxMap=editPage.data.constantMap.sjWjlxMap;
    let wjlx;
    let sfzzpWjlx=sjWjlxMap.sfzzpWjlx;
    let zgzsWjlx=sjWjlxMap.zgzsWjlx;
    let jzWjlx=sjWjlxMap.jzWjlx;
    let filePath;
    switch (index) {
      case sfzzpWjlx:
        wjlx=sfzzpWjlx;
        filePath=editPage.data.sfzzp;
        break;
      case zgzsWjlx:
        wjlx=zgzsWjlx;
        filePath=editPage.data.zgzs;
        break;
      case jzWjlx:
        wjlx=jzWjlx;
        filePath=editPage.data.jz;
        break;
    }
    console.log("wjlx==="+wjlx)
    wx.uploadFile({
      url: rootIP+'uploadSiJiFile', //仅为示例，非真实的接口地址
      filePath: filePath,
      name: 'file',
      formData:{id:sjId,wjlx:wjlx},
      success: function(res){
        let wjlxListLength=editPage.data.wjlxList.length;
        index++;
        if(index<=wjlxListLength){
          let nextFilePath;
          switch (index) {
            case zgzsWjlx:
              nextFilePath=editPage.data.zgzs;
              break;
            case jzWjlx:
              nextFilePath=editPage.data.jz;
              break;
          }
          console.log("nextFilePath==="+nextFilePath)
          if(nextFilePath==undefined){
            editPage.saving(false);
            setTimeout(() => {
              editPage.goListPage();
            }, 1000);
          }
          else
            editPage.uploadFile(index);
        }
        else{
          editPage.saving(false);
          setTimeout(() => {
            editPage.goListPage();
          }, 2000);
        }
      }
    })
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/sjgl/zhcx/list',
    })
  },
})