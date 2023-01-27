// pages/pdgl/hmcx/list.js
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
    hmztSelectId:"",
    prePageFlag:1,
    nextPageFlag:2,
    prePageEnable:false,
    nextPageEnable:true,
    showHmztOption:false,
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
        let hmzt=constantFlagMap.hmzt;
        let hmFl=constantFlagMap.hmFl;
        let constantFlags=lxlx+","+hmzt+","+hmFl;
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
        hmcxListPage.getHmztSelectData();
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
    if(e.currentTarget.id=="dlMc_inp"){
      let dlMc=e.detail.value;
      hmcxListPage.setData({dlMc:dlMc});
    }
    else if(e.currentTarget.id=="hm_inp"){
      let hm=e.detail.value;
      hmcxListPage.setData({hm:hm});
    }
    else if(e.currentTarget.id=="pdh_inp"){
      let pdh=e.detail.value;
      hmcxListPage.setData({pdh:pdh});
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
    let hmztId=hmcxListPage.data.hmztSelectId;
    wx.request({
      url: rootIP+"getHaoMaList",
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
            let hm=hmList[i];
            let fl=hm.fl;
            let flMc=hmcxListPage.getFlMcById(fl);
            hm.flMc=flMc;
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
  getHmztSelectData:function(){
    wx.request({
      url: rootIP+"getHaoMaZhuangTaiSelectList",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let hmztList=res.data.list;
        //console.log(hmztList);
        hmcxListPage.setData({hmztList:hmztList});
        hmcxListPage.getListData();
      }
    })
  },
  // 点击下拉显示框
  showHmztOption() {
    hmcxListPage.setData({
      showHmztOption: !hmcxListPage.data.showHmztOption,
    });
  },
  // 点击下拉列表
  selectHmztOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let hmztList=hmcxListPage.data.hmztList;
    let hmzt=hmztList[index];
    console.log(index+","+hmzt.id+","+hmzt.mc);
    this.setData({
      hmztSelectIndex: index,
      hmztSelectId: hmzt.id,
      showHmztOption: !this.data.showHmztOption
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
            url: rootIP+"deleteHaoMa",
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