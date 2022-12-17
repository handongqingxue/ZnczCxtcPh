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
    showClyslxOption:false,
    zcrq:'',
    zcrqPlaceholder:'请选择注册日期',
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
        let constantFlags=clShzt+","+clPfjd+","+clYslx+","+clSfzy;
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
        newPage.initClyslxSelectData();
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
  initClyslxSelectData:function(){
    let clYslxMap=newPage.data.constantMap.clYslxMap;
    let clYslxList=[];
    clYslxList.push({"value":"","text":"请选择"});
    clYslxList.push({"value":clYslxMap.physYslx,"text":clYslxMap.physYslxMc});
    clYslxList.push({"value":clYslxMap.cnysYslx,"text":clYslxMap.cnysYslxMc});
    clYslxList.push({"value":clYslxMap.whpysYslx,"text":clYslxMap.whpysYslxMc});
    newPage.setData({clYslxList:clYslxList});
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="cph_inp"){
      let cph=e.detail.value;
      newPage.setData({cph:cph});
    }
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
  pickerZcrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    newPage.setData({zcrq:value});
  },
  pickerZcrqCancel:function(){
    newPage.setData({zcrq:''});
  },
  // 点击下拉显示框
  showPfjdOption() {
    newPage.setData({
      showPfjdOption: !newPage.data.showPfjdOption,
    });
  },
  // 点击下拉显示框
  showClyslxOption() {
    newPage.setData({
      showClyslxOption: !newPage.data.showClyslxOption,
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
  selectClyslxOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let clyslxList=newPage.data.clyslxList;
    let clyslx=clyslxList[index];
    console.log(index+","+clyslx.value+","+clyslx.text);
    newPage.setData({
      clyslxSelectIndex: index,
      clyslxSelectId: clyslx.value,
      showClyslxOption: !newPage.data.showClyslxOption
    });
  },
})