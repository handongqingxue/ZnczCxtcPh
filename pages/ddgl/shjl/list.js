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
    prePageFlag:1,
    nextPageFlag:2,
    prePageEnable:false,
    nextPageEnable:true,
    showShlxOption:false,
    pickerStartTime: '1970-01-01 12:37',
    pickerEndTime: '2099-12-31 12:38',
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
    
    wx.request({
      url: rootIP+"getDDSHJLList",
      //data:{page:currentPage,rows:pageSize,ddh:ddh,ddztId:ddztId,cyclCph:cyclCph,jhysrq:jhysrq,wzMc:wzMc,yssMc:yssMc,fhdwMc:fhdwMc,shdwMc:shdwMc,cysjXm:cysjXm,cysjSfzh:cysjSfzh},
      data:{page:currentPage,rows:pageSize},
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
})