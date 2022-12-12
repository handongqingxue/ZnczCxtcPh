// pages/ddgl/zhcx/list.js
var zhcxListPage;
var rootIP;
var lxlxMap;
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
    wzMc:"",
    yssMc:"",
    fhdwMc:"",
    shdwMc:"",
    prePageFlag:1,
    nextPageFlag:2,
    prePageEnable:false,
    nextPageEnable:true,
    showDdztOption:false,
    
    date: '2019-01-01 13:37',
     startDate: '2019-01-01 12:37',
     endDate: '2029-03-12 12:38',
     placeholder: '请选择时间'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    zhcxListPage=this;
    rootIP=getApp().getRootIP();

    let dayTime= this.getToday();
    let dayHour = "18:00";
    let endedTime1 = dayTime + " " + dayHour;
    this.setData({
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
        let constantFlags=lxlx+","+ddzt;
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
    else if(e.currentTarget.id=="wzMc_inp"){
      let wzMc=e.detail.value;
      zhcxListPage.setData({wzMc:wzMc});
    }
    else if(e.currentTarget.id=="yssMc_inp"){
      let yssMc=e.detail.value;
      zhcxListPage.setData({yssMc:yssMc});
    }
    else if(e.currentTarget.id=="fhdwMc_inp"){
      let fhdwMc=e.detail.value;
      zhcxListPage.setData({fhdwMc:fhdwMc});
    }
    else if(e.currentTarget.id=="shdwMc_inp"){
      let shdwMc=e.detail.value;
      zhcxListPage.setData({shdwMc:shdwMc});
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
    let wzMc=zhcxListPage.data.wzMc;
    let yssMc=zhcxListPage.data.yssMc;
    let fhdwMc=zhcxListPage.data.fhdwMc;
    let shdwMc=zhcxListPage.data.shdwMc;
    
    wx.request({
      url: rootIP+"getZHCXList",
      data:{page:currentPage,rows:pageSize,ddh:ddh,wzMc:wzMc,yssMc:yssMc,fhdwMc:fhdwMc,shdwMc:shdwMc},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        zhcxListPage.setData({dshList:[]});
        if(status=="ok"){
          var dshList=data.list;
          for(let i=0;i<dshList.length;i++){
            let dsh=dshList[i];
            let lxlx=dsh.lxlx;
            let lxlxMc=zhcxListPage.getLxlxMcById(lxlx);
            dsh.lxlxMc=lxlxMc;
          }
          zhcxListPage.setData({dshList:dshList});
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
    console.log(index)
    this.setData({
      ddztSelectIndex: index,
      showDdztOption: !this.data.showDdztOption
    });
  },
onPickerChange: function (e) {
  console.log("dateString==="+e.detail.dateString)
    this.setData({
      date: e.detail.dateString  //选中的数据
    })
   },
   toDouble: function (num) {
    if (num >= 10) {//大于10
      return num;
    } else {//0-9
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
})