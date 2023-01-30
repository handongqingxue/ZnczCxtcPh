// pages/sjgl/shjl/list.js
var shjlListPage;
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
    sjXm:"",
    shrYhm:"",
    prePageFlag:1,
    nextPageFlag:2,
    prePageEnable:false,
    nextPageEnable:true,
    showShlxOption:false,
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
    shjlListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    shjlListPage.getConstantFlagMap();
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
        let clShjg=constantFlagMap.clShjg;
        let constantFlags=clShjg;
        shjlListPage.getConstantMap(constantFlags);
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
        shjlListPage.setData({constantMap:constantMap});
        //shjlListPage.getDdztSelectData();
        shjlListPage.getListData();
      }
    })
  },
  showPageView:function(flag){
    if(flag){
      shjlListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      shjlListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      shjlListPage.setData({showToolBarView:true});
    }
    else{
      shjlListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      shjlListPage.setData({showNoDataView:true});
    }
    else{
      shjlListPage.setData({showNoDataView:false});
    }
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="sjXm_inp"){
      let sjXm=e.detail.value;
      shjlListPage.setData({sjXm:sjXm});
    }
    else if(e.currentTarget.id=="shrYhm_inp"){
      let shrYhm=e.detail.value;
      shjlListPage.setData({shrYhm:shrYhm});
    }
  },
  resetToolBarData:function(){
    shjlListPage.setData({sjXm:"",shrYhm:"",shksrq:"",shkssj:"",shjsrq:"",shjssj:""});
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=shjlListPage.data.prePageFlag;
    let nextPageFlag=shjlListPage.data.nextPageFlag;
    let currentPage=shjlListPage.data.currentPage;
    let pageCount=shjlListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      shjlListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      shjlListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    shjlListPage.setData({currentPage:currentPage});
    shjlListPage.getListData();
  },
  getListData:function(){
    let currentPage=shjlListPage.data.currentPage;
    let pageSize=shjlListPage.data.pageSize;
    var sjXm=shjlListPage.data.sjXm;
    var shrYhm=shjlListPage.data.shrYhm;
    let shksrq=shjlListPage.data.shksrq;
    let shkssj=shjlListPage.data.shkssj;
    let shsjks="";
    if(shksrq!=""&shkssj!="")
      shsjks=shksrq+" "+shkssj;
    let shjsrq=shjlListPage.data.shjsrq;
    let shjssj=shjlListPage.data.shjssj;
    let shsjjs="";
    if(shjsrq!=""&shjssj!="")
      shsjjs=shjsrq+" "+shjssj;

    console.log("sjXm==="+sjXm)
    console.log("shrYhm==="+shrYhm)
    console.log("shsjks==="+shsjks)
    console.log("shsjjs==="+shsjjs)
    
    wx.request({
      url: rootIP+"getSJSHJLList",
      data:{page:currentPage,rows:pageSize,sjXm:sjXm,shrYhm:shrYhm,shsjks:shsjks,shsjjs:shsjjs},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        shjlListPage.setData({shjlList:[]});
        if(status=="ok"){
          var shjlList=data.list;
          for(let i=0;i<shjlList.length;i++){
            let shjl=shjlList[i];
            let shjg=shjl.shjg;
            let shjgMc=shjlListPage.getShjgMcByJg(shjg);
            shjl.shjgMc=shjgMc;
          }
          shjlListPage.setData({shjlList:shjlList});
          shjlListPage.showNoDataView(false);
          shjlListPage.setData({noDataText:""});
        }
        else{
          shjlListPage.showNoDataView(true);
          shjlListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        shjlListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        shjlListPage.showToolBarView(e);
      }
    })
  },
  getShjgMcByJg:function(shjg){
    let constantMap=shjlListPage.data.constantMap;
    let shjgMap=constantMap.clShjgMap;
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
    shjlListPage.setData({shksrq:value});
  },
  pickerShkssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    shjlListPage.setData({shkssj:value});
  },
  pickerShjsrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    shjlListPage.setData({shjsrq:value});
  },
  pickerShjssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    shjlListPage.setData({shjssj:value});
  },
  pickerShksrqCancel:function(){
    shjlListPage.setData({shksrq:''});
  },
  pickerShkssjCancel:function(){
    shjlListPage.setData({shkssj:''});
  },
  pickerShjsrqCancel:function(){
    shjlListPage.setData({shjsrq:''});
  },
  pickerShjssjCancel:function(){
    shjlListPage.setData({shjssj:''});
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
            url: rootIP+"deleteSiJiShenHeJiLu",
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