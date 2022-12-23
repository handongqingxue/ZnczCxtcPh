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
      newPage.newCheLiang();
    }
  },
  newCheLiang:function(){
    newPage.saving(true);
    let cph=newPage.data.cph;
    let fdjhm=newPage.data.fdjhm;
    let clsbdh=newPage.data.clsbdh;
    let zcrq=newPage.data.zcrq;
    let pfjdSelectId=newPage.data.pfjdSelectId;
    let yslxSelectId=newPage.data.yslxSelectId;
    let ppxh=newPage.data.ppxh;
    let czxx=newPage.data.czxx;
    let fzrq=newPage.data.fzrq;
    let pz=newPage.data.pz;
    let cllxSelectId=newPage.data.cllxSelectId;
    let sfzySelectId=newPage.data.sfzySelectId;
    let shztSelectId=newPage.data.shztSelectId;
    let bz=newPage.data.bz;
    console.log("cph==="+cph)
    console.log("fdjhm==="+fdjhm)
    console.log("clsbdh==="+clsbdh)
    console.log("zcrq==="+zcrq)
    console.log("pfjdSelectId==="+pfjdSelectId)
    console.log("yslxSelectId==="+yslxSelectId)
    console.log("ppxh==="+ppxh)
    console.log("czxx==="+czxx)
    console.log("fzrq==="+fzrq)
    console.log("pz==="+pz)
    console.log("cllxSelectId==="+cllxSelectId)
    console.log("sfzySelectId==="+sfzySelectId)
    console.log("shztSelectId==="+shztSelectId)
    console.log("bz==="+bz)
    //return false;
    wx.request({
      url: rootIP+"newCheLiang",
      data:{cph:cph,fdjhm:fdjhm,clsbdh:clsbdh,zcrq:zcrq,pfjd:pfjdSelectId,yslx:yslxSelectId,ppxh:ppxh,czxx:czxx,fzrq:fzrq,pz:pz,cllx:cllxSelectId,sfzy:sfzySelectId,shzt:shztSelectId,bz:bz},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        console.log("message==="+message)
        if(message=="ok"){
          let zp=newPage.data.zp;
          console.log("zp==="+zp)
          if(zp==undefined){
            newPage.saving(false);
            wx.showToast({
              title: data.info,
            })
            setTimeout(() => {
              newPage.goListPage();
            }, 1000);
          }
          else{
            console.log("clId==="+data.clId);
            newPage.setData({clId:data.clId});
            let zpWjlx=newPage.data.constantMap.clWjlxMap.zpWjlx;
            newPage.uploadFile(zpWjlx); 
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
  pickerZgzyxqzChange:function(e){
    let value = e.detail.value;
    console.log(value)
    newPage.setData({zgzyxqz:value});
  },
  pickerZgzyxqzCancel:function(){
    newPage.setData({zgzyxqz:''});
  },
  takeZp:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("res.tempFilePaths==="+res.tempFilePaths)
        
        let tempFilePaths=res.tempFilePaths;
        let data=newPage.data;
        if(data.zp==null)
          newPage.setData({zp:tempFilePaths[0]});
      }
    })
  },
  deleteZp:function(){
    newPage.setData({zp:null});
  },
})