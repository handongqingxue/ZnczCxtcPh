// pages/pdgl/dlcx/list.js
var hmcxListPage;
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
    ztSelectId:"",
    prePageFlag:1,
    nextPageFlag:2,
    prePageEnable:false,
    nextPageEnable:true,
    showZtOption:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    hmcxListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    hmcxListPage.getConstantFlagMap();
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
        //hmcxListPage.setData({constantFlagMap:constantFlagMap});
        let lxlx=constantFlagMap.lxlx;
        let dlZt=constantFlagMap.dlZt;
        let constantFlags=lxlx+","+dlZt;
        hmcxListPage.getConstantMap(constantFlags);
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
        hmcxListPage.setData({constantMap:constantMap});
        hmcxListPage.getZtSelectData();
        hmcxListPage.getListData();
      }
    })
  },
  showPageView:function(flag){
    if(flag){
      hmcxListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      hmcxListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      hmcxListPage.setData({showToolBarView:true});
    }
    else{
      hmcxListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      hmcxListPage.setData({showNoDataView:true});
    }
    else{
      hmcxListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="mc_inp"){
      let mc=e.detail.value;
      hmcxListPage.setData({mc:mc});
    }
    else if(e.currentTarget.id=="dm_inp"){
      let dm=e.detail.value;
      hmcxListPage.setData({dm:dm});
    }
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=hmcxListPage.data.prePageFlag;
    let nextPageFlag=hmcxListPage.data.nextPageFlag;
    let currentPage=hmcxListPage.data.currentPage;
    let pageCount=hmcxListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      hmcxListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      hmcxListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    hmcxListPage.setData({currentPage:currentPage});
    hmcxListPage.getListData();
  },
  getListData:function(){
    let currentPage=hmcxListPage.data.currentPage;
    let pageSize=hmcxListPage.data.pageSize;
    let ddh=hmcxListPage.data.ddh;
    let hmztId=hmcxListPage.data.ztSelectId;
    wx.request({
      url: rootIP+"getDuiLieList",
      data:{page:currentPage,rows:pageSize,ddh:ddh,hmztId:hmztId},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        hmcxListPage.setData({hmList:[]});
        if(status=="ok"){
          var hmList=data.list;
          for(let i=0;i<hmList.length;i++){
            /*
            let hm=hmList[i];
            let fl=hm.fl;
            let flMc=hmcxListPage.getFlMcById(fl);
            hm.flMc=flMc;
            */
          }
          hmcxListPage.setData({hmList:hmList});
          hmcxListPage.showNoDataView(false);
          hmcxListPage.setData({noDataText:""});
        }
        else{
          hmcxListPage.showNoDataView(true);
          hmcxListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        hmcxListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        hmcxListPage.showToolBarView(e);
      }
    })
  },
  getFlMcById:function(flId){
    let constantMap=hmcxListPage.data.constantMap;
    let flMap=constantMap.hmFlMap;
    //console.log(flMap);
    var str;
    switch (flId) {
      case flMap.ptFl:
        str=flMap.ptFlMc;//普通
        break;
      case flMap.qtFl:
        str=flMap.qtFlMc;//其他
        break;
    }
    return str;
  },
  getZtSelectData:function(){
    let ztMap=hmcxListPage.data.constantMap.dlZtMap;
    let ztList=[];
    ztList.push({"value":"","text":"请选择"});
    ztList.push({"value":ztMap.zyZt,"text":ztMap.zyZtMc});
    ztList.push({"value":ztMap.ztZt,"text":ztMap.ztZtMc});
    ztList.push({"value":ztMap.fqZt,"text":ztMap.fqZtMc});
    hmcxListPage.setData({ztList:ztList});
  },
  // 点击下拉显示框
  showZtOption() {
    hmcxListPage.setData({
      showZtOption: !hmcxListPage.data.showZtOption,
    });
  },
  // 点击下拉列表
  selectZtOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let ztList=hmcxListPage.data.ztList;
    let hmzt=ztList[index];
    console.log(index+","+hmzt.value+","+hmzt.text);
    this.setData({
      ztSelectIndex: index,
      ztSelectId: hmzt.value,
      showZtOption: !this.data.showZtOption
    });
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})