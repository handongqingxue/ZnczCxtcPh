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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    editPage=this;
    rootIP=getApp().getRootIP();
    //let id=options.id;
    let id=11;
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
    console.log(index+","+js.id+","+js.mc);
    this.setData({
      jsSelectIndex: index,
      jsSelectId: js.id,
      showJsOption: !this.data.showJsOption
    });
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
        let yhm=yh.yhm;
        let xm=yh.xm;
        let cjsj=yh.cjsj;
        let shzt=yh.shzt;
        let shztMc=editPage.getShztMcById(shzt);
        let js=yh.js;
        //let jsSelectIndex=editPage.getZyztIndexInListByIf(zyzt);
        //editPage.setData({xm:xm,sjh:sjh,sfzzp:sfzzp==null?null:serverRootIP+sfzzp,sfzh:sfzh,zgzyxqz:zgzyxqz,jzyxqz:jzyxqz,zgzs:zgzs==null?null:serverRootIP+zgzs,jz:jz==null?null:serverRootIP+jz,zyztSelectId:zyzt,jsSelectIndex:jsSelectIndex});
        editPage.setData({yhm:yhm,xm:xm,cjsj:cjsj,shztMc:shztMc,js:js});
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
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/xtgl/yhcx/list',
    })
  },
})