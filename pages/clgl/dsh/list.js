// pages/clgl/dsh/list.js
var dshListPage;
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
    cllxSelectId:"",
    cllxList:[{"value":"","text":"请选择"},{"value":"1","text":"重型"}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    dshListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    dshListPage.getConstantFlagMap();
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
        //dshListPage.setData({constantFlagMap:constantFlagMap});
        let clShzt=constantFlagMap.clShzt;
        let clPfjd=constantFlagMap.clPfjd;
        let clSfzy=constantFlagMap.clSfzy;
        let constantFlags=clShzt+","+clPfjd+","+clSfzy;
        dshListPage.getConstantMap(constantFlags);
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
        dshListPage.setData({constantMap:constantMap});
        dshListPage.getListData();
      }
    })
  },
  showPageView:function(flag){
    if(flag){
      dshListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      dshListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      dshListPage.setData({showToolBarView:true});
    }
    else{
      dshListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      dshListPage.setData({showNoDataView:true});
    }
    else{
      dshListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="cph_inp"){
      let cph=e.detail.value;
      dshListPage.setData({cph:cph});
    }
  },
  resetToolBarData:function(){
    dshListPage.setData({cph:"",cllxSelectIndex:0,cllxSelectId:""});
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=dshListPage.data.prePageFlag;
    let nextPageFlag=dshListPage.data.nextPageFlag;
    let currentPage=dshListPage.data.currentPage;
    let pageCount=dshListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      dshListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      dshListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    dshListPage.setData({currentPage:currentPage});
    dshListPage.getListData();
  },
  getListData:function(){
    let currentPage=dshListPage.data.currentPage;
    let pageSize=dshListPage.data.pageSize;
    let cph=dshListPage.data.cph;
    let cllx=dshListPage.data.cllxSelectId;
    let clShztMap=dshListPage.data.constantMap.clShztMap;
    let defaultShzt=clShztMap.dshShzt;

    console.log("cph==="+cph)
    console.log("cllx==="+cllx)
    console.log("defaultShzt==="+defaultShzt)

    wx.request({
      url: rootIP+"getCheLiangList",
      data:{page:currentPage,rows:pageSize,cph:cph,cllx:cllx,shzt:defaultShzt},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        dshListPage.setData({ddList:[]});
        if(status=="ok"){
          var ddList=data.list;
          for(let i=0;i<ddList.length;i++){
            let dsh=ddList[i];
            let pfjd=dsh.pfjd;
            let pfjdMc=dshListPage.getPfjdMcById(pfjd);
            dsh.pfjdMc=pfjdMc;

            let sfzy=dsh.sfzy;
            let sfzyMc=dshListPage.getSfzyMcById(sfzy);
            dsh.sfzyMc=sfzyMc;
          }
          dshListPage.setData({ddList:ddList});
          dshListPage.showNoDataView(false);
          dshListPage.setData({noDataText:""});
        }
        else{
          dshListPage.showNoDataView(true);
          dshListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        dshListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        dshListPage.showToolBarView(e);
      }
    })
  },
  getPfjdMcById:function(pfjdId){
    let constantMap=dshListPage.data.constantMap;
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
    let constantMap=dshListPage.data.constantMap;
    let sfzyMap=constantMap.clSfzyMap;
    //console.log(sfzyMap);
    var str;
    if(sfzy)
      str=sfzyMap.shiSfzyMc;
    else
      str=sfzyMap.fouSfzyMc;
    return str;
  },
  // 点击下拉显示框
  showCllxOption() {
    dshListPage.setData({
      showCllxOption: !dshListPage.data.showCllxOption,
    });
  },
  // 点击下拉列表
  selectCllxOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let cllxList=dshListPage.data.cllxList;
    let cllx=cllxList[index];
    console.log(index+","+cllx.value+","+cllx.text);
    this.setData({
      cllxSelectIndex: index,
      cllxSelectId: cllx.value,
      showCllxOption: !this.data.showCllxOption
    });
  },
  checkById:function(e){
    let shjg=e.currentTarget.dataset.shjg;
    let tsStr;
    if(shjg)
      tsStr="审核";
    else
      tsStr="退回";
    let confirmStr="确定要"+tsStr+"吗？";
    wx.showModal({
      title: "提示",
      content: confirmStr,
      success (res) {
        if (res.confirm) {
          //console.log('用户点击确定')
          let id=e.currentTarget.dataset.id;
          let yongHu=wx.getStorageSync("yongHu");
          let shrId=yongHu.id;
          wx.request({
            url: rootIP+"checkCheLiangByIds",
            data:{ids:id,shjg:shjg,shrId:shrId},
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
        }
      }
    })
  },
  goDetailPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/clgl/dsh/detail?id='+id,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})