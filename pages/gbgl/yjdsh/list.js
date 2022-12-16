// pages/gbgl/yjdsh/list.js
var yjdshListPage;
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
    yjdshListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    yjdshListPage.getConstantFlagMap();
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
        yjdshListPage.getConstantMap(constantFlags);
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
        yjdshListPage.setData({constantMap:constantMap});
        yjdshListPage.getListData();
      }
    })
  },
  showPageView:function(flag){
    if(flag){
      yjdshListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      yjdshListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      yjdshListPage.setData({showToolBarView:true});
    }
    else{
      yjdshListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag=="true"){
      yjdshListPage.setData({showNoDataView:true});
    }
    else if(flag=="false"){
      yjdshListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="ddh_inp"){
      let ddh=e.detail.value;
      yjdshListPage.setData({ddh:ddh});
    }
    else if(e.currentTarget.id=="cysjXm_inp"){
      let cysjXm=e.detail.value;
      yjdshListPage.setData({cysjXm:cysjXm});
    }
    else if(e.currentTarget.id=="cysjSfzh_inp"){
      let cysjSfzh=e.detail.value;
      yjdshListPage.setData({cysjSfzh:cysjSfzh});
    }
    else if(e.currentTarget.id=="cyclCph_inp"){
      let cyclCph=e.detail.value;
      yjdshListPage.setData({cyclCph:cyclCph});
    }
    else if(e.currentTarget.id=="yssMc_inp"){
      let yssMc=e.detail.value;
      yjdshListPage.setData({yssMc:yssMc});
    }
    else if(e.currentTarget.id=="fhdwMc_inp"){
      let fhdwMc=e.detail.value;
      yjdshListPage.setData({fhdwMc:fhdwMc});
    }
    else if(e.currentTarget.id=="shdwMc_inp"){
      let shdwMc=e.detail.value;
      yjdshListPage.setData({shdwMc:shdwMc});
    }
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=yjdshListPage.data.prePageFlag;
    let nextPageFlag=yjdshListPage.data.nextPageFlag;
    let currentPage=yjdshListPage.data.currentPage;
    let pageCount=yjdshListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      yjdshListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      yjdshListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    yjdshListPage.setData({currentPage:currentPage});
    yjdshListPage.getListData();
  },
  getListData:function(){
    let currentPage=yjdshListPage.data.currentPage;
    let pageSize=yjdshListPage.data.pageSize;
    let constantMap=yjdshListPage.data.constantMap;
    let defaultDdztMc=constantMap.ddztMap.yjdshDdztMc;
    let defaultGblx=constantMap.gblxMap.rcgbGblx;
    let ddh=yjdshListPage.data.ddh;
    let cysjXm=yjdshListPage.data.cysjXm;
    let cysjSfzh=yjdshListPage.data.cysjSfzh;
    let cyclCph=yjdshListPage.data.cyclCph;
    let yssMc=yjdshListPage.data.yssMc;
    let fhdwMc=yjdshListPage.data.fhdwMc;
    let shdwMc=yjdshListPage.data.shdwMc;

    let gbksrq=yjdshListPage.data.gbksrq;
    let gbkssj=yjdshListPage.data.gbkssj;
    let gbsjks="";
    if(gbksrq!=""&gbkssj!="")
      gbsjks=gbksrq+" "+gbkssj;

    let gbjsrq=yjdshListPage.data.gbjsrq;
    let gbjssj=yjdshListPage.data.gbjssj;
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
          var yjdshList=data.list;
          for(let i=0;i<yjdshList.length;i++){
            let yjdsh=yjdshList[i];
            let lxlx=yjdsh.lxlx;
            let lxlxMc=yjdshListPage.getLxlxMcById(lxlx);
            yjdsh.lxlxMc=lxlxMc;

            let gbzt=yjdsh.gbzt;
            let gbztMc=yjdshListPage.getGbztMcById(gbzt);
            yjdsh.gbztMc=gbztMc;
          }
          yjdshListPage.setData({yjdshList:yjdshList});
        }
        else{
          yjdshListPage.showNoDataView(true);
          yjdshListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        yjdshListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        yjdshListPage.showToolBarView(e);
      }
    })
  },
  getLxlxMcById:function(lxlxId){
    let constantMap=yjdshListPage.data.constantMap;
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
    let constantMap=yjdshListPage.data.constantMap;
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
    yjdshListPage.setData({gbksrq:value});
  },
  pickerGbkssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    yjdshListPage.setData({gbkssj:value});
  },
  pickerGbjsrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    yjdshListPage.setData({gbjsrq:value});
  },
  pickerGbjssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    yjdshListPage.setData({gbjssj:value});
  },
  pickerGbksrqCancel:function(){
    yjdshListPage.setData({gbksrq:''});
  },
  pickerGbkssjCancel:function(){
    yjdshListPage.setData({gbkssj:''});
  },
  pickerGbjsrqCancel:function(){
    yjdshListPage.setData({gbjsrq:''});
  },
  pickerGbjssjCancel:function(){
    yjdshListPage.setData({gbjssj:''});
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})