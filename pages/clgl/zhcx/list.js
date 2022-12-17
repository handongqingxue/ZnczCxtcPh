// pages/clgl/zhcx/list.js
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
    cph:"",
    bz:"",
    cllxSelectId:"",
    sfzySelectId:"",
    shztSelectId:"",
    cllxList:[{"value":"","text":"请选择车辆类型"},{"value":"1","text":"重型"}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    zhcxListPage=this;
    rootIP=getApp().getRootIP();
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
        let clShzt=constantFlagMap.clShzt;
        let clPfjd=constantFlagMap.clPfjd;
        let clSfzy=constantFlagMap.clSfzy;
        let constantFlags=clShzt+","+clPfjd+","+clSfzy;
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
        zhcxListPage.initSfzySelectData();
        zhcxListPage.initShztSelectData();
        zhcxListPage.getListData();
      }
    })
  },
  initSfzySelectData:function(){
    let clSfzyMap=zhcxListPage.data.constantMap.clSfzyMap;
    let sfzyList=[];
    sfzyList.push({"value":"","text":"请选择"});
    sfzyList.push({"value":clSfzyMap.shiSfzy,"text":clSfzyMap.shiSfzyMc});
    sfzyList.push({"value":clSfzyMap.fouSfzy,"text":clSfzyMap.fouSfzyMc});
    zhcxListPage.setData({sfzyList:sfzyList});
  },
  initShztSelectData:function(){
    let clShztMap=zhcxListPage.data.constantMap.clShztMap;
    let shztList=[];
    shztList.push({"value":"","text":"请选择"});
    shztList.push({"value":clShztMap.dshShzt,"text":clShztMap.dshShztMc});
    shztList.push({"value":clShztMap.shtgShzt,"text":clShztMap.shtgShztMc});
    shztList.push({"value":clShztMap.bjzShzt,"text":clShztMap.bjzShztMc});
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
    if(e.currentTarget.id=="cph_inp"){
      let cph=e.detail.value;
      zhcxListPage.setData({cph:cph});
    }
    else if(e.currentTarget.id=="bz_inp"){
      let bz=e.detail.value;
      zhcxListPage.setData({bz:bz});
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
    let cph=zhcxListPage.data.cph;
    let cllx=zhcxListPage.data.cllxSelectId;
    let sfzy=zhcxListPage.data.sfzySelectId;
    let shzt=zhcxListPage.data.shztSelectId;
    let bz=zhcxListPage.data.bz;

    console.log("cph==="+cph)
    console.log("cllx==="+cllx)
    console.log("sfzy==="+sfzy)
    console.log("shzt==="+shzt)
    console.log("bz==="+bz)

    wx.request({
      url: rootIP+"getCheLiangList",
      data:{page:currentPage,rows:pageSize,cph:cph,cllx:cllx,sfzy:sfzy,shzt:shzt,bz:bz},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        zhcxListPage.setData({ddList:[]});
        if(status=="ok"){
          var ddList=data.list;
          for(let i=0;i<ddList.length;i++){
            let dsh=ddList[i];
            let pfjd=dsh.pfjd;
            let pfjdMc=zhcxListPage.getPfjdMcById(pfjd);
            dsh.pfjdMc=pfjdMc;

            let sfzy=dsh.sfzy;
            let sfzyMc=zhcxListPage.getSfzyMcById(sfzy);
            dsh.sfzyMc=sfzyMc;

            let shzt=dsh.shzt;
            let shztMc=zhcxListPage.getShztMcById(shzt);
            dsh.shztMc=shztMc;
          }
          zhcxListPage.setData({ddList:ddList});
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
  getPfjdMcById:function(pfjdId){
    let constantMap=zhcxListPage.data.constantMap;
    let pfjdMap=constantMap.clPfjdMap;
    //console.log(pfjdMap);
    var str;
    switch (pfjdId) {
    case pfjdMap.gwryPfjd:
      str=pfjdMap.gwryPfjdMc;//国五燃油
      break;
    case pfjdMap.gwrqPfjd:
      str=pfjdMap.gwrqPfjdMc;//国五燃气
      break;
    case pfjdMap.glryPfjd:
      str=pfjdMap.glryPfjdMc;//国六燃油
      break;
    case pfjdMap.glrqPfjd:
      str=pfjdMap.glrqPfjdMc;//国六燃气
      break;
    case pfjdMap.ddPfjd:
      str=pfjdMap.ddPfjdMc;//电动
      break;
    }
    return str;
  },
  getSfzyMcById:function(sfzy){
    let constantMap=zhcxListPage.data.constantMap;
    let sfzyMap=constantMap.clSfzyMap;
    //console.log(sfzyMap);
    var str;
    if(sfzy)
      str=sfzyMap.shiSfzyMc;
    else
      str=sfzyMap.fouSfzyMc;
    return str;
  },
  getShztMcById:function(shztId){
    let constantMap=zhcxListPage.data.constantMap;
    let shztMap=constantMap.clShztMap;
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
  // 点击下拉显示框
  showCllxOption() {
    zhcxListPage.setData({
      showCllxOption: !zhcxListPage.data.showCllxOption,
    });
  },
  // 点击下拉显示框
  showSfzyOption() {
    zhcxListPage.setData({
      showSfzyOption: !zhcxListPage.data.showSfzyOption,
    });
  },
  // 点击下拉显示框
  showShztOption() {
    zhcxListPage.setData({
      showShztOption: !zhcxListPage.data.showShztOption,
    });
  },
  // 点击下拉列表
  selectCllxOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let cllxList=zhcxListPage.data.cllxList;
    let cllx=cllxList[index];
    console.log(index+","+cllx.value+","+cllx.text);
    this.setData({
      cllxSelectIndex: index,
      cllxSelectId: cllx.value,
      showCllxOption: !this.data.showCllxOption
    });
  },
  // 点击下拉列表
  selectSfzyOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let sfzyList=zhcxListPage.data.sfzyList;
    let sfzy=sfzyList[index];
    console.log(index+","+sfzy.value+","+sfzy.text);
    this.setData({
      sfzySelectIndex: index,
      sfzySelectId: sfzy.value,
      showSfzyOption: !this.data.showSfzyOption
    });
  },
  // 点击下拉列表
  selectShztOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let shztList=zhcxListPage.data.shztList;
    let shzt=shztList[index];
    console.log(index+","+shzt.value+","+shzt.text);
    this.setData({
      shztSelectIndex: index,
      shztSelectId: shzt.value,
      showShztOption: !this.data.showShztOption
    });
  },
  goDetailPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/clgl/zhcx/detail?id='+id,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})