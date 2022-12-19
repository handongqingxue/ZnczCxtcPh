// pages/clgl/zhcx/edit.js
var editPage;
var rootIP;
var serverRootIP;
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
    editPage=this;
    rootIP=getApp().getRootIP();
    serverRootIP=getApp().getServerRootIP();
    let id=options.id;
    //let id=13;
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
        let clShzt=constantFlagMap.clShzt;
        let clPfjd=constantFlagMap.clPfjd;
        let clYslx=constantFlagMap.clYslx;
        let clSfzy=constantFlagMap.clSfzy;
        let clWjlx=constantFlagMap.clWjlx;
        let constantFlags=clShzt+","+clPfjd+","+clYslx+","+clSfzy+","+clWjlx;
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
        editPage.initPfjdSelectData();
        editPage.initYslxSelectData();
        editPage.initSfzySelectData();
        editPage.initShztSelectData();
        editPage.initWjlxList();
        editPage.getCLInfo();
      }
    })
  },
  initPfjdSelectData:function(){
    let clPfjdMap=editPage.data.constantMap.clPfjdMap;
    let pfjdList=[];
    pfjdList.push({"value":"","text":"请选择"});
    pfjdList.push({"value":clPfjdMap.gwryPfjd,"text":clPfjdMap.gwryPfjdMc});
    pfjdList.push({"value":clPfjdMap.gwrqPfjd,"text":clPfjdMap.gwrqPfjdMc});
    pfjdList.push({"value":clPfjdMap.glryPfjd,"text":clPfjdMap.glryPfjdMc});
    pfjdList.push({"value":clPfjdMap.glrqPfjd,"text":clPfjdMap.glrqPfjdMc});
    pfjdList.push({"value":clPfjdMap.ddPfjd,"text":clPfjdMap.ddPfjdMc});
    editPage.setData({pfjdList:pfjdList});
  },
  initYslxSelectData:function(){
    let clYslxMap=editPage.data.constantMap.clYslxMap;
    let yslxList=[];
    yslxList.push({"value":"","text":"请选择"});
    yslxList.push({"value":clYslxMap.physYslx,"text":clYslxMap.physYslxMc});
    yslxList.push({"value":clYslxMap.cnysYslx,"text":clYslxMap.cnysYslxMc});
    yslxList.push({"value":clYslxMap.whpysYslx,"text":clYslxMap.whpysYslxMc});
    editPage.setData({yslxList:yslxList});
  },
  initSfzySelectData:function(){
    let clSfzyMap=editPage.data.constantMap.clSfzyMap;
    let sfzyList=[];
    sfzyList.push({"value":"","text":"请选择"});
    sfzyList.push({"value":clSfzyMap.shiSfzy,"text":clSfzyMap.shiSfzyMc});
    sfzyList.push({"value":clSfzyMap.fouSfzy,"text":clSfzyMap.fouSfzyMc});
    editPage.setData({sfzyList:sfzyList});
  },
  initShztSelectData:function(){
    let clShztMap=editPage.data.constantMap.clShztMap;
    let shztList=[];
    shztList.push({"value":"","text":"请选择"});
    shztList.push({"value":clShztMap.dshShzt,"text":clShztMap.dshShztMc});
    shztList.push({"value":clShztMap.shtgShzt,"text":clShztMap.shtgShztMc});
    shztList.push({"value":clShztMap.bjzShzt,"text":clShztMap.bjzShztMc});
    editPage.setData({shztList:shztList});
  },
  initWjlxList:function(){
    let clWjlxMap=editPage.data.constantMap.clWjlxMap;
    let wjlxList=[];
    wjlxList.push(clWjlxMap.zpWjlx);
    wjlxList.push(clWjlxMap.xszWjlx);
    wjlxList.push(clWjlxMap.scqdWjlx);
    wjlxList.push(clWjlxMap.pfjdcxjtWjlx);
    editPage.setData({wjlxList:wjlxList});
  },
  getCLInfo:function(){
    let id=editPage.data.id;
    wx.request({
      url: rootIP+"getCheLiang",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let cl=data.cl;
        let cph=cl.cph;
        let fdjhm=cl.fdjhm;
        let clsbdh=cl.clsbdh;
        let zcrq=cl.zcrq;
        let pfjd=cl.pfjd;
        let pfjdSelectIndex=editPage.getPfjdIndexInListById(pfjd);
        let yslx=cl.yslx;
        let yslxSelectIndex=editPage.getYslxIndexInListById(yslx);
        let ppxh=cl.ppxh;
        let czxx=cl.czxx;
        let fzrq=cl.fzrq;
        let pz=cl.pz;
        let cllx=cl.cllx;
        let cllxSelectIndex=editPage.getCllxIndexInListById(cllx);
        let zp=cl.zp;
        let xsz=cl.xsz;
        let scqd=cl.scqd;
        let pfjdcxjt=cl.pfjdcxjt;
        let sfzy=cl.sfzy;
        let sfzySelectIndex=editPage.getSfzyIndexInListByIf(sfzy);
        let shzt=cl.shzt;
        let shztSelectIndex=editPage.getShztIndexInListById(shzt);
        let bz=cl.bz;
        editPage.setData({cph:cph,fdjhm:fdjhm,clsbdh:clsbdh,zcrq:zcrq,pfjdSelectId:pfjd,pfjdSelectIndex:pfjdSelectIndex,yslxSelectId:yslx,yslxSelectIndex:yslxSelectIndex,ppxh:ppxh,czxx:czxx,fzrq:fzrq,pz:pz,cllxSelectId:cllx,cllxSelectIndex:cllxSelectIndex,zp:zp==null?null:serverRootIP+zp,xsz:xsz==null?null:serverRootIP+xsz,scqd:scqd==null?null:serverRootIP+scqd,pfjdcxjt:pfjdcxjt==null?null:serverRootIP+pfjdcxjt,sfzySelectId:sfzy,sfzySelectIndex:sfzySelectIndex,shztSelectId:shzt,shztSelectIndex:shztSelectIndex,bz:bz});
      }
    })
  },
  getPfjdIndexInListById:function(pfjdId){
    let pfjdSelectIndex;
    let pfjdList=editPage.data.pfjdList;
    //console.log(pfjdList)
    for(let i=0;i<pfjdList.length;i++){
      let pfjd=pfjdList[i];
      if(pfjdId==pfjd.value){
        pfjdSelectIndex=i;
        break;
      }
    }
    return pfjdSelectIndex;
  },
  getYslxIndexInListById:function(yslxId){
    let yslxSelectIndex;
    let yslxList=editPage.data.yslxList;
    //console.log(yslxList)
    for(let i=0;i<yslxList.length;i++){
      let yslx=yslxList[i];
      if(yslxId==yslx.value){
        yslxSelectIndex=i;
        break;
      }
    }
    return yslxSelectIndex;
  },
  getCllxIndexInListById:function(cllxId){
    let cllxSelectIndex;
    let cllxList=editPage.data.cllxList;
    //console.log(cllxList)
    for(let i=0;i<cllxList.length;i++){
      let cllx=cllxList[i];
      if(cllxId==cllx.value){
        cllxSelectIndex=i;
        break;
      }
    }
    return cllxSelectIndex;
  },
  getSfzyIndexInListByIf:function(sfzyId){
    let sfzySelectIndex;
    let sfzyList=editPage.data.sfzyList;
    //console.log(sfzyList)
    for(let i=0;i<sfzyList.length;i++){
      let sfzy=sfzyList[i];
      if(sfzyId==sfzy.value){
        sfzySelectIndex=i;
        break;
      }
    }
    return sfzySelectIndex;
  },
  getShztIndexInListById:function(shztId){
    let shztSelectIndex;
    let shztList=editPage.data.shztList;
    //console.log(shztList)
    for(let i=0;i<shztList.length;i++){
      let shzt=shztList[i];
      if(shztId==shzt.value){
        shztSelectIndex=i;
        break;
      }
    }
    return shztSelectIndex;
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="cph_inp"){
      let cph=e.detail.value;
      editPage.setData({cph:cph});
    }
    else if(e.currentTarget.id=="fdjhm_inp"){
      let fdjhm=e.detail.value;
      editPage.setData({fdjhm:fdjhm});
    }
    else if(e.currentTarget.id=="clsbdh_inp"){
      let clsbdh=e.detail.value;
      editPage.setData({clsbdh:clsbdh});
    }
    else if(e.currentTarget.id=="ppxh_inp"){
      let ppxh=e.detail.value;
      editPage.setData({ppxh:ppxh});
    }
    else if(e.currentTarget.id=="czxx_inp"){
      let czxx=e.detail.value;
      editPage.setData({czxx:czxx});
    }
    else if(e.currentTarget.id=="pz_inp"){
      let pz=e.detail.value;
      editPage.setData({pz:pz});
    }
    else if(e.currentTarget.id=="bz_inp"){
      let bz=e.detail.value;
      editPage.setData({bz:bz});
    }
  },
  checkEdit:function(){
    if(editPage.checkCph()){
      if(editPage.checkZCRQ()){
        if(editPage.checkPFJD()){
          if(editPage.checkYSLX()){
            if(editPage.checkPPXH()){
              if(editPage.checkFZRQ()){
                if(editPage.checkCLLX()){
                  if(editPage.checkSFZY()){
                    if(editPage.checkSHZT()){
                      editPage.editCheLiang();
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
  editCheLiang:function(){
    editPage.saving(true);
    let id=editPage.data.id;
    let cph=editPage.data.cph;
    let fdjhm=editPage.data.fdjhm;
    let clsbdh=editPage.data.clsbdh;
    let zcrq=editPage.data.zcrq;
    let pfjdSelectId=editPage.data.pfjdSelectId;
    let yslxSelectId=editPage.data.yslxSelectId;
    let ppxh=editPage.data.ppxh;
    let czxx=editPage.data.czxx;
    let fzrq=editPage.data.fzrq;
    let pz=editPage.data.pz;
    let cllxSelectId=editPage.data.cllxSelectId;
    let sfzySelectId=editPage.data.sfzySelectId;
    let shztSelectId=editPage.data.shztSelectId;
    let bz=editPage.data.bz;
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
      url: rootIP+"editCheLiang",
      data:{id:id,cph:cph,fdjhm:fdjhm,clsbdh:clsbdh,zcrq:zcrq,pfjd:pfjdSelectId,yslx:yslxSelectId,ppxh:ppxh,czxx:czxx,fzrq:fzrq,pz:pz,cllx:cllxSelectId,sfzy:sfzySelectId,shzt:shztSelectId,bz:bz},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        console.log("message==="+message)
        if(message=="ok"){
          let zp=editPage.data.tempZpPath;
          console.log("zp==="+zp)
          if(zp==undefined){
            editPage.saving(false);
            wx.showToast({
              title: data.info,
            })
            setTimeout(() => {
              editPage.goListPage();
            }, 2000);
          }
          else{
            let zpWjlx=editPage.data.constantMap.clWjlxMap.zpWjlx;
            editPage.uploadFile(zpWjlx); 
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
    let cph=editPage.data.cph;
    if(cph=="车牌号不能为空"){
      editPage.setData({cph:''});
    }
  },
  checkCph:function(){
    let cph=editPage.data.cph;
    if(cph==""||cph==null||cph=="车牌号不能为空"){
      editPage.setData({cph:'车牌号不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkZCRQ:function(){
    let zcrq=editPage.data.zcrq;
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
    let pfjdSelectId=editPage.data.pfjdSelectId;
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
    let yslxSelectId=editPage.data.yslxSelectId;
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
    let ppxh=editPage.data.ppxh;
    if(ppxh=="品牌型号不能为空"){
      editPage.setData({ppxh:''});
    }
  },
  checkPPXH:function(){
    let ppxh=editPage.data.ppxh;
    if(ppxh==""||ppxh==null||ppxh=="品牌型号不能为空"){
      editPage.setData({ppxh:'品牌型号不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  //验证发证日期
  checkFZRQ:function(){
    let fzrq=editPage.data.fzrq;
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
    let cllxSelectId=editPage.data.cllxSelectId;
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
    let sfzySelectId=editPage.data.sfzySelectId;
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
    let shztSelectId=editPage.data.shztSelectId;
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
    editPage.setData({zcrq:value});
  },
  pickerFzrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    editPage.setData({fzrq:value});
  },
  pickerZcrqCancel:function(){
    editPage.setData({zcrq:''});
  },
  pickerFzrqCancel:function(){
    editPage.setData({fzrq:''});
  },
  // 点击下拉显示框
  showPfjdOption() {
    editPage.setData({
      showPfjdOption: !editPage.data.showPfjdOption,
    });
  },
  // 点击下拉显示框
  showYslxOption() {
    editPage.setData({
      showYslxOption: !editPage.data.showYslxOption,
    });
  },
  // 点击下拉显示框
  showCllxOption() {
    editPage.setData({
      showCllxOption: !editPage.data.showCllxOption,
    });
  },
  // 点击下拉显示框
  showSfzyOption() {
    editPage.setData({
      showSfzyOption: !editPage.data.showSfzyOption,
    });
  },
  // 点击下拉显示框
  showShztOption() {
    editPage.setData({
      showShztOption: !editPage.data.showShztOption,
    });
  },
  // 点击下拉列表
  selectPfjdOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let pfjdList=editPage.data.pfjdList;
    let pfjd=pfjdList[index];
    console.log(index+","+pfjd.value+","+pfjd.text);
    editPage.setData({
      pfjdSelectIndex: index,
      pfjdSelectId: pfjd.value,
      showPfjdOption: !editPage.data.showPfjdOption
    });
  },
  // 点击下拉列表
  selectYslxOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let yslxList=editPage.data.yslxList;
    let yslx=yslxList[index];
    console.log(index+","+yslx.value+","+yslx.text);
    editPage.setData({
      yslxSelectIndex: index,
      yslxSelectId: yslx.value,
      showYslxOption: !editPage.data.showYslxOption
    });
  },
  // 点击下拉列表
  selectCllxOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let cllxList=editPage.data.cllxList;
    let cllx=cllxList[index];
    console.log(index+","+cllx.value+","+cllx.text);
    editPage.setData({
      cllxSelectIndex: index,
      cllxSelectId: cllx.value,
      showCllxOption: !editPage.data.showCllxOption
    });
  },
  // 点击下拉列表
  selectSfzyOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let sfzyList=editPage.data.sfzyList;
    let sfzy=sfzyList[index];
    console.log(index+","+sfzy.value+","+sfzy.text);
    editPage.setData({
      sfzySelectIndex: index,
      sfzySelectId: sfzy.value,
      showSfzyOption: !editPage.data.showSfzyOption
    });
  },
  // 点击下拉列表
  selectShztOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let shztList=editPage.data.shztList;
    let shzt=shztList[index];
    console.log(index+","+shzt.value+","+shzt.text);
    editPage.setData({
      shztSelectIndex: index,
      shztSelectId: shzt.value,
      showShztOption: !editPage.data.showShztOption
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
        let data=editPage.data;
        if(data.zp==null)
          editPage.setData({zp:tempFilePaths[0],tempZpPath:tempFilePaths[0]});
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
        let data=editPage.data;
        if(data.xsz==null)
          editPage.setData({xsz:tempFilePaths[0],tempXszPath:tempFilePaths[0]});
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
        let data=editPage.data;
        if(data.scqd==null)
          editPage.setData({scqd:tempFilePaths[0],tempScqdPath:tempFilePaths[0]});
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
        let data=editPage.data;
        if(data.pfjdcxjt==null)
          editPage.setData({pfjdcxjt:tempFilePaths[0],tempPfjdcxjtPath:tempFilePaths[0]});
      }
    })
  },
  deleteZp:function(){
    editPage.setData({zp:null});
  },
  deleteXsz:function(){
    editPage.setData({xsz:null});
  },
  deleteScqd:function(){
    editPage.setData({scqd:null});
  },
  deletePfjdcxjt:function(){
    editPage.setData({pfjdcxjt:null});
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
    let id=editPage.data.id;
    let clWjlxMap=editPage.data.constantMap.clWjlxMap;
    let wjlx;
    let zpWjlx=clWjlxMap.zpWjlx;
    let xszWjlx=clWjlxMap.xszWjlx;
    let scqdWjlx=clWjlxMap.scqdWjlx;
    let pfjdcxjtWjlx=clWjlxMap.pfjdcxjtWjlx;
    let filePath;
    switch (index) {
      case zpWjlx:
        wjlx=zpWjlx;
        filePath=editPage.data.zp;
        break;
      case xszWjlx:
        wjlx=xszWjlx;
        filePath=editPage.data.xsz;
        break;
      case scqdWjlx:
        wjlx=scqdWjlx;
        filePath=editPage.data.scqd;
        break;
      case pfjdcxjtWjlx:
        wjlx=pfjdcxjtWjlx;
        filePath=editPage.data.pfjdcxjt;
        break;
    }
    console.log("wjlx==="+wjlx)
    wx.uploadFile({
      url: rootIP+'uploadCheLiangFile', //仅为示例，非真实的接口地址
      filePath: filePath,
      name: 'file',
      formData:{id:id,wjlx:wjlx},
      success: function(res){
        let wjlxListLength=editPage.data.wjlxList.length;
        index++;
        if(index<=wjlxListLength){
          let nextFilePath;
          switch (index) {
            case xszWjlx:
              nextFilePath=editPage.data.tempXszPath;
              break;
            case scqdWjlx:
              nextFilePath=editPage.data.tempScqdPath;
              break;
            case pfjdcxjtWjlx:
              nextFilePath=editPage.data.tempPfjdcxjtPath;
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
      url: '/pages/clgl/zhcx/list',
    })
  },
})