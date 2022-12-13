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
    showWzlxOption:false,
    showWzOption:false,
    showFhdwOption:false,
    showShdwOption:false,
    showCyclOption:false,
    showCysjOption:false,
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
  // 点击下拉显示框
  showWzlxOption() {
    newPage.setData({
      showWzlxOption: !newPage.data.showWzlxOption,
    });
  },
  // 点击下拉显示框
  showWzOption() {
    newPage.setData({
      showWzOption: !newPage.data.showWzOption,
    });
  },
  // 点击下拉显示框
  showFhdwOption() {
    newPage.setData({
      showFhdwOption: !newPage.data.showFhdwOption,
    });
  },
  // 点击下拉显示框
  showShdwOption() {
    newPage.setData({
      showShdwOption: !newPage.data.showShdwOption,
    });
  },
  // 点击下拉显示框
  showCyclOption() {
    newPage.setData({
      showCyclOption: !newPage.data.showCyclOption,
    });
  },
  // 点击下拉显示框
  showCysjOption() {
    newPage.setData({
      showCysjOption: !newPage.data.showCysjOption,
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
  // 点击下拉列表
  selectWzlxOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let wzlxList=newPage.data.wzlxList;
    let wzlx=wzlxList[index];
    console.log(index+","+wzlx.id+","+wzlx.mc);
    this.setData({
      wzlxSelectIndex: index,
      wzlxSelectId: wzlx.id,
      showWzlxOption: !this.data.showWzlxOption
    });
  },
  // 点击下拉列表
  selectWzOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let wzList=newPage.data.wzList;
    let wz=wzList[index];
    console.log(index+","+wz.id+","+wz.mc);
    this.setData({
      wzSelectIndex: index,
      wzSelectId: wz.id,
      showWzOption: !this.data.showWzOption
    });
  },
  // 点击下拉列表
  selectFhdwOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let fhdwList=newPage.data.fhdwList;
    let fhdw=fhdwList[index];
    console.log(index+","+fhdw.id+","+fhdw.mc);
    this.setData({
      fhdwSelectIndex: index,
      fhdwSelectId: fhdw.id,
      showFhdwOption: !this.data.showFhdwOption
    });
  },
  // 点击下拉列表
  selectShdwOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let shdwList=newPage.data.shdwList;
    let shdw=shdwList[index];
    console.log(index+","+shdw.id+","+shdw.mc);
    this.setData({
      shdwSelectIndex: index,
      shdwSelectId: shdw.id,
      showShdwOption: !this.data.showShdwOption
    });
  },
  // 点击下拉列表
  selectCyclOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let cyclList=newPage.data.cyclList;
    let cycl=cyclList[index];
    console.log(index+","+cycl.id+","+cycl.cph);
    this.setData({
      cyclSelectIndex: index,
      cyclSelectId: cycl.id,
      showCyclOption: !this.data.showCyclOption
    });
  },
  // 点击下拉列表
  selectCysjOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let cysjList=newPage.data.cysjList;
    let cysj=cysjList[index];
    console.log(index+","+cysj.id+","+cysj.xm);
    this.setData({
      cysjSelectIndex: index,
      cysjSelectId: cysj.id,
      showCysjOption: !this.data.showCysjOption
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
        newPage.getWzlxSelectData();
      }
    })
  },
  getWzlxSelectData:function(){
    wx.request({
      url: rootIP+"getWuZiLeiXingSelectList",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let wzlxList=res.data.list;
        //console.log(wzlxList);
        newPage.setData({wzlxList:wzlxList});
        newPage.getWzSelectData(wzlxList[0].id);
      }
    })
  },
  getWzSelectData:function(wzlxId){
    wx.request({
      url: rootIP+"getWuZiSelectList",
      data:{wzlxId:wzlxId},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let wzList=res.data.list;
        //console.log(wzList);
        newPage.setData({wzList:wzList});
        newPage.getFhdwSelectData();
      }
    })
  },
  getFhdwSelectData:function(){
    wx.request({
      url: rootIP+"getFaHuoDanWeiSelectList",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let fhdwList=res.data.list;
        //console.log(fhdwList);
        newPage.setData({fhdwList:fhdwList});
        newPage.getShdwSelectData();
      }
    })
  },
  getShdwSelectData:function(){
    wx.request({
      url: rootIP+"getShouHuoDanWeiSelectList",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let shdwList=res.data.list;
        //console.log(shdwList);
        newPage.setData({shdwList:shdwList});
        newPage.getCyclSelectData();
      }
    })
  },
  getCyclSelectData:function(){
    wx.request({
      url: rootIP+"getCheLiangSelectList",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let cyclList=res.data.list;
        //console.log(cyclList);
        newPage.setData({cyclList:cyclList});
        newPage.getCysjSelectData();
      }
    })
  },
  getCysjSelectData:function(){
    wx.request({
      url: rootIP+"getSiJiSelectList",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let cysjList=res.data.list;
        //console.log(cysjList);
        newPage.setData({cysjList:cysjList});
      }
    })
  },
})