// pages/ddgl/shjl/list.js
var shjlListPage;
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
    shlxSelectId:"",
    cyclCph:"",
    shrYhm:"",
    yssMc:"",
    wzMc:"",
    fhdwMc:"",
    shdwMc:"",
    sjXm:"",
    sjSfzh:"",
    prePageFlag:1,
    nextPageFlag:2,
    prePageEnable:false,
    nextPageEnable:true,
    showShlxOption:false,
    shksrq:'',
    shksrqPlaceholder: '请选择开始日期',
    shkssj:'',
    shkssjPlaceholder: '请选择开始时间',
    shjsrq:'',
    shjsrqPlaceholder: '请选择结束日期',
    shjssj:'',
    shjssjPlaceholder: '请选择结束时间',
    shlxList:[{"value":"","text":"请选择"},{"value":1,"text":"下单审核"},{"value":2,"text":"一检审核"},{"value":3,"text":"入库审核"},{"value":4,"text":"二检审核"}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    shjlListPage=this;
    rootIP=getApp().getRootIP();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    shjlListPage.getConstantFlagMap();

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
        let ddShlx=constantFlagMap.ddShlx;
        let ddShjg=constantFlagMap.ddShjg;
        let constantFlags=lxlx+","+ddShlx+","+ddShjg;
        shjlListPage.getConstantMap(constantFlags);
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
        shjlListPage.setData({constantMap:constantMap});
        //shjlListPage.getDdztSelectData();
        shjlListPage.getListData();
      }
    })
  },
  showPageView:function(flag){
    if(flag){
      shjlListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      shjlListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      shjlListPage.setData({showToolBarView:true});
    }
    else{
      shjlListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      shjlListPage.setData({showNoDataView:true});
    }
    else{
      shjlListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="ddh_inp"){
      let ddh=e.detail.value;
      shjlListPage.setData({ddh:ddh});
    }
    else if(e.currentTarget.id=="cyclCph_inp"){
      let cyclCph=e.detail.value;
      shjlListPage.setData({cyclCph:cyclCph});
    }
    else if(e.currentTarget.id=="shrYhm_inp"){
      let shrYhm=e.detail.value;
      shjlListPage.setData({shrYhm:shrYhm});
    }
    else if(e.currentTarget.id=="yssMc_inp"){
      let yssMc=e.detail.value;
      shjlListPage.setData({yssMc:yssMc});
    }
    else if(e.currentTarget.id=="wzMc_inp"){
      let wzMc=e.detail.value;
      shjlListPage.setData({wzMc:wzMc});
    }
    else if(e.currentTarget.id=="fhdwMc_inp"){
      let fhdwMc=e.detail.value;
      shjlListPage.setData({fhdwMc:fhdwMc});
    }
    else if(e.currentTarget.id=="shdwMc_inp"){
      let shdwMc=e.detail.value;
      shjlListPage.setData({shdwMc:shdwMc});
    }
    else if(e.currentTarget.id=="sjXm_inp"){
      let sjXm=e.detail.value;
      shjlListPage.setData({sjXm:sjXm});
    }
    else if(e.currentTarget.id=="sjSfzh_inp"){
      let sjSfzh=e.detail.value;
      shjlListPage.setData({sjSfzh:sjSfzh});
    }
  },
  resetToolBarData:function(){
    shjlListPage.setData({ddh:"",shjlSelectIndex:0,shlxSelectId:"",shksrq:"",shkssj:"",shjsrq:"",shjssj:"",cyclCph:"",shrYhm:"",yssMc:"",wzMc:"",fhdwMc:"",shdwMc:"",sjXm:"",sjSfzh:""});
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=shjlListPage.data.prePageFlag;
    let nextPageFlag=shjlListPage.data.nextPageFlag;
    let currentPage=shjlListPage.data.currentPage;
    let pageCount=shjlListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      shjlListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      shjlListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    shjlListPage.setData({currentPage:currentPage});
    shjlListPage.getListData();
  },
  getListData:function(){
    let currentPage=shjlListPage.data.currentPage;
    let pageSize=shjlListPage.data.pageSize;
    let ddh=shjlListPage.data.ddh;
    let shlx=shjlListPage.data.shlxSelectId;
    let shksrq=shjlListPage.data.shksrq;
    let shkssj=shjlListPage.data.shkssj;
    let shsjks="";
    if(shksrq!=""&shkssj!="")
      shsjks=shksrq+" "+shkssj;
    let shjsrq=shjlListPage.data.shjsrq;
    let shjssj=shjlListPage.data.shjssj;
    let shsjjs="";
    if(shjsrq!=""&shjssj!="")
      shsjjs=shjsrq+" "+shjssj;
    var cyclCph=shjlListPage.data.cyclCph;
    var shrYhm=shjlListPage.data.shrYhm;
    var yssMc=shjlListPage.data.yssMc;
    var wzMc=shjlListPage.data.wzMc;
    var fhdwMc=shjlListPage.data.fhdwMc;
    var shdwMc=shjlListPage.data.shdwMc;
    var sjXm=shjlListPage.data.sjXm;
    var sjSfzh=shjlListPage.data.sjSfzh;
    console.log("ddh==="+ddh)
    console.log("shlx==="+shlx)
    console.log("shsjks==="+shsjks)
    console.log("shsjjs==="+shsjjs)
    console.log("cyclCph==="+cyclCph)
    console.log("shrYhm==="+shrYhm)
    console.log("yssMc==="+yssMc)
    console.log("wzMc==="+wzMc)
    console.log("fhdwMc==="+fhdwMc)
    console.log("shdwMc==="+shdwMc)
    console.log("sjXm==="+sjXm)
    console.log("sjSfzh==="+sjSfzh)
    
    wx.request({
      url: rootIP+"getDDSHJLList",
      data:{page:currentPage,rows:pageSize,ddh:ddh,shlx:shlx,shsjks:shsjks,shsjjs:shsjjs,cyclCph:cyclCph,shrYhm:shrYhm,yssMc:yssMc,wzMc:wzMc,fhdwMc:fhdwMc,shdwMc:shdwMc,sjXm:sjXm,sjSfzh:sjSfzh},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        shjlListPage.setData({shjlList:[]});
        if(status=="ok"){
          var shjlList=data.list;
          for(let i=0;i<shjlList.length;i++){
            let shjl=shjlList[i];
            let shlx=shjl.shlx;
            let shlxMc=shjlListPage.getShlxMcById(shlx);
            shjl.shlxMc=shlxMc;

            let shjg=shjl.shjg;
            let shjgMc=shjlListPage.getShjgMcByJg(shjg);
            shjl.shjgMc=shjgMc;

            let lxlx=shjl.lxlx;
            let lxlxMc=shjlListPage.getLxlxMcById(lxlx);
            shjl.lxlxMc=lxlxMc;
          }
          shjlListPage.setData({shjlList:shjlList});
          shjlListPage.showNoDataView(false);
          shjlListPage.setData({noDataText:""});
        }
        else{
          shjlListPage.showNoDataView(true);
          shjlListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        shjlListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        shjlListPage.showToolBarView(e);
      }
    })
  },
  getShlxMcById:function(shlxId){
    let constantMap=shjlListPage.data.constantMap;
    let shlxMap=constantMap.ddShlxMap;
    //console.log(shlxMap);
    var str;
    switch (shlxId) {
    case shlxMap.xdshShlx:
      str=shlxMap.xdshShlxMc;//下单审核
      break;
    case shlxMap.zjshShlx:
      str=shlxMap.zjshShlxMc;//质检审核
      break;
    case shlxMap.yjshShlx:
      str=shlxMap.yjshShlxMc;//一检审核
      break;
    case shlxMap.rkshShlx:
      str=shlxMap.rkshShlxMc;//入库审核
      break;
    case shlxMap.ejshShlx:
      str=shlxMap.ejshShlxMc;//二检审核
      break;
    }
    return str;
  },
  getShjgMcByJg:function(shjg){
    let constantMap=shjlListPage.data.constantMap;
    let shjgMap=constantMap.ddShjgMap;
    //console.log(shjgMap);
    var str;
    if(shjg)
      str=shjgMap.hgShjgMc;//合格
    else
      str=shjgMap.bhgShjgMc;//不合格
    return str;
  },
  getLxlxMcById:function(lxlxId){
    let constantMap=shjlListPage.data.constantMap;
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
  // 点击下拉显示框
  showShlxOption:function() {
    shjlListPage.setData({
      showShlxOption: !shjlListPage.data.showShlxOption,
    });
  },
  // 点击下拉列表
  selectShlxOption:function(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let shlxList=shjlListPage.data.shlxList;
    let shlx=shlxList[index];
    console.log(index+","+shlx.value+","+shlx.text);
    shjlListPage.setData({
      shjlSelectIndex: index,
      shlxSelectId: shlx.value,
      showShlxOption: !shjlListPage.data.showShlxOption
    });
  },
  pickerShksrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    shjlListPage.setData({shksrq:value});
  },
  pickerShkssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    shjlListPage.setData({shkssj:value});
  },
  pickerShjsrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    shjlListPage.setData({shjsrq:value});
  },
  pickerShjssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    shjlListPage.setData({shjssj:value});
  },
  pickerShksrqCancel:function(){
    shjlListPage.setData({shksrq:''});
  },
  pickerShkssjCancel:function(){
    shjlListPage.setData({shkssj:''});
  },
  pickerShjsrqCancel:function(){
    shjlListPage.setData({shjsrq:''});
  },
  pickerShjssjCancel:function(){
    shjlListPage.setData({shjssj:''});
  },
  deleteById:function(e){
    let confirmStr="确定要删除吗？";
    wx.showModal({
      title: "提示",
      content: confirmStr,
      success (res) {
        if (res.confirm) {
          //console.log('用户点击确定')
          let id=e.currentTarget.dataset.id;
          wx.request({
            url: rootIP+"deleteShenHeJiLu",
            data:{ids:id},
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
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})