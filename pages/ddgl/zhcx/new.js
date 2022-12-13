// pages/ddgl/zhcx/new.js
var newPage;
var rootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    lxlxList:[{value:"",text:"请选择"},{value:"1",text:"送运"},{value:"2",text:"取运"}],
    showLxlxOption:false,
    showYssOption:false,
    jhysrq:'',
    pickerStartTime: '1970-01-01 12:37',
    pickerEndTime: '2099-12-31 12:38',
    jhysrqPlaceholder:'请选择计划运输日期',
    dfgbsjPlaceholder: '请选择时间',
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
    newPage.getYssSelectData();
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
  checkNew:function(){
    if(newPage.checkYzxzl()){
      newPage.newDingDan();
    }
  },
  newDingDan:function(){
    let mc=newPage.data.mc;
    let px=newPage.data.px;
    console.log(mc)
    console.log(px)
    wx.request({
      url: rootIP+"newDingDan",
      data:{mc:mc,px:px},
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
    if(e.currentTarget.id=="yzxzl_inp"){
      let yzxzl=e.detail.value;
      newPage.setData({yzxzl:yzxzl});
    }
    else if(e.currentTarget.id=="px_inp"){
      let px=e.detail.value;
      newPage.setData({px:px});
    }
  },
  focusYzxzl:function(){
    let yzxzl=newPage.data.yzxzl;
    if(yzxzl=="预装卸重量不能为空"){
      newPage.setData({yzxzl:''});
    }
  },
  checkYzxzl:function(){
    let yzxzl=newPage.data.yzxzl;
    if(yzxzl==""||yzxzl==null||yzxzl=="预装卸重量不能为空"){
      newPage.setData({yzxzl:'预装卸重量不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/ddgl/zhcx/list',
    })
  },
  // 点击下拉显示框
  showLxlxOption() {
    newPage.setData({
      showLxlxOption: !newPage.data.showLxlxOption,
    });
  },
  // 点击下拉显示框
  showYssOption() {
    newPage.setData({
      showYssOption: !newPage.data.showYssOption,
    });
  },
  // 点击下拉列表
  selectLxlxOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let lxlxList=newPage.data.lxlxList;
    let lxlx=lxlxList[index];
    console.log(index+","+lxlx.id+","+lxlx.mc);
    this.setData({
      lxlxSelectIndex: index,
      lxlxSelectId: lxlx.id,
      showLxlxOption: !this.data.showLxlxOption
    });
  },
  // 点击下拉列表
  selectYssOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let yssList=newPage.data.yssList;
    let yss=yssList[index];
    console.log(index+","+yss.id+","+yss.mc);
    this.setData({
      yssSelectIndex: index,
      yssSelectId: yss.id,
      showYssOption: !this.data.showYssOption
    });
  },
  pickerJhysrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    newPage.setData({jhysrq:value});
  },
  pickerJhysrqCancel:function(){
    newPage.setData({jhysrq:''});
  },
  onPickerDfgbsjChange: function (e) {
    console.log("dateString==="+e.detail.dateString)
    newPage.setData({
      dfgbsj:e.detail.dateString  //选中的数据
    })
  },
  getYssSelectData:function(){
    wx.request({
      url: rootIP+"getYunShuShangSelectList",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let yssList=res.data.list;
        //console.log(yssList);
        newPage.setData({yssList:yssList});
      }
    })
  },
})