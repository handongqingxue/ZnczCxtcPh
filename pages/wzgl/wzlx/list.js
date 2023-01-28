// pages/wzgl/wzlx/list.js
var wzlxListPage;
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
    prePageFlag:1,
    nextPageFlag:2,
    prePageEnable:false,
    nextPageEnable:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wzlxListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wzlxListPage.getListData();
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
      wzlxListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      wzlxListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      wzlxListPage.setData({showToolBarView:true});
    }
    else{
      wzlxListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      wzlxListPage.setData({showNoDataView:true});
    }
    else{
      wzlxListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="mc_inp"){
      let mc=e.detail.value;
      wzlxListPage.setData({mc:mc});
    }
  },
  resetToolBarData:function(){
    wzlxListPage.setData({mc:""});
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=wzlxListPage.data.prePageFlag;
    let nextPageFlag=wzlxListPage.data.nextPageFlag;
    let currentPage=wzlxListPage.data.currentPage;
    let pageCount=wzlxListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      wzlxListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      wzlxListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    wzlxListPage.setData({currentPage:currentPage});
    wzlxListPage.getListData();
  },
  getListData:function(){
    let currentPage=wzlxListPage.data.currentPage;
    let pageSize=wzlxListPage.data.pageSize;
    let mc=wzlxListPage.data.mc;
    wx.request({
      url: rootIP+"getWZLXList",
      data:{page:currentPage,rows:pageSize,mc:mc},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        wzlxListPage.setData({wzlxList:[]});
        if(status=="ok"){
          var wzlxList=data.list;
          wzlxListPage.setData({wzlxList:wzlxList});
          wzlxListPage.showNoDataView(false);
          wzlxListPage.setData({noDataText:""});
        }
        else{
          wzlxListPage.showNoDataView(true);
          wzlxListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        wzlxListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        wzlxListPage.showToolBarView(e);
      }
    })
  },
  checkIfExistWuZiByLxId:function(e){
    let confirmStr="确定要删除吗？";
    wx.showModal({
      title: "提示",
      content: confirmStr,
      success (res) {
        if (res.confirm) {
          //console.log('用户点击确定')
          let id=e.currentTarget.dataset.id;
          let mc=e.currentTarget.dataset.mc;
          wx.request({
            url: rootIP+"checkIfExistWuZiByLxIds",
            data:{lxIds:id,lxMcs:mc},
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
                let delIds="";
                let idArr=ids.split(",");
                let wzlxList=result.data;
                for (let i = 0; i < idArr.length; i++){
                  let id=idArr[i];
                  if(!checkWzlxIdInList(id,wzlxList)){//若不存在，则说明该类型下没有物资，就得删除掉
                    delIds+=","+id;
                  }
                }
                delIds=delIds.substring(1);
                if(delIds!="")//若有没有物资的物资类型id，则删除
                  deleteByIds(delIds);
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
  deleteByIds:function(ids){
    $.post(rootIP + "deleteWuZiLeiXing",
      {ids:ids},
      function(result){
        if(result.status==1){
          wx.showToast({
            title: result.msg,
          })
        }
        else{
          wx.showToast({
            title: result.msg,
          })
        }
      }
    ,"json");
  },
  //验证物资类型id是否存在于集合里
  checkWzlxIdInList:function(wzlxId,wzlxList){
    let flag=false;
    for (let i = 0; i < wzlxList.length; i++){
      if(wzlxId==wzlxList[i].id){
        flag=true;
        break;
      }
    }
    return flag;
  },
  goAddPage:function(){
    wx.redirectTo({
      url: '/pages/wzgl/wzlx/new',
    })
  },
  goEditPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/wzgl/wzlx/edit?id='+id,
    })
  },
  goDetailPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/wzgl/wzlx/detail?id='+id,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})