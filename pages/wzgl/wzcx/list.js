// pages/wzgl/wzcx/list.js
var wzcxListPage;
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
    wzlxmc:"",
    prePageFlag:1,
    nextPageFlag:2,
    prePageEnable:false,
    nextPageEnable:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wzcxListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wzcxListPage.getListData();
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
      wzcxListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      wzcxListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      wzcxListPage.setData({showToolBarView:true});
    }
    else{
      wzcxListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      wzcxListPage.setData({showNoDataView:true});
    }
    else{
      wzcxListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="mc_inp"){
      let mc=e.detail.value;
      wzcxListPage.setData({mc:mc});
    }
    else if(e.currentTarget.id=="wzlxmc_inp"){
      let wzlxmc=e.detail.value;
      wzcxListPage.setData({wzlxmc:wzlxmc});
    }
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=wzcxListPage.data.prePageFlag;
    let nextPageFlag=wzcxListPage.data.nextPageFlag;
    let currentPage=wzcxListPage.data.currentPage;
    let pageCount=wzcxListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      wzcxListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      wzcxListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    wzcxListPage.setData({currentPage:currentPage});
    wzcxListPage.getListData();
  },
  getListData:function(){
    let currentPage=wzcxListPage.data.currentPage;
    let pageSize=wzcxListPage.data.pageSize;
    let mc=wzcxListPage.data.mc;
    let wzlxmc=wzcxListPage.data.wzlxmc;
    wx.request({
      url: rootIP+"getWuZiList",
      data:{page:currentPage,rows:pageSize,mc:mc,wzlxmc:wzlxmc},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        wzcxListPage.setData({wzList:[]});
        if(status=="ok"){
          var wzList=data.list;
          wzcxListPage.setData({wzList:wzList});
          wzcxListPage.showNoDataView(false);
          wzcxListPage.setData({noDataText:""});
        }
        else{
          wzcxListPage.showNoDataView(true);
          wzcxListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        wzcxListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        wzcxListPage.showToolBarView(e);
      }
    })
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
            url: rootIP+"deleteWuZi",
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
      url: '/pages/wzgl/wzcx/new',
    })
  },
  goEditPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/wzgl/wzcx/edit?id='+id,
    })
  },
  goDetailPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/wzgl/wzcx/detail?id='+id,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})