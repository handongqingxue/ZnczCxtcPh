// pages/sjgl/zhcx/list.js
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
    xm:"",
    sjh:"",
    sfzh:"",
    zyztSelectId:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    zhcxListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    zhcxListPage.getConstantFlagMap();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

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
        let sjShzt=constantFlagMap.sjShzt;
        let sjZyzt=constantFlagMap.sjZyzt;
        let constantFlags=sjShzt+","+sjZyzt;
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
        zhcxListPage.initZyztSelectData();
        zhcxListPage.initShztSelectData();
        zhcxListPage.getListData();
      }
    })
  },
  initZyztSelectData:function(){
    let sjZyztMap=zhcxListPage.data.constantMap.sjZyztMap;
    let zyztList=[];
    zyztList.push({"value":"","text":"请选择"});
    zyztList.push({"value":sjZyztMap.shiZyzt,"text":sjZyztMap.shiZyztMc});
    zyztList.push({"value":sjZyztMap.fouZyzt,"text":sjZyztMap.fouZyztMc});
    zhcxListPage.setData({zyztList:zyztList});
  },
  initShztSelectData:function(){
    let sjShztMap=zhcxListPage.data.constantMap.sjShztMap;
    let shztList=[];
    shztList.push({"value":"","text":"请选择"});
    shztList.push({"value":sjShztMap.dshShzt,"text":sjShztMap.dshShztMc});
    shztList.push({"value":sjShztMap.shtgShzt,"text":sjShztMap.shtgShztMc});
    shztList.push({"value":sjShztMap.bjzShzt,"text":sjShztMap.bjzShztMc});
    zhcxListPage.setData({shztList:shztList});
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
    if(e.currentTarget.id=="xm_inp"){
      let xm=e.detail.value;
      zhcxListPage.setData({xm:xm});
    }
    else if(e.currentTarget.id=="sjh_inp"){
      let sjh=e.detail.value;
      zhcxListPage.setData({sjh:sjh});
    }
    else if(e.currentTarget.id=="sfzh_inp"){
      let sfzh=e.detail.value;
      zhcxListPage.setData({sfzh:sfzh});
    }
  },
  resetToolBarData:function(){
    zhcxListPage.setData({xm:"",sjh:"",sfzh:"",zyztSelectIndex:0,zyztSelectId:""});
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
    let xm=zhcxListPage.data.xm;
    let sjh=zhcxListPage.data.sjh;
    let sfzh=zhcxListPage.data.sfzh;
    let zyzt=zhcxListPage.data.zyztSelectId;

    console.log("xm==="+xm)
    console.log("sjh==="+sjh)
    console.log("sfzh==="+sfzh)
    console.log("zyzt==="+zyzt)
    if(zyzt!='')
      zyzt=zyzt?1:0;

    wx.request({
      url: rootIP+"getSiJiList",
      data:{page:currentPage,rows:pageSize,xm:xm,sjh:sjh,sfzh:sfzh,zyzt:zyzt},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        zhcxListPage.setData({sjList:[]});
        if(status=="ok"){
          var sjList=data.list;
          for(let i=0;i<sjList.length;i++){
            let sj=sjList[i];
            let shzt=sj.shzt;
            let shztMc=zhcxListPage.getShztMcById(shzt);
            sj.shztMc=shztMc;

            let zyzt=sj.zyzt;
            let zyztMc=zhcxListPage.getZyztMcById(zyzt);
            sj.zyztMc=zyztMc;
          }
          zhcxListPage.setData({sjList:sjList});
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
  getShztMcById:function(shztId){
    let constantMap=zhcxListPage.data.constantMap;
    let shztMap=constantMap.sjShztMap;
    //console.log(shztMap);
    var str;
    switch (shztId) {
    case shztMap.dshShzt:
      str=shztMap.dshShztMc;//待审核
      break;
    case shztMap.shtgShzt:
      str=shztMap.shtgShztMc;//审核通过
      break;
    case shztMap.bjzShzt:
      str=shztMap.bjzShztMc;//编辑中
      break;
    }
    return str;
  },
  getZyztMcById:function(zyzt){
    let constantMap=zhcxListPage.data.constantMap;
    let zyztMap=constantMap.sjZyztMap;
    //console.log(zyztMap);
    var str;
    if(zyzt)
      str=zyztMap.shiZyztMc;
    else
      str=zyztMap.fouZyztMc;
    return str;
  },
  // 点击下拉显示框
  showZyztOption() {
    zhcxListPage.setData({
      showZyztOption: !zhcxListPage.data.showZyztOption,
    });
  },
  // 点击下拉列表
  selectZyztOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let zyztList=zhcxListPage.data.zyztList;
    let zyzt=zyztList[index];
    console.log(index+","+zyzt.value+","+zyzt.text);
    this.setData({
      zyztSelectIndex: index,
      zyztSelectId: zyzt.value,
      showZyztOption: !this.data.showZyztOption
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
            url: rootIP+"deleteSiJi",
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
      url: '/pages/sjgl/zhcx/new',
    })
  },
  goEditPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/sjgl/zhcx/edit?id='+id,
    })
  },
  goDetailPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/sjgl/zhcx/detail?id='+id,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})