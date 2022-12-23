// pages/sjgl/zhcx/new.js
var newPage;
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
    newPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    newPage.getConstantFlagMap();
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
        newPage.initZyztSelectData();
        newPage.initShztSelectData();
        newPage.initWjlxList();
      }
    })
  },
  initZyztSelectData:function(){
    let sjZyztMap=newPage.data.constantMap.sjZyztMap;
    let zyztList=[];
    zyztList.push({"value":"","text":"请选择"});
    zyztList.push({"value":sjZyztMap.shiZyzt,"text":sjZyztMap.shiZyztMc});
    zyztList.push({"value":sjZyztMap.fouZyzt,"text":sjZyztMap.fouZyztMc});
    newPage.setData({zyztList:zyztList});
  },
  initShztSelectData:function(){
    let sjShztMap=newPage.data.constantMap.sjShztMap;
    let shztList=[];
    shztList.push({"value":"","text":"请选择"});
    shztList.push({"value":sjShztMap.dshShzt,"text":sjShztMap.dshShztMc});
    shztList.push({"value":sjShztMap.shtgShzt,"text":sjShztMap.shtgShztMc});
    shztList.push({"value":sjShztMap.bjzShzt,"text":sjShztMap.bjzShztMc});
    newPage.setData({shztList:shztList});
  },
  initWjlxList:function(){
    let sjWjlxMap=newPage.data.constantMap.sjWjlxMap;
    let wjlxList=[];
    wjlxList.push(sjWjlxMap.zpWjlx);
    wjlxList.push(sjWjlxMap.zgzsWjlx);
    wjlxList.push(sjWjlxMap.jzWjlx);
    newPage.setData({wjlxList:wjlxList});
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="xm_inp"){
      let xm=e.detail.value;
      newPage.setData({xm:xm});
    }
    else if(e.currentTarget.id=="sjh_inp"){
      let sjh=e.detail.value;
      newPage.setData({sjh:sjh});
    }
    else if(e.currentTarget.id=="sfzh_inp"){
      let sfzh=e.detail.value;
      newPage.setData({sfzh:sfzh});
    }
  },
  checkNew:function(){
    if(newPage.checkXm()){
      if(newPage.checkSjh()){
        if(newPage.checkSfzh()){
          if(newPage.checkZyzt()){
            newPage.newSiJi();
          }
        }
      }
    }
  },
  newSiJi:function(){
    newPage.saving(true);
    let xm=newPage.data.xm;
    let sjh=newPage.data.sjh;
    let sfzh=newPage.data.sfzh;
    let zgzyxqz=newPage.data.zgzyxqz;
    let jzyxqz=newPage.data.jzyxqz;
    let zyztSelectId=newPage.data.zyztSelectId;
    let sjShztMap=newPage.data.constantMap.sjShztMap;
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
          let sfzzp=newPage.data.sfzzp;
          console.log("sfzzp==="+sfzzp)
          if(sfzzp==undefined){
            newPage.saving(false);
            wx.showToast({
              title: data.info,
            })
            setTimeout(() => {
              newPage.goListPage();
            }, 1000);
          }
          else{
            console.log("sjId==="+data.sjId);
            newPage.setData({sjId:data.sjId});
            let sfzzpWjlx=newPage.data.constantMap.sjWjlxMap.sfzzpWjlx;
            newPage.uploadFile(sfzzpWjlx); 
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
    let xm=newPage.data.xm;
    if(xm=="姓名不能为空"){
      newPage.setData({xm:''});
    }
  },
  checkXm:function(){
    let xm=newPage.data.xm;
    if(xm==""||xm==null||xm=="姓名不能为空"){
      newPage.setData({xm:'姓名不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusSjh:function(){
    let sjh=newPage.data.sjh;
    if(sjh=="手机号不能为空"){
      newPage.setData({sjh:''});
    }
  },
  checkSjh:function(){
    let sjh=newPage.data.sjh;
    if(sjh==""||sjh==null||sjh=="手机号不能为空"){
      newPage.setData({sjh:'手机号不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  focusSfzh:function(){
    let sfzh=newPage.data.sfzh;
    if(sfzh=="身份证号不能为空"){
      newPage.setData({sfzh:''});
    }
  },
  checkSfzh:function(){
    let sfzh=newPage.data.sfzh;
    if(sfzh==""||sfzh==null||sfzh=="身份证号不能为空"){
      newPage.setData({sfzh:'身份证号不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  //验证在用状态
  checkZyzt:function(){
    let zyztSelectId=newPage.data.zyztSelectId;
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
    newPage.setData({zgzyxqz:value});
  },
  pickerJzyxqzChange:function(e){
    let value = e.detail.value;
    console.log(value)
    newPage.setData({jzyxqz:value});
  },
  pickerZgzyxqzCancel:function(){
    newPage.setData({zgzyxqz:''});
  },
  pickerJzyxqzCancel:function(){
    newPage.setData({jzyxqz:''});
  },
  // 点击下拉显示框
  showZyztOption() {
    newPage.setData({
      showZyztOption: !newPage.data.showZyztOption,
    });
  },
  // 点击下拉列表
  selectZyztOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let zyztList=newPage.data.zyztList;
    let zyzt=zyztList[index];
    console.log(index+","+zyzt.value+","+zyzt.text);
    newPage.setData({
      zyztSelectIndex: index,
      zyztSelectId: zyzt.value,
      showZyztOption: !newPage.data.showZyztOption
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
        let data=newPage.data;
        if(data.sfzzp==null)
          newPage.setData({sfzzp:tempFilePaths[0]});
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
        let data=newPage.data;
        if(data.zgzs==null)
          newPage.setData({zgzs:tempFilePaths[0]});
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
        let data=newPage.data;
        if(data.jz==null)
          newPage.setData({jz:tempFilePaths[0]});
      }
    })
  },
  deleteSfzzp:function(){
    newPage.setData({sfzzp:null});
  },
  deleteZgzs:function(){
    newPage.setData({zgzs:null});
  },
  deleteJz:function(){
    newPage.setData({jz:null});
  },
  saving:function(flag){
    if(flag){
      newPage.setData({showSaveBut:false,showSavingBut:true});
    }
    else{
      newPage.setData({showSavingBut:false,showSavedBut:true});
    }
  },
  uploadFile:function(index){
    let sjId=newPage.data.sjId;
    let sjWjlxMap=newPage.data.constantMap.sjWjlxMap;
    let wjlx;
    let sfzzpWjlx=sjWjlxMap.sfzzpWjlx;
    let zgzsWjlx=sjWjlxMap.zgzsWjlx;
    let jzWjlx=sjWjlxMap.jzWjlx;
    let filePath;
    switch (index) {
      case sfzzpWjlx:
        wjlx=sfzzpWjlx;
        filePath=newPage.data.sfzzp;
        break;
      case zgzsWjlx:
        wjlx=zgzsWjlx;
        filePath=newPage.data.zgzs;
        break;
      case jzWjlx:
        wjlx=jzWjlx;
        filePath=newPage.data.jz;
        break;
    }
    console.log("wjlx==="+wjlx)
    wx.uploadFile({
      url: rootIP+'uploadSiJiFile', //仅为示例，非真实的接口地址
      filePath: filePath,
      name: 'file',
      formData:{id:sjId,wjlx:wjlx},
      success: function(res){
        let wjlxListLength=newPage.data.wjlxList.length;
        index++;
        if(index<=wjlxListLength){
          let nextFilePath;
          switch (index) {
            case zgzsWjlx:
              nextFilePath=newPage.data.zgzs;
              break;
            case jzWjlx:
              nextFilePath=newPage.data.jz;
              break;
          }
          console.log("nextFilePath==="+nextFilePath)
          if(nextFilePath==undefined){
            newPage.saving(false);
            setTimeout(() => {
              newPage.goListPage();
            }, 1000);
          }
          else
            newPage.uploadFile(index);
        }
        else{
          newPage.saving(false);
          setTimeout(() => {
            newPage.goListPage();
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