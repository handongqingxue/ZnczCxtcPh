// pages/sjgl/dsh/list.js
var dshListPage;
var rootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    showDjckgdView:true,
    showPageView:false,
    showToolBarView:false,
    currentPage:1,
    pageSize:10,
    showNoDataView:false,
    xm:"",
    sjh:"",
    sfzh:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    dshListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    dshListPage.getConstantFlagMap();
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
        let constantFlags=sjShzt;
        dshListPage.getConstantMap(constantFlags);
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
        dshListPage.setData({constantMap:constantMap});
        dshListPage.getListData();
      }
    })
  },
  showPageView:function(flag){
    if(flag){
      dshListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      dshListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      dshListPage.setData({showToolBarView:true});
    }
    else{
      dshListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      dshListPage.setData({showNoDataView:true});
    }
    else{
      dshListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="xm_inp"){
      let xm=e.detail.value;
      dshListPage.setData({xm:xm});
    }
    else if(e.currentTarget.id=="sjh_inp"){
      let sjh=e.detail.value;
      dshListPage.setData({sjh:sjh});
    }
    else if(e.currentTarget.id=="sfzh_inp"){
      let sfzh=e.detail.value;
      dshListPage.setData({sfzh:sfzh});
    }
  },
  resetToolBarData:function(){
    dshListPage.setData({xm:"",sjh:"",sfzh:""});
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=dshListPage.data.prePageFlag;
    let nextPageFlag=dshListPage.data.nextPageFlag;
    let currentPage=dshListPage.data.currentPage;
    let pageCount=dshListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      dshListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      dshListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    dshListPage.setData({currentPage:currentPage});
    dshListPage.getListData();
  },
  getListData:function(){
    let currentPage=dshListPage.data.currentPage;
    let pageSize=dshListPage.data.pageSize;
    let xm=dshListPage.data.xm;
    let sjh=dshListPage.data.sjh;
    let sfzh=dshListPage.data.sfzh;
    let sjShztMap=dshListPage.data.constantMap.sjShztMap;
    let defaultShzt=sjShztMap.dshShzt;

    console.log("xm==="+xm)
    console.log("sjh==="+sjh)
    console.log("sfzh==="+sfzh)
    console.log("defaultShzt==="+defaultShzt)

    wx.request({
      url: rootIP+"getSiJiList",
      data:{page:currentPage,rows:pageSize,xm:xm,sjh:sjh,sfzh:sfzh,shzt:defaultShzt},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        dshListPage.setData({sjList:[]});
        if(status=="ok"){
          var sjList=data.list;
          dshListPage.setData({sjList:sjList});
          dshListPage.showNoDataView(false);
          dshListPage.setData({noDataText:""});
        }
        else{
          dshListPage.showNoDataView(true);
          dshListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        dshListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        dshListPage.showToolBarView(e);
      }
    })
  },
  checkById:function(e){
    let shjg=e.currentTarget.dataset.shjg;
    let tsStr;
    if(shjg)
      tsStr="审核";
    else
      tsStr="退回";
    let confirmStr="确定要"+tsStr+"吗？";
    wx.showModal({
      title: "提示",
      content: confirmStr,
      success (res) {
        if (res.confirm) {
          //console.log('用户点击确定')
          let id=e.currentTarget.dataset.id;
          let yongHu=wx.getStorageSync("yongHu");
          let shrId=yongHu.id;
          wx.request({
            url: rootIP+"checkSiJiByIds",
            data:{ids:id,shjg:shjg,shrId:shrId},
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            success: function (res) {
              let data=res.data;
              let status=data.status;
              console.log("status==="+status)
              if(status==1){
                wx.showToast({
                  title: data.msg,
                })
              }
              else{
                
              }
            }
          })
        }
      }
    })
  },
  goDetailPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/sjgl/dsh/detail?id='+id,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})