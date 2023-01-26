// pages/dwgl/shdw/list.js
var shdwListPage;
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
    ywdlList:[{"value":"","text":"请选择"},{"value":"1","text":"有"},{"value":"0","text":"无"}],
    mc:"",
    ywdlSelectId:"",
    prePageFlag:1,
    nextPageFlag:2,
    prePageEnable:false,
    nextPageEnable:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    shdwListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    shdwListPage.getListData();
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
      shdwListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      shdwListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      shdwListPage.setData({showToolBarView:true});
    }
    else{
      shdwListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      shdwListPage.setData({showNoDataView:true});
    }
    else{
      shdwListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="mc_inp"){
      let mc=e.detail.value;
      shdwListPage.setData({mc:mc});
    }
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=shdwListPage.data.prePageFlag;
    let nextPageFlag=shdwListPage.data.nextPageFlag;
    let currentPage=shdwListPage.data.currentPage;
    let pageCount=shdwListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      shdwListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      shdwListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    shdwListPage.setData({currentPage:currentPage});
    shdwListPage.getListData();
  },
  getListData:function(){
    let currentPage=shdwListPage.data.currentPage;
    let pageSize=shdwListPage.data.pageSize;
    let mc=shdwListPage.data.mc;
    let ywdl=shdwListPage.data.ywdlSelectId;
    console.log("mc==="+mc)
    console.log("ywdl==="+ywdl)
    wx.request({
      url: rootIP+"getShouHuoDanWeiList",
      data:{page:currentPage,rows:pageSize,mc:mc,ywdl:ywdl},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        shdwListPage.setData({shdwList:[]});
        if(status=="ok"){
          var shdwList=data.list;
          for(let i=0;i<shdwList.length;i++){
            let shdw=shdwList[i];
            let ywdl=shdw.ywdl;
            let ywdlMc=ywdl==1?"有":"无";
            shdw.ywdlMc=ywdlMc;
          }
          shdwListPage.setData({shdwList:shdwList});
          shdwListPage.showNoDataView(false);
          shdwListPage.setData({noDataText:""});
        }
        else{
          shdwListPage.showNoDataView(true);
          shdwListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        shdwListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        shdwListPage.showToolBarView(e);
      }
    })
  },
  // 点击下拉显示框
  showYwdlOption() {
    shdwListPage.setData({
      showYwdlOption: !shdwListPage.data.showYwdlOption,
    });
  },
  // 点击下拉列表
  selectYwdlOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let ywdlList=shdwListPage.data.ywdlList;
    let ywdl=ywdlList[index];
    console.log(index+","+ywdl.value+","+ywdl.text);
    this.setData({
      ywdlSelectIndex: index,
      ywdlSelectId: ywdl.value,
      showYwdlOption: !this.data.showYwdlOption
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
            url: rootIP+"deleteShouHuoDanWei",
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
      url: '/pages/dwgl/shdw/new',
    })
  },
  goEditPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/dwgl/shdw/edit?id='+id,
    })
  },
  goDetailPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/dwgl/shdw/detail?id='+id,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})