// pages/clgl/zhcx/new.js
var newPage;
var rootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    showPfjdOption:false,
    showYslxOption:false,
    showCllxOption:false,
    showSfzyOption:false,
    showShztOption:false,
    zcrq:'',
    zcrqPlaceholder:'请选择注册日期',
    fzrq:'',
    fzrqPlaceholder:'请选择发证日期',
    cllxList:[{"value":"","text":"请选择车辆类型"},{"value":"1","text":"重型"}],
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
        let clShzt=constantFlagMap.clShzt;
        let clPfjd=constantFlagMap.clPfjd;
        let clYslx=constantFlagMap.clYslx;
        let clSfzy=constantFlagMap.clSfzy;
        let clWjlx=constantFlagMap.clWjlx;
        let constantFlags=clShzt+","+clPfjd+","+clYslx+","+clSfzy+","+clWjlx;
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
        newPage.initPfjdSelectData();
        newPage.initYslxSelectData();
        newPage.initSfzySelectData();
        newPage.initShztSelectData();
        newPage.initWjlxList();
      }
    })
  },
  initPfjdSelectData:function(){
    let clPfjdMap=newPage.data.constantMap.clPfjdMap;
    let pfjdList=[];
    pfjdList.push({"value":"","text":"请选择"});
    pfjdList.push({"value":clPfjdMap.gwryPfjd,"text":clPfjdMap.gwryPfjdMc});
    pfjdList.push({"value":clPfjdMap.gwrqPfjd,"text":clPfjdMap.gwrqPfjdMc});
    pfjdList.push({"value":clPfjdMap.glryPfjd,"text":clPfjdMap.glryPfjdMc});
    pfjdList.push({"value":clPfjdMap.glrqPfjd,"text":clPfjdMap.glrqPfjdMc});
    pfjdList.push({"value":clPfjdMap.ddPfjd,"text":clPfjdMap.ddPfjdMc});
    newPage.setData({pfjdList:pfjdList});
  },
  initYslxSelectData:function(){
    let clYslxMap=newPage.data.constantMap.clYslxMap;
    let yslxList=[];
    yslxList.push({"value":"","text":"请选择"});
    yslxList.push({"value":clYslxMap.physYslx,"text":clYslxMap.physYslxMc});
    yslxList.push({"value":clYslxMap.cnysYslx,"text":clYslxMap.cnysYslxMc});
    yslxList.push({"value":clYslxMap.whpysYslx,"text":clYslxMap.whpysYslxMc});
    newPage.setData({yslxList:yslxList});
  },
  initSfzySelectData:function(){
    let clSfzyMap=newPage.data.constantMap.clSfzyMap;
    let sfzyList=[];
    sfzyList.push({"value":"","text":"请选择"});
    sfzyList.push({"value":clSfzyMap.shiSfzy,"text":clSfzyMap.shiSfzyMc});
    sfzyList.push({"value":clSfzyMap.fouSfzy,"text":clSfzyMap.fouSfzyMc});
    newPage.setData({sfzyList:sfzyList});
  },
  initShztSelectData:function(){
    let clShztMap=newPage.data.constantMap.clShztMap;
    let shztList=[];
    shztList.push({"value":"","text":"请选择"});
    shztList.push({"value":clShztMap.dshShzt,"text":clShztMap.dshShztMc});
    shztList.push({"value":clShztMap.shtgShzt,"text":clShztMap.shtgShztMc});
    shztList.push({"value":clShztMap.bjzShzt,"text":clShztMap.bjzShztMc});
    newPage.setData({shztList:shztList});
  },
  initWjlxList:function(){
    let clWjlxMap=newPage.data.constantMap.clWjlxMap;
    let wjlxList=[];
    wjlxList.push(clWjlxMap.zpWjlx);
    wjlxList.push(clWjlxMap.xszWjlx);
    wjlxList.push(clWjlxMap.scqdWjlx);
    wjlxList.push(clWjlxMap.pfjdcxjtWjlx);
    newPage.setData({wjlxList:wjlxList});
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="cph_inp"){
      let cph=e.detail.value;
      newPage.setData({cph:cph});
    }
    else if(e.currentTarget.id=="fdjhm_inp"){
      let fdjhm=e.detail.value;
      newPage.setData({fdjhm:fdjhm});
    }
    else if(e.currentTarget.id=="clsbdh_inp"){
      let clsbdh=e.detail.value;
      newPage.setData({clsbdh:clsbdh});
    }
    else if(e.currentTarget.id=="ppxh_inp"){
      let ppxh=e.detail.value;
      newPage.setData({ppxh:ppxh});
    }
    else if(e.currentTarget.id=="czxx_inp"){
      let czxx=e.detail.value;
      newPage.setData({czxx:czxx});
    }
    else if(e.currentTarget.id=="pz_inp"){
      let pz=e.detail.value;
      newPage.setData({pz:pz});
    }
    else if(e.currentTarget.id=="bz_inp"){
      let bz=e.detail.value;
      newPage.setData({bz:bz});
    }
  },
  checkNew:function(){
    if(newPage.checkCph()){
      if(newPage.checkZCRQ()){
        if(newPage.checkPFJD()){
          if(newPage.checkYSLX()){
            if(newPage.checkPPXH()){
              if(newPage.checkFZRQ()){
                if(newPage.checkCLLX()){
                  if(newPage.checkSFZY()){
                    if(newPage.checkSHZT()){
                      newPage.newCheLiang();
                    }
                  }
                }
              }
            }
          }
        }
      }
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
  focusCph:function(){
    let cph=newPage.data.cph;
    if(cph=="车牌号不能为空"){
      newPage.setData({cph:''});
    }
  },
  checkCph:function(){
    let cph=newPage.data.cph;
    if(cph==""||cph==null||cph=="车牌号不能为空"){
      newPage.setData({cph:'车牌号不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkZCRQ:function(){
    let zcrq=newPage.data.zcrq;
    if(zcrq==null||zcrq==""){
        wx.showToast({
          title: "请选择注册日期",
        })
        return false;
    }
    else
      return true;
  },
  //验证排放阶段
  checkPFJD:function(){
    let pfjdSelectId=newPage.data.pfjdSelectId;
    if(pfjdSelectId==null||pfjdSelectId==""){
        wx.showToast({
          title: "请选择排放阶段",
        })
        return false;
    }
    else
      return true;
  },
  //验证运输类型
  checkYSLX:function(){
    let yslxSelectId=newPage.data.yslxSelectId;
    if(yslxSelectId==null||yslxSelectId==""){
        wx.showToast({
          title: "请选择运输类型",
        })
        return false;
    }
    else
      return true;
  },
  focusPPXH:function(){
    let ppxh=newPage.data.ppxh;
    if(ppxh=="品牌型号不能为空"){
      newPage.setData({ppxh:''});
    }
  },
  checkPPXH:function(){
    let ppxh=newPage.data.ppxh;
    if(ppxh==""||ppxh==null||ppxh=="品牌型号不能为空"){
      newPage.setData({ppxh:'品牌型号不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  //验证发证日期
  checkFZRQ:function(){
    let fzrq=newPage.data.fzrq;
    if(fzrq==null||fzrq==""){
        wx.showToast({
          title: "请选择发证日期",
        })
        return false;
    }
    else
      return true;
  },
  //验证车辆类型
  checkCLLX:function(){
    let cllxSelectId=newPage.data.cllxSelectId;
    if(cllxSelectId==null||cllxSelectId==""){
        wx.showToast({
          title: "请选择车辆类型",
        })
        return false;
    }
    else
      return true;
  },
  //验证是否在用
  checkSFZY:function(){
    let sfzySelectId=newPage.data.sfzySelectId;
    if(sfzySelectId==null||sfzySelectId==""){
        wx.showToast({
          title: "请选择是否在用",
        })
        return false;
    }
    else
      return true;
  },
  //验证审核状态
  checkSHZT:function(){
    let shztSelectId=newPage.data.shztSelectId;
    if(shztSelectId==null||shztSelectId==""){
        wx.showToast({
          title: "请选择审核状态",
        })
        return false;
    }
    else
      return true;
  },
  pickerZcrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    newPage.setData({zcrq:value});
  },
  pickerFzrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    newPage.setData({fzrq:value});
  },
  pickerZcrqCancel:function(){
    newPage.setData({zcrq:''});
  },
  pickerFzrqCancel:function(){
    newPage.setData({fzrq:''});
  },
  // 点击下拉显示框
  showPfjdOption() {
    newPage.setData({
      showPfjdOption: !newPage.data.showPfjdOption,
    });
  },
  // 点击下拉显示框
  showYslxOption() {
    newPage.setData({
      showYslxOption: !newPage.data.showYslxOption,
    });
  },
  // 点击下拉显示框
  showCllxOption() {
    newPage.setData({
      showCllxOption: !newPage.data.showCllxOption,
    });
  },
  // 点击下拉显示框
  showSfzyOption() {
    newPage.setData({
      showSfzyOption: !newPage.data.showSfzyOption,
    });
  },
  // 点击下拉显示框
  showShztOption() {
    newPage.setData({
      showShztOption: !newPage.data.showShztOption,
    });
  },
  // 点击下拉列表
  selectPfjdOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let pfjdList=newPage.data.pfjdList;
    let pfjd=pfjdList[index];
    console.log(index+","+pfjd.value+","+pfjd.text);
    newPage.setData({
      pfjdSelectIndex: index,
      pfjdSelectId: pfjd.value,
      showPfjdOption: !newPage.data.showPfjdOption
    });
  },
  // 点击下拉列表
  selectYslxOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let yslxList=newPage.data.yslxList;
    let yslx=yslxList[index];
    console.log(index+","+yslx.value+","+yslx.text);
    newPage.setData({
      yslxSelectIndex: index,
      yslxSelectId: yslx.value,
      showYslxOption: !newPage.data.showYslxOption
    });
  },
  // 点击下拉列表
  selectCllxOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let cllxList=newPage.data.cllxList;
    let cllx=cllxList[index];
    console.log(index+","+cllx.value+","+cllx.text);
    newPage.setData({
      cllxSelectIndex: index,
      cllxSelectId: cllx.value,
      showCllxOption: !newPage.data.showCllxOption
    });
  },
  // 点击下拉列表
  selectSfzyOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let sfzyList=newPage.data.sfzyList;
    let sfzy=sfzyList[index];
    console.log(index+","+sfzy.value+","+sfzy.text);
    newPage.setData({
      sfzySelectIndex: index,
      sfzySelectId: sfzy.value,
      showSfzyOption: !newPage.data.showSfzyOption
    });
  },
  // 点击下拉列表
  selectShztOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let shztList=newPage.data.shztList;
    let shzt=shztList[index];
    console.log(index+","+shzt.value+","+shzt.text);
    newPage.setData({
      shztSelectIndex: index,
      shztSelectId: shzt.value,
      showShztOption: !newPage.data.showShztOption
    });
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
  takeXsz:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("res.tempFilePaths==="+res.tempFilePaths)
        
        let tempFilePaths=res.tempFilePaths;
        let data=newPage.data;
        if(data.xsz==null)
          newPage.setData({xsz:tempFilePaths[0]});
      }
    })
  },
  takeScqd:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("res.tempFilePaths==="+res.tempFilePaths)
        
        let tempFilePaths=res.tempFilePaths;
        let data=newPage.data;
        if(data.scqd==null)
          newPage.setData({scqd:tempFilePaths[0]});
      }
    })
  },
  takePfjdcxjt:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("res.tempFilePaths==="+res.tempFilePaths)
        
        let tempFilePaths=res.tempFilePaths;
        let data=newPage.data;
        if(data.pfjdcxjt==null)
          newPage.setData({pfjdcxjt:tempFilePaths[0]});
      }
    })
  },
  deleteZp:function(){
    newPage.setData({zp:null});
  },
  deleteXsz:function(){
    newPage.setData({xsz:null});
  },
  deleteScqd:function(){
    newPage.setData({scqd:null});
  },
  deletePfjdcxjt:function(){
    newPage.setData({pfjdcxjt:null});
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
    let clId=newPage.data.clId;
    let clWjlxMap=newPage.data.constantMap.clWjlxMap;
    let wjlx;
    let zpWjlx=clWjlxMap.zpWjlx;
    let xszWjlx=clWjlxMap.xszWjlx;
    let scqdWjlx=clWjlxMap.scqdWjlx;
    let pfjdcxjtWjlx=clWjlxMap.pfjdcxjtWjlx;
    let filePath;
    switch (index) {
      case zpWjlx:
        wjlx=zpWjlx;
        filePath=newPage.data.zp;
        break;
      case xszWjlx:
        wjlx=xszWjlx;
        filePath=newPage.data.xsz;
        break;
      case scqdWjlx:
        wjlx=scqdWjlx;
        filePath=newPage.data.scqd;
        break;
      case pfjdcxjtWjlx:
        wjlx=pfjdcxjtWjlx;
        filePath=newPage.data.pfjdcxjt;
        break;
    }
    console.log("wjlx==="+wjlx)
    wx.uploadFile({
      url: rootIP+'uploadCheLiangFile', //仅为示例，非真实的接口地址
      filePath: filePath,
      name: 'file',
      formData:{id:clId,wjlx:wjlx},
      success: function(res){
        let wjlxListLength=newPage.data.wjlxList.length;
        index++;
        if(index<=wjlxListLength){
          let nextFilePath;
          switch (index) {
            case xszWjlx:
              nextFilePath=newPage.data.xsz;
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
      url: '/pages/clgl/zhcx/list',
    })
  },
})