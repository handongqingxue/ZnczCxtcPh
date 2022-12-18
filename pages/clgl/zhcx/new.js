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
    zcrq:'',
    zcrqPlaceholder:'请选择注册日期',
    fzrq:'',
    fzrqPlaceholder:'请选择发证日期',
    showSaveBut:true,
    showSavingBut:false,
    showSavedBut:false,
    cllxList:[{"value":"","text":"请选择车辆类型"},{"value":"1","text":"重型"}],
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
        newPage.initYslxSelectData();
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
})