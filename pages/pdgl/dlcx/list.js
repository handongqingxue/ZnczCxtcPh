// pages/pdgl/dlcx/list.js
var dlcxListPage;
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
    mc:"",
    dm:"",
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
    dlcxListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    dlcxListPage.getConstantFlagMap();
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
        //dlcxListPage.setData({constantFlagMap:constantFlagMap});
        let dlJhxs=constantFlagMap.dlJhxs;
        let dlZt=constantFlagMap.dlZt;
        let constantFlags=dlJhxs+","+dlZt;
        dlcxListPage.getConstantMap(constantFlags);
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
        dlcxListPage.setData({constantMap:constantMap});
        dlcxListPage.getZtSelectData();
        dlcxListPage.getListData();
      }
    })
  },
  showPageView:function(flag){
    if(flag){
      dlcxListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      dlcxListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      dlcxListPage.setData({showToolBarView:true});
    }
    else{
      dlcxListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      dlcxListPage.setData({showNoDataView:true});
    }
    else{
      dlcxListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="mc_inp"){
      let mc=e.detail.value;
      dlcxListPage.setData({mc:mc});
    }
    else if(e.currentTarget.id=="dm_inp"){
      let dm=e.detail.value;
      dlcxListPage.setData({dm:dm});
    }
  },
  resetToolBarData:function(){
    dlcxListPage.setData({mc:"",dm:"",ztSelectIndex:0,ztSelectId:""});
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=dlcxListPage.data.prePageFlag;
    let nextPageFlag=dlcxListPage.data.nextPageFlag;
    let currentPage=dlcxListPage.data.currentPage;
    let pageCount=dlcxListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      dlcxListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      dlcxListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    dlcxListPage.setData({currentPage:currentPage});
    dlcxListPage.getListData();
  },
  getListData:function(){
    let currentPage=dlcxListPage.data.currentPage;
    let pageSize=dlcxListPage.data.pageSize;
    let mc=dlcxListPage.data.mc;
    let dm=dlcxListPage.data.dm;
    let zt=dlcxListPage.data.ztSelectId;
    wx.request({
      url: rootIP+"getDuiLieList",
      data:{page:currentPage,rows:pageSize,mc:mc,dm:dm,zt:zt},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        dlcxListPage.setData({dlList:[]});
        if(status=="ok"){
          var dlList=data.list;
          for(let i=0;i<dlList.length;i++){
            let dl=dlList[i];
            let jhxs=dl.jhxs;
            let jhxsMc=dlcxListPage.getJhxsMcById(jhxs);
            dl.jhxsMc=jhxsMc;

            let zt=dl.zt;
            let ztMc=dlcxListPage.getZtMcById(zt);
            dl.ztMc=ztMc;
          }
          dlcxListPage.setData({dlList:dlList});
          dlcxListPage.showNoDataView(false);
          dlcxListPage.setData({noDataText:""});
        }
        else{
          dlcxListPage.showNoDataView(true);
          dlcxListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        dlcxListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        dlcxListPage.showToolBarView(e);
      }
    })
  },
  getJhxsMcById:function(jhxsId){
    let constantMap=dlcxListPage.data.constantMap;
    let jhxsMap=constantMap.dlJhxsMap;
    //console.log(jhxsMap);
    var str;
    switch (jhxsId) {
      case jhxsMap.zdjhJhxs:
        str=jhxsMap.zdjhJhxsMc;//自动叫号
        break;
      case jhxsMap.sdjhJhxs:
        str=jhxsMap.sdjhJhxsMc;//手动叫号
        break;
    }
    return str;
  },
  getZtMcById:function(ztId){
    let constantMap=dlcxListPage.data.constantMap;
    let ztMap=constantMap.dlZtMap;
    //console.log(ztMap);
    var str;
    switch (ztId) {
      case ztMap.zyZt:
        str=ztMap.zyZtMc;//在用
        break;
      case ztMap.ztZt:
        str=ztMap.ztZtMc;//暂停
        break;
      case ztMap.fqZt:
        str=ztMap.fqZtMc;//废弃
        break;
    }
    return str;
  },
  getZtSelectData:function(){
    let ztMap=dlcxListPage.data.constantMap.dlZtMap;
    let ztList=[];
    ztList.push({"value":"","text":"请选择"});
    ztList.push({"value":ztMap.zyZt,"text":ztMap.zyZtMc});
    ztList.push({"value":ztMap.ztZt,"text":ztMap.ztZtMc});
    ztList.push({"value":ztMap.fqZt,"text":ztMap.fqZtMc});
    dlcxListPage.setData({ztList:ztList});
  },
  // 点击下拉显示框
  showZtOption() {
    dlcxListPage.setData({
      showZtOption: !dlcxListPage.data.showZtOption,
    });
  },
  // 点击下拉列表
  selectZtOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let ztList=dlcxListPage.data.ztList;
    let hmzt=ztList[index];
    console.log(index+","+hmzt.value+","+hmzt.text);
    this.setData({
      ztSelectIndex: index,
      ztSelectId: hmzt.value,
      showZtOption: !this.data.showZtOption
    });
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
            url: rootIP+"deleteDuiLie",
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
  goAddPage:function(){
    wx.redirectTo({
      url: '/pages/pdgl/dlcx/new',
    })
  },
  goEditPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/pdgl/dlcx/edit?id='+id,
    })
  },
  goDetailPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/pdgl/dlcx/detail?id='+id,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})