// pages/xtgl/yhshjl/list.js
var yhshjlListPage;
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
    yhm:"",
    shr:"",
    shksrq:'',
    shksrqPlaceholder: '请选择开始日期',
    shkssj:'',
    shkssjPlaceholder: '请选择开始时间',
    shjsrq:'',
    shjsrqPlaceholder: '请选择结束日期',
    shjssj:'',
    shjssjPlaceholder: '请选择结束时间',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    yhshjlListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    yhshjlListPage.getConstantFlagMap();
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
        //yhshjlListPage.setData({constantFlagMap:constantFlagMap});
        let yhShjg=constantFlagMap.yhShjg;
        let constantFlags=yhShjg;
        yhshjlListPage.getConstantMap(constantFlags);
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
        yhshjlListPage.setData({constantMap:constantMap});
        yhshjlListPage.getListData();
      }
    })
  },
  showPageView:function(flag){
    if(flag){
      yhshjlListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      yhshjlListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      yhshjlListPage.setData({showToolBarView:true});
    }
    else{
      yhshjlListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      yhshjlListPage.setData({showNoDataView:true});
    }
    else{
      yhshjlListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="yhm_inp"){
      let yhm=e.detail.value;
      yhshjlListPage.setData({yhm:yhm});
    }
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=yhshjlListPage.data.prePageFlag;
    let nextPageFlag=yhshjlListPage.data.nextPageFlag;
    let currentPage=yhshjlListPage.data.currentPage;
    let pageCount=yhshjlListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      yhshjlListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      yhshjlListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    yhshjlListPage.setData({currentPage:currentPage});
    yhshjlListPage.getListData();
  },
  getListData:function(){
    let currentPage=yhshjlListPage.data.currentPage;
    let pageSize=yhshjlListPage.data.pageSize;
    let yhm=yhshjlListPage.data.yhm;
    let shrYhm=yhshjlListPage.data.shr;
    let shksrq=yhshjlListPage.data.shksrq;
    let shkssj=yhshjlListPage.data.shkssj;
    let shsjks="";
    if(shksrq!=""&shkssj!="")
      shsjks=shksrq+" "+shkssj;
    let shjsrq=yhshjlListPage.data.shjsrq;
    let shjssj=yhshjlListPage.data.shjssj;
    let shsjjs="";
    if(shjsrq!=""&shjssj!="")
      shsjjs=shjsrq+" "+shjssj;
      
    console.log("yhm==="+yhm)
    console.log("shrYhm==="+shrYhm)
    console.log("shsjks==="+shsjks)
    console.log("shsjjs==="+shsjjs)

    wx.request({
      url: rootIP+"getYHSHJLList",
      data:{page:currentPage,rows:pageSize,yhm:yhm,shrYhm:shrYhm,shsjks:shsjks,shsjjs:shsjjs},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        yhshjlListPage.setData({shjlList:[]});
        if(status=="ok"){
          var shjlList=data.list;
          for(let i=0;i<shjlList.length;i++){
            let shjl=shjlList[i];
            let shjg=shjl.shjg;
            let shjgMc=yhshjlListPage.getShjgMcByJg(shjg);
            shjl.shjgMc=shjgMc;
          }
          yhshjlListPage.setData({shjlList:shjlList});
          yhshjlListPage.showNoDataView(false);
          yhshjlListPage.setData({noDataText:""});
        }
        else{
          yhshjlListPage.showNoDataView(true);
          yhshjlListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        yhshjlListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        yhshjlListPage.showToolBarView(e);
      }
    })
  },
  getShjgMcByJg:function(shjg){
    let constantMap=yhshjlListPage.data.constantMap;
    let shjgMap=constantMap.yhShjgMap;
    //console.log(shjgMap);
    var str;
    if(shjg)
      str=shjgMap.hgShjgMc;//合格
    else
      str=shjgMap.bhgShjgMc;//不合格
    return str;
  },
  pickerShksrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    yhshjlListPage.setData({shksrq:value});
  },
  pickerShkssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    yhshjlListPage.setData({shkssj:value});
  },
  pickerShjsrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    yhshjlListPage.setData({shjsrq:value});
  },
  pickerShjssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    yhshjlListPage.setData({shjssj:value});
  },
  pickerShksrqCancel:function(){
    yhshjlListPage.setData({shksrq:''});
  },
  pickerShkssjCancel:function(){
    yhshjlListPage.setData({shkssj:''});
  },
  pickerShjsrqCancel:function(){
    yhshjlListPage.setData({shjsrq:''});
  },
  pickerShjssjCancel:function(){
    yhshjlListPage.setData({shjssj:''});
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})