// pages/gbgl/ejdsh/list.js
var ejdshListPage;
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
    cysjXm:"",
    cysjSfzh:"",
    cyclCph:"",
    yssMc:"",
    fhdwMc:"",
    shdwMc:"",
    prePageFlag:1,
    nextPageFlag:2,
    prePageEnable:false,
    nextPageEnable:true,

    gbksrq:'',
    gbksrqPlaceholder: '请选择开始日期',
    gbkssj:'',
    gbkssjPlaceholder: '请选择开始时间',
    gbjsrq:'',
    gbjsrqPlaceholder: '请选择结束日期',
    gbjssj:'',
    gbjssjPlaceholder: '请选择结束时间',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ejdshListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    ejdshListPage.getConstantFlagMap();
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
        let lxlx=constantFlagMap.lxlx;
        let ddzt=constantFlagMap.ddzt;
        let gbjlGbzt=constantFlagMap.gbjlGbzt;
        let gblx=constantFlagMap.gblx;
        let constantFlags=lxlx+","+ddzt+","+gbjlGbzt+","+gblx;
        ejdshListPage.getConstantMap(constantFlags);
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
        ejdshListPage.setData({constantMap:constantMap});
        ejdshListPage.getListData();
      }
    })
  },
  showPageView:function(flag){
    if(flag){
      ejdshListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      ejdshListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      ejdshListPage.setData({showToolBarView:true});
    }
    else{
      ejdshListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      ejdshListPage.setData({showNoDataView:true});
    }
    else if(flag){
      ejdshListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="ddh_inp"){
      let ddh=e.detail.value;
      ejdshListPage.setData({ddh:ddh});
    }
    else if(e.currentTarget.id=="cysjXm_inp"){
      let cysjXm=e.detail.value;
      ejdshListPage.setData({cysjXm:cysjXm});
    }
    else if(e.currentTarget.id=="cysjSfzh_inp"){
      let cysjSfzh=e.detail.value;
      ejdshListPage.setData({cysjSfzh:cysjSfzh});
    }
    else if(e.currentTarget.id=="cyclCph_inp"){
      let cyclCph=e.detail.value;
      ejdshListPage.setData({cyclCph:cyclCph});
    }
    else if(e.currentTarget.id=="yssMc_inp"){
      let yssMc=e.detail.value;
      ejdshListPage.setData({yssMc:yssMc});
    }
    else if(e.currentTarget.id=="fhdwMc_inp"){
      let fhdwMc=e.detail.value;
      ejdshListPage.setData({fhdwMc:fhdwMc});
    }
    else if(e.currentTarget.id=="shdwMc_inp"){
      let shdwMc=e.detail.value;
      ejdshListPage.setData({shdwMc:shdwMc});
    }
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=ejdshListPage.data.prePageFlag;
    let nextPageFlag=ejdshListPage.data.nextPageFlag;
    let currentPage=ejdshListPage.data.currentPage;
    let pageCount=ejdshListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      ejdshListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      ejdshListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    ejdshListPage.setData({currentPage:currentPage});
    ejdshListPage.getListData();
  },
  getListData:function(){
    let currentPage=ejdshListPage.data.currentPage;
    let pageSize=ejdshListPage.data.pageSize;
    let constantMap=ejdshListPage.data.constantMap;
    let defaultDdztMc=constantMap.ddztMap.ejdshDdztMc;
    let defaultGblx=constantMap.gblxMap.ccgbGblx;
    let ddh=ejdshListPage.data.ddh;
    let cysjXm=ejdshListPage.data.cysjXm;
    let cysjSfzh=ejdshListPage.data.cysjSfzh;
    let cyclCph=ejdshListPage.data.cyclCph;
    let yssMc=ejdshListPage.data.yssMc;
    let fhdwMc=ejdshListPage.data.fhdwMc;
    let shdwMc=ejdshListPage.data.shdwMc;

    let gbksrq=ejdshListPage.data.gbksrq;
    let gbkssj=ejdshListPage.data.gbkssj;
    let gbsjks="";
    if(gbksrq!=""&gbkssj!="")
      gbsjks=gbksrq+" "+gbkssj;

    let gbjsrq=ejdshListPage.data.gbjsrq;
    let gbjssj=ejdshListPage.data.gbjssj;
    let gbsjjs="";
    if(gbjsrq!=""&gbjssj!="")
      gbsjjs=gbjsrq+" "+gbjssj;

    console.log("defaultDdztMc==="+defaultDdztMc)
    console.log("defaultGblx==="+defaultGblx)
    console.log("ddh==="+ddh)
    console.log("cysjXm==="+cysjXm)
    console.log("cysjSfzh==="+cysjSfzh)
    console.log("cyclCph==="+cyclCph)
    console.log("yssMc==="+yssMc)
    console.log("fhdwMc==="+fhdwMc)
    console.log("shdwMc==="+shdwMc)
    console.log("gbsjks==="+gbsjks)
    console.log("gbsjjs==="+gbsjjs)

    wx.request({
      url: rootIP+"getDJYList",
      data:{page:currentPage,rows:pageSize,ddztMc:defaultDdztMc,gblx:defaultGblx,ddh:ddh,cysjXm:cysjXm,cysjSfzh:cysjSfzh,cyclCph:cyclCph,yssMc:yssMc,fhdwMc:fhdwMc,shdwMc:shdwMc,gbsjks:gbsjks,gbsjjs:gbsjjs},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        if(status=="ok"){
          var ejdshList=data.list;
          for(let i=0;i<ejdshList.length;i++){
            let ejdsh=ejdshList[i];
            let lxlx=ejdsh.lxlx;
            let lxlxMc=ejdshListPage.getLxlxMcById(lxlx);
            ejdsh.lxlxMc=lxlxMc;

            let gbzt=ejdsh.gbzt;
            let gbztMc=ejdshListPage.getGbztMcById(gbzt);
            ejdsh.gbztMc=gbztMc;
          }
          ejdshListPage.setData({ejdshList:ejdshList});
        }
        else{
          ejdshListPage.showNoDataView(true);
          ejdshListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        ejdshListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        ejdshListPage.showToolBarView(e);
      }
    })
  },
  getLxlxMcById:function(lxlxId){
    let constantMap=ejdshListPage.data.constantMap;
    let lxlxMap=constantMap.lxlxMap;
    //console.log(lxlxMap);
    var str;
    switch (lxlxId) {
      case lxlxMap.syLxlx:
        str=lxlxMap.syLxlxMc;//送运
        break;
      case lxlxMap.qyLxlx:
        str=lxlxMap.qyLxlxMc;//取运
        break;
    }
    return str;
  },
  getGbztMcById:function(gbztId){
    let constantMap=ejdshListPage.data.constantMap;
    let gbztMap=constantMap.gbjlGbztMap;
    //console.log(gbztMap);
    var str;
    switch (gbztId) {
    case gbztMap.zcGbzt:
      str=gbztMap.zcGbztMc;//正常
      break;
    case gbztMap.ycGbzt:
      str=gbztMap.ycGbztMc;//异常
      break;
    }
    return str;
  },
  pickerGbksrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    ejdshListPage.setData({gbksrq:value});
  },
  pickerGbkssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    ejdshListPage.setData({gbkssj:value});
  },
  pickerGbjsrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    ejdshListPage.setData({gbjsrq:value});
  },
  pickerGbjssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    ejdshListPage.setData({gbjssj:value});
  },
  pickerGbksrqCancel:function(){
    ejdshListPage.setData({gbksrq:''});
  },
  pickerGbkssjCancel:function(){
    ejdshListPage.setData({gbkssj:''});
  },
  pickerGbjsrqCancel:function(){
    ejdshListPage.setData({gbjsrq:''});
  },
  pickerGbjssjCancel:function(){
    ejdshListPage.setData({gbjssj:''});
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})