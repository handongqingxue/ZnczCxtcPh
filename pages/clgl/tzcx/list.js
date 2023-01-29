// pages/clgl/tzcx/list.js
var tzcxListPage;
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
    ddh:"",
    cph:"",
    ddztSelectIds:"",
    ddztSelectMcs:"",
    prePageFlag:1,
    nextPageFlag:2,
    prePageEnable:false,
    nextPageEnable:true,
    showDdztOption:false,
    
    jcksrq:'',
    jcksrqPlaceholder: '请选择开始日期',
    jckssj:'',
    jckssjPlaceholder: '请选择开始时间',
    jcjsrq:'',
    jcjsrqPlaceholder: '请选择结束日期',
    jcjssj:'',
    jcjssjPlaceholder: '请选择结束时间',
    
    ccksrq:'',
    ccksrqPlaceholder: '请选择开始日期',
    cckssj:'',
    cckssjPlaceholder: '请选择开始时间',
    ccjsrq:'',
    ccjsrqPlaceholder: '请选择结束日期',
    ccjssj:'',
    ccjssjPlaceholder: '请选择结束时间',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tzcxListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    tzcxListPage.getDdztSelectData();
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
  showPageView:function(flag){
    if(flag){
      tzcxListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      tzcxListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      tzcxListPage.setData({showToolBarView:true});
    }
    else{
      tzcxListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      tzcxListPage.setData({showNoDataView:true});
    }
    else{
      tzcxListPage.setData({showNoDataView:false});
    }
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=tzcxListPage.data.prePageFlag;
    let nextPageFlag=tzcxListPage.data.nextPageFlag;
    let currentPage=tzcxListPage.data.currentPage;
    let pageCount=tzcxListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      tzcxListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      tzcxListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    tzcxListPage.setData({currentPage:currentPage});
    tzcxListPage.getListData();
  },
  getDdztSelectData:function(){
    wx.request({
      url: rootIP+"getDingDanZhuangTaiSelectList",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let ddztList=res.data.list;
        //console.log(ddztList);
        tzcxListPage.setData({ddztList:ddztList});
        tzcxListPage.getListData();
      }
    })
  },
  resetToolBarData:function(){
    tzcxListPage.setData({ddh:"",cph:"",ddztSelectIndex:0,ddztSelectIds:"",jcksrq:"",jckssj:"",jcjsrq:"",jcjssj:"",ccksrq:"",cckssj:"",ccjsrq:"",ccjssj:""});
  },
  getListData:function(){
    let currentPage=tzcxListPage.data.currentPage;
    let pageSize=tzcxListPage.data.pageSize;
    let ddh=tzcxListPage.data.ddh;
    let cph=tzcxListPage.data.cph;
    let ddztIds=tzcxListPage.data.ddztSelectIds;

    let jcksrq=tzcxListPage.data.jcksrq;
    let jckssj=tzcxListPage.data.jckssj;
    let jcsjs="";
    if(jcksrq!=""&jckssj!="")
      jcsjs=jcksrq+" "+jckssj;

    let jcjsrq=tzcxListPage.data.jcjsrq;
    let jcjssj=tzcxListPage.data.jcjssj;
    let jcsje="";
    if(jcjsrq!=""&jcjssj!="")
      jcsje=jcjsrq+" "+jcjssj;

    let ccksrq=tzcxListPage.data.ccksrq;
    let cckssj=tzcxListPage.data.cckssj;
    let ccsjs="";
    if(ccksrq!=""&cckssj!="")
      ccsjs=ccksrq+" "+cckssj;

    let ccjsrq=tzcxListPage.data.ccjsrq;
    let ccjssj=tzcxListPage.data.ccjssj;
    let ccsje="";
    if(ccjsrq!=""&ccjssj!="")
      ccsje=ccjsrq+" "+ccjssj;

    console.log("ddh==="+ddh)
    console.log("cph==="+cph)
    console.log("ddztIds==="+ddztIds)
    console.log("jcsjs==="+jcsjs)
    console.log("jcsje==="+jcsje)
    console.log("ccsjs==="+ccsjs)
    console.log("ccsje==="+ccsje)
    
    wx.request({
      url: rootIP+"getCLTZList",
      data:{page:currentPage,rows:pageSize,ddh:ddh,cph:cph,ddztIds:ddztIds,jcsjs:jcsjs,jcsje:jcsje,ccsjs:ccsjs,ccsje:ccsje},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        tzcxListPage.setData({cltzList:[]});
        if(status=="ok"){
          var cltzList=data.list;
          tzcxListPage.setData({cltzList:cltzList});
          tzcxListPage.showNoDataView(false);
          tzcxListPage.setData({noDataText:""});
        }
        else{
          tzcxListPage.showNoDataView(true);
          tzcxListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        tzcxListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        tzcxListPage.showToolBarView(e);
      }
    })
  },
  // 点击下拉显示框
  showDdztOption() {
    tzcxListPage.setData({
      showDdztOption: !tzcxListPage.data.showDdztOption,
    });
  },
  // 点击下拉列表
  selectDdztOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let ddztList=tzcxListPage.data.ddztList;
    let ddzt=ddztList[index];
    console.log(index+","+ddzt.id+","+ddzt.mc);
    this.setData({
      ddztSelectIndex: index,
      ddztSelectId: ddzt.id,
      showDdztOption: !this.data.showDdztOption
    });
  },
  pickerJhysrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    tzcxListPage.setData({jhysrq:value});
  },
  pickerJcksrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    tzcxListPage.setData({jcksrq:value});
  },
  pickerJckssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    tzcxListPage.setData({jckssj:value});
  },
  pickerJcjsrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    tzcxListPage.setData({jcjsrq:value});
  },
  pickerJcjssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    tzcxListPage.setData({jcjssj:value});
  },
  pickerCcksrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    tzcxListPage.setData({ccksrq:value});
  },
  pickerCckssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    tzcxListPage.setData({cckssj:value});
  },
  pickerCcjsrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    tzcxListPage.setData({ccjsrq:value});
  },
  pickerCcjssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    tzcxListPage.setData({ccjssj:value});
  },
  pickerJhysrqCancel:function(){
    tzcxListPage.setData({jhysrq:''});
  },
  pickerJcksrqCancel:function(){
    tzcxListPage.setData({jcksrq:''});
  },
  pickerJckssjCancel:function(){
    tzcxListPage.setData({jckssj:''});
  },
  pickerJcjsrqCancel:function(){
    tzcxListPage.setData({jcjsrq:''});
  },
  pickerJcjssjCancel:function(){
    tzcxListPage.setData({jcjssj:''});
  },
  pickerCcksrqCancel:function(){
    tzcxListPage.setData({ccksrq:''});
  },
  pickerCckssjCancel:function(){
    tzcxListPage.setData({cckssj:''});
  },
  pickerCcjsrqCancel:function(){
    tzcxListPage.setData({ccjsrq:''});
  },
  pickerCcjssjCancel:function(){
    tzcxListPage.setData({ccjssj:''});
  },
  goDetailPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/clgl/tzcx/detail?id='+id,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})