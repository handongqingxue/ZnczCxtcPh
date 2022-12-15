// pages/ddgl/zhcx/list.js
//https://www.jb51.net/article/226579.htm
//日历控件:http://www.manongjc.com/detail/50-ojjdzoacvsunmma.html
//复选框控件:https://www.nhooo.com/note/qado3w.html
var zhcxListPage;
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
    ddztSelectId:"",
    cyclCph:"",
    jhysrq:'',
    yssMc:"",
    wzMc:"",
    fhdwMc:"",
    shdwMc:"",
    cysjXm:"",
    cysjSfzh:"",
    prePageFlag:1,
    nextPageFlag:2,
    prePageEnable:false,
    nextPageEnable:true,
    showDdztOption:false,
    //date: '2019-01-01 13:37',
    jhysrqPlaceholder:'请选择计划运输日期',

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
    zhcxListPage=this;
    rootIP=getApp().getRootIP();

    let dayTime= this.getToday();
    let dayHour = "18:01";
    let endedTime1 = dayTime + " " + dayHour;
    zhcxListPage.setData({
      date: endedTime1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    zhcxListPage.getConstantFlagMap();
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
        //zhcxListPage.setData({constantFlagMap:constantFlagMap});
        let lxlx=constantFlagMap.lxlx;
        let ddzt=constantFlagMap.ddzt;
        let ddGbzt=constantFlagMap.ddGbzt;
        let place=constantFlagMap.place;
        let constantFlags=lxlx+","+ddzt+","+ddGbzt+","+place;
        zhcxListPage.getConstantMap(constantFlags);
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
        zhcxListPage.setData({constantMap:constantMap});
        zhcxListPage.getDdztSelectData();
      }
    })
  },
  showPageView:function(flag){
    if(flag){
      zhcxListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      zhcxListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      zhcxListPage.setData({showToolBarView:true});
    }
    else{
      zhcxListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      zhcxListPage.setData({showNoDataView:true});
    }
    else{
      zhcxListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="ddh_inp"){
      let ddh=e.detail.value;
      zhcxListPage.setData({ddh:ddh});
    }
    else if(e.currentTarget.id=="yssMc_inp"){
      let yssMc=e.detail.value;
      zhcxListPage.setData({yssMc:yssMc});
    }
    else if(e.currentTarget.id=="wzMc_inp"){
      let wzMc=e.detail.value;
      zhcxListPage.setData({wzMc:wzMc});
    }
    else if(e.currentTarget.id=="fhdwMc_inp"){
      let fhdwMc=e.detail.value;
      zhcxListPage.setData({fhdwMc:fhdwMc});
    }
    else if(e.currentTarget.id=="shdwMc_inp"){
      let shdwMc=e.detail.value;
      zhcxListPage.setData({shdwMc:shdwMc});
    }
    else if(e.currentTarget.id=="cysjXm_inp"){
      let cysjXm=e.detail.value;
      zhcxListPage.setData({cysjXm:cysjXm});
    }
    else if(e.currentTarget.id=="cysjSfzh_inp"){
      let cysjSfzh=e.detail.value;
      zhcxListPage.setData({cysjSfzh:cysjSfzh});
    }
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=zhcxListPage.data.prePageFlag;
    let nextPageFlag=zhcxListPage.data.nextPageFlag;
    let currentPage=zhcxListPage.data.currentPage;
    let pageCount=zhcxListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      zhcxListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      zhcxListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    zhcxListPage.setData({currentPage:currentPage});
    zhcxListPage.getListData();
  },
  getListData:function(){
    let currentPage=zhcxListPage.data.currentPage;
    let pageSize=zhcxListPage.data.pageSize;
    let ddh=zhcxListPage.data.ddh;
    let ddztId=zhcxListPage.data.ddztSelectId;
    let cyclCph=zhcxListPage.data.cyclCph;
    let jhysrq=zhcxListPage.data.jhysrq;
    let yssMc=zhcxListPage.data.yssMc;
    let wzMc=zhcxListPage.data.wzMc;
    let fhdwMc=zhcxListPage.data.fhdwMc;
    let shdwMc=zhcxListPage.data.shdwMc;
    let cysjXm=zhcxListPage.data.cysjXm;
    let cysjSfzh=zhcxListPage.data.cysjSfzh;

    let jcksrq=zhcxListPage.data.jcksrq;
    let jckssj=zhcxListPage.data.jckssj;
    let jcsjs="";
    if(jcksrq!=""&jckssj!="")
      jcsjs=jcksrq+" "+jckssj;

    let jcjsrq=zhcxListPage.data.jcjsrq;
    let jcjssj=zhcxListPage.data.jcjssj;
    let jcsje="";
    if(jcjsrq!=""&jcjssj!="")
      jcsje=jcjsrq+" "+jcjssj;

    let ccksrq=zhcxListPage.data.ccksrq;
    let cckssj=zhcxListPage.data.cckssj;
    let ccsjs="";
    if(ccksrq!=""&cckssj!="")
      ccsjs=ccksrq+" "+cckssj;

    let ccjsrq=zhcxListPage.data.ccjsrq;
    let ccjssj=zhcxListPage.data.ccjssj;
    let ccsje="";
    if(ccjsrq!=""&ccjssj!="")
      ccsje=ccjsrq+" "+ccjssj;

    console.log("ddh==="+ddh)
    console.log("ddztId==="+ddztId)
    console.log("cyclCph==="+cyclCph)
    console.log("jhysrq==="+jhysrq)
    console.log("yssMc==="+yssMc)
    console.log("wzMc==="+wzMc)
    console.log("fhdwMc==="+fhdwMc)
    console.log("shdwMc==="+shdwMc)
    console.log("cysjXm==="+cysjXm)
    console.log("cysjSfzh==="+cysjSfzh)
    console.log("jcsjs==="+jcsjs)
    console.log("jcsje==="+jcsje)
    console.log("ccsjs==="+ccsjs)
    console.log("ccsje==="+ccsje)
    
    wx.request({
      url: rootIP+"getDDZHCXList",
      data:{page:currentPage,rows:pageSize,ddh:ddh,ddztId:ddztId,cyclCph:cyclCph,jhysrq:jhysrq,wzMc:wzMc,yssMc:yssMc,fhdwMc:fhdwMc,shdwMc:shdwMc,cysjXm:cysjXm,cysjSfzh:cysjSfzh,jcsjs:jcsjs,jcsje:jcsje,ccsjs:ccsjs,ccsje:ccsje},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        zhcxListPage.setData({ddList:[]});
        if(status=="ok"){
          var ddList=data.list;
          for(let i=0;i<ddList.length;i++){
            let dsh=ddList[i];
            let lxlx=dsh.lxlx;
            let lxlxMc=zhcxListPage.getLxlxMcById(lxlx);
            dsh.lxlxMc=lxlxMc;

            let yjzt=dsh.yjzt;
            let yjztMc=zhcxListPage.getGbztMcById(yjzt);
            dsh.yjztMc=yjztMc;

            let ejzt=dsh.ejzt;
            let ejztMc=zhcxListPage.getGbztMcById(ejzt);
            dsh.ejztMc=ejztMc;

            let yjbfh=dsh.yjbfh;
            let yjbfMc=zhcxListPage.getBfMcByBfh(yjbfh);
            dsh.yjbfMc=yjbfMc;

            let ejbfh=dsh.ejbfh;
            let ejbfMc=zhcxListPage.getBfMcByBfh(ejbfh);
            dsh.ejbfMc=ejbfMc;
          }
          zhcxListPage.setData({ddList:ddList});
          zhcxListPage.showNoDataView(false);
          zhcxListPage.setData({noDataText:""});
        }
        else{
          zhcxListPage.showNoDataView(true);
          zhcxListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        zhcxListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        zhcxListPage.showToolBarView(e);
      }
    })
  },
  getLxlxMcById:function(lxlxId){
    let constantMap=zhcxListPage.data.constantMap;
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
    let constantMap=zhcxListPage.data.constantMap;
    let ddGbztMap=constantMap.ddGbztMap;
    //console.log(ddGbztMap);
    var str;
    switch (gbztId) {
      case ddGbztMap.dsbGbzt:
        str=ddGbztMap.dsbGbztMc;//待上磅
        break;
      case ddGbztMap.sbzGbzt:
        str=ddGbztMap.sbzGbztMc;//上磅中
        break;
      case ddGbztMap.dczGbzt:
        str=ddGbztMap.dczGbztMc;//待称重
        break;
      case ddGbztMap.czzGbzt:
        str=ddGbztMap.czzGbztMc;//称重中
        break;
      case ddGbztMap.dxbGbzt:
        str=ddGbztMap.dxbGbztMc;//待下磅
        break;
      case ddGbztMap.xbzGbzt:
        str=ddGbztMap.xbzGbztMc;//下磅中
        break;
      case ddGbztMap.ywcGbzt:
        str=ddGbztMap.ywcGbztMc;//已完成
        break;
    }
    return str;
  },
  getBfMcByBfh:function(bfh){
    let constantMap=zhcxListPage.data.constantMap;
    let placeMap=constantMap.placeMap;
    //console.log(placeMap);
    var str;
    switch (bfh) {
      case placeMap.wgb:
        str=placeMap.wgbMc;
        break;
      case placeMap.yhbf:
        str=placeMap.yhbfMc;
        break;
      case placeMap.ehbf:
        str=placeMap.ehbfMc;
        break;
      case placeMap.shbf:
        str=placeMap.shbfMc;
        break;
    }
    return str;
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
        zhcxListPage.setData({ddztList:ddztList});
        zhcxListPage.getListData();
      }
    })
  },
  // 点击下拉显示框
  showDdztOption() {
    zhcxListPage.setData({
      showDdztOption: !zhcxListPage.data.showDdztOption,
    });
  },
  // 点击下拉列表
  selectDdztOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let ddztList=zhcxListPage.data.ddztList;
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
    zhcxListPage.setData({jhysrq:value});
  },
  pickerJcksrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    zhcxListPage.setData({jcksrq:value});
  },
  pickerJckssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    zhcxListPage.setData({jckssj:value});
  },
  pickerJcjsrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    zhcxListPage.setData({jcjsrq:value});
  },
  pickerJcjssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    zhcxListPage.setData({jcjssj:value});
  },
  pickerCcksrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    zhcxListPage.setData({ccksrq:value});
  },
  pickerCcjsrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    zhcxListPage.setData({ccjsrq:value});
  },
  pickerCcjssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    zhcxListPage.setData({ccjssj:value});
  },
  pickerJhysrqCancel:function(){
    zhcxListPage.setData({jhysrq:''});
  },
  pickerJcksrqCancel:function(){
    zhcxListPage.setData({jcksrq:''});
  },
  pickerJckssjCancel:function(){
    zhcxListPage.setData({jckssj:''});
  },
  pickerJcjsrqCancel:function(){
    zhcxListPage.setData({jcjsrq:''});
  },
  pickerJcjssjCancel:function(){
    zhcxListPage.setData({jcjssj:''});
  },
  pickerCcksrqCancel:function(){
    zhcxListPage.setData({ccksrq:''});
  },
  pickerCcjsrqCancel:function(){
    zhcxListPage.setData({ccjsrq:''});
  },
  pickerCcjssjCancel:function(){
    zhcxListPage.setData({ccjssj:''});
  },
  /*
  onPickerJcsjChange: function (e) {
    console.log("dateString==="+e.detail.dateString)
    zhcxListPage.setData({
      jcsj:e.detail.dateString  //选中的数据
    })
  },
  onPickerCcsjChange: function (e) {
    console.log("dateString==="+e.detail.dateString)
    zhcxListPage.setData({
      ccsj:e.detail.dateString  //选中的数据
    })
  },
  */
  toDouble: function (num) {
    if (num >= 10) {//大于10
      return num;
    } 
    else {//0-9
      return '0' + num
    }
  },
  getToday: function () {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year + '-' + this.toDouble(month) + '-' + this.toDouble(day)
  },
  goAddPage:function(){
    wx.redirectTo({
      url: '/pages/ddgl/zhcx/new',
    })
  },
  goEditPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/ddgl/zhcx/edit?id='+id,
    })
  },
  goDetailPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/ddgl/zhcx/detail?id='+id,
    })
  }
})