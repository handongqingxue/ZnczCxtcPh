// pages/clgl/cntz/list.js
var cntzListPage;
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
    cyclCph:"",
    ddztSelectIds:"",
    ddztSelectMcs:"",
    prePageFlag:1,
    nextPageFlag:2,
    prePageEnable:false,
    nextPageEnable:true,
    showDdztOption:false,
    selectedDdztList:[],
    
    jcksrq:'',
    jcksrqPlaceholder: '请选择开始日期',
    jckssj:'',
    jckssjPlaceholder: '请选择开始时间',
    jcjsrq:'',
    jcjsrqPlaceholder: '请选择结束日期',
    jcjssj:'',
    jcjssjPlaceholder: '请选择结束时间',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    cntzListPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    cntzListPage.getConstantFlagMap();
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
        //cntzListPage.setData({constantFlagMap:constantFlagMap});
        let ddzt=constantFlagMap.ddzt;
        let constantFlags=ddzt;
        cntzListPage.getConstantMap(constantFlags);
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
        cntzListPage.setData({constantMap:constantMap});
        cntzListPage.initDefaultDdztMc();
        cntzListPage.getDdztSelectData();
      }
    })
  },
  showPageView:function(flag){
    if(flag){
      cntzListPage.setData({showDjckgdView:false,showPageView:true});
    }
    else{
      cntzListPage.setData({showDjckgdView:true,showPageView:false});
    }
  },
  showToolBarView:function(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag){
      cntzListPage.setData({showToolBarView:true});
    }
    else{
      cntzListPage.setData({showToolBarView:false});
    }
  },
  showNoDataView:function(flag){
    if(flag){
      cntzListPage.setData({showNoDataView:true});
    }
    else{
      cntzListPage.setData({showNoDataView:false});
    }
  },
  loadListDataByPageFlag:function(e){
    let flag=e.currentTarget.dataset.flag;
    let prePageFlag=cntzListPage.data.prePageFlag;
    let nextPageFlag=cntzListPage.data.nextPageFlag;
    let currentPage=cntzListPage.data.currentPage;
    let pageCount=cntzListPage.data.pageCount;
    if(flag==prePageFlag)
      currentPage--;
    else if(flag==nextPageFlag)
      currentPage++;

    if(currentPage<1)
      currentPage=1;
    else if(currentPage>pageCount)
      currentPage=pageCount;

    if(currentPage<=1){
      cntzListPage.setData({prePageEnable:false,nextPageEnable:true});
    }
    else if(currentPage>=pageCount){
      cntzListPage.setData({prePageEnable:true,nextPageEnable:false});
    }
    cntzListPage.setData({currentPage:currentPage});
    cntzListPage.getListData();
  },
  initDefaultDdztMc:function(){
    let ddztMap=cntzListPage.data.constantMap.ddztMap;
    let djyDdzt=ddztMap.djyDdzt;
    let yjdsmDdzt=ddztMap.yjdsmDdzt;
    let yjdsbDdzt=ddztMap.yjdsbDdzt;
    let yjzDdzt=ddztMap.yjzDdzt;
    let yjdshDdzt=ddztMap.yjdshDdzt;
    let dzxhDdzt=ddztMap.dzxhDdzt;
    let ejdsmDdzt=ddztMap.ejdsmDdzt;
    let ejdsbDdzt=ddztMap.ejdsbDdzt;
    let ejzDdzt=ddztMap.ejzDdzt;
    let ejdshDdzt=ddztMap.ejdshDdzt;
    let ddypzDdzt=ddztMap.ddypzDdzt;
    let dlcDdzt=ddztMap.dlcDdzt;
    let ddztSelectIds=djyDdzt+","+yjdsmDdzt+","+yjdsbDdzt+","+yjzDdzt+","+yjdshDdzt+","+dzxhDdzt+","+ejdsmDdzt+","+ejdsbDdzt+","+ejzDdzt+","+ejdshDdzt+","+ddypzDdzt+","+dlcDdzt;

    let djyDdztMc=ddztMap.djyDdztMc;
    let yjdsmDdztMc=ddztMap.yjdsmDdztMc;
    let yjdsbDdztMc=ddztMap.yjdsbDdztMc;
    let yjzDdztMc=ddztMap.yjzDdztMc;
    let yjdshDdztMc=ddztMap.yjdshDdztMc;
    let dzxhDdztMc=ddztMap.dzxhDdztMc;
    let ejdsmDdztMc=ddztMap.ejdsmDdztMc;
    let ejdsbDdztMc=ddztMap.ejdsbDdztMc;
    let ejzDdztMc=ddztMap.ejzDdztMc;
    let ejdshDdztMc=ddztMap.ejdshDdztMc;
    let ddypzDdztMc=ddztMap.ddypzDdztMc;
    let dlcDdztMc=ddztMap.dlcDdztMc;
    let defaultDdztMc=djyDdztMc+","+yjdsmDdztMc+","+yjdsbDdztMc+","+yjzDdztMc+","+yjdshDdztMc+","+dzxhDdztMc+","+ejdsmDdztMc+","+ejdsbDdztMc+","+ejzDdztMc+","+ejdshDdztMc+","+ddypzDdztMc+","+dlcDdztMc;
    //console.log(defaultDdztMc)
    let ddztSelectMcs=defaultDdztMc;
    if(ddztSelectMcs.length>8)
      ddztSelectMcs=ddztSelectMcs.substring(1,8)+"...";
    else
      ddztSelectMcs=ddztSelectMcs.substring(1);
    cntzListPage.setData({ddztSelectIds:ddztSelectIds,defaultDdztMc:defaultDdztMc,ddztSelectMcs:ddztSelectMcs});
  },
  getDdztSelectData:function(){
    wx.request({
      url: rootIP+"getDingDanZhuangTaiSelectList",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let ddztList=res.data.list;
        cntzListPage.initDefaultSelectedDdztList(ddztList);
        cntzListPage.getListData();
      }
    })
  },
  initDefaultSelectedDdztList:function(ddztList){
    cntzListPage.setData({selectedDdztList:[]});
    let ddztSelectIds=cntzListPage.data.ddztSelectIds;
    let ddztSelectIdArr=ddztSelectIds.split(",");
    //在数组前添加元素:https://jingyan.baidu.com/article/359911f5bac85116fe0306e0.html
    ddztList.unshift({id:"",mc:"请选择"});
    for(let i=0;i<ddztList.length;i++){
      let ddzt=ddztList[i];
      let exist=false;
      for(let j=0;j<ddztSelectIdArr.length;j++){
        let ddztSelectId=ddztSelectIdArr[j];
        if(ddzt.id==ddztSelectId){
          exist=true;
          cntzListPage.pushDdztInSelectedList(ddzt);
          break;
        }
      }
      ddzt.selected=exist;
    }
    //console.log(ddztList);
    cntzListPage.setData({ddztList:ddztList});
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="ddh_inp"){
      let ddh=e.detail.value;
      cntzListPage.setData({ddh:ddh});
    }
    else if(e.currentTarget.id=="cyclCph_inp"){
      let cyclCph=e.detail.value;
      cntzListPage.setData({cyclCph:cyclCph});
    }
  },
  resetToolBarData:function(){
    cntzListPage.initDefaultDdztMc();
    let ddztList=cntzListPage.data.ddztList;
    cntzListPage.initDefaultSelectedDdztList(ddztList);
    cntzListPage.setData({ddh:"",cyclCph:"",ddztSelectIndex:0,ddztSelectId:"",jcksrq:"",jckssj:"",jcjsrq:"",jcjssj:""});
  },
  getListData:function(){
    let currentPage=cntzListPage.data.currentPage;
    let pageSize=cntzListPage.data.pageSize;
    let ddh=cntzListPage.data.ddh;
    let cyclCph=cntzListPage.data.cyclCph;
    let ddztIds=cntzListPage.data.ddztSelectIds;
    let defaultDdztMc=cntzListPage.data.defaultDdztMc;

    let jcksrq=cntzListPage.data.jcksrq;
    let jckssj=cntzListPage.data.jckssj;
    let jcsjs="";
    if(jcksrq!=""&jckssj!="")
      jcsjs=jcksrq+" "+jckssj;

    let jcjsrq=cntzListPage.data.jcjsrq;
    let jcjssj=cntzListPage.data.jcjssj;
    let jcsje="";
    if(jcjsrq!=""&jcjssj!="")
      jcsje=jcjsrq+" "+jcjssj;

    console.log("ddh==="+ddh)
    console.log("cyclCph==="+cyclCph)
    console.log("ddztIds==="+ddztIds)
    console.log("defaultDdztMc==="+defaultDdztMc)
    console.log("jcsjs==="+jcsjs)
    console.log("jcsje==="+jcsje)
    
    wx.request({
      url: rootIP+"getCLTZList",
      data:{page:currentPage,rows:pageSize,ddh:ddh,cyclCph:cyclCph,ddztIds:'',ddztMcs:defaultDdztMc,jcsjs:jcsjs,jcsje:jcsje},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let status=data.status;
        console.log("status==="+status)
        let dataCount;
        cntzListPage.setData({cltzList:[]});
        if(status=="ok"){
          var cltzList=data.list;
          cntzListPage.setData({cltzList:cltzList});
          cntzListPage.showNoDataView(false);
          cntzListPage.setData({noDataText:""});
        }
        else{
          cntzListPage.showNoDataView(true);
          cntzListPage.setData({noDataText:data.message});
        }
        dataCount=data.total;
        cntzListPage.setData({dataCount:dataCount,pageCount:Math.floor((dataCount-1)/pageSize)+1});
        let e={currentTarget:{dataset:{flag:false}}};
        cntzListPage.showToolBarView(e);
      }
    })
  },
  // 点击下拉显示框
  showDdztOption() {
    cntzListPage.setData({
      showDdztOption: !cntzListPage.data.showDdztOption,
    });
  },
  // 点击下拉列表
  selectDdztOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let ddztList=cntzListPage.data.ddztList;
    let ddzt=ddztList[index];
    ddzt.selected=!ddzt.selected;
    console.log(index+","+ddzt.id+","+ddzt.mc+","+ddzt.selected);
    if(ddzt.selected){
      if(!cntzListPage.checkIfDdztInSelectedList(ddzt.id))
      cntzListPage.pushDdztInSelectedList(ddzt);
    }
    else{
      cntzListPage.removeDdztFromSelectedList(ddzt);
    }

    this.setData({
      ddztSelectIndex: index,
      ddztSelectId: ddzt.id,
      //showDdztOption: !this.data.showDdztOption,
      ddztList:ddztList
    });
  },
  pushDdztInSelectedList:function(ddzt){
    console.log(ddzt)
    let selectedDdztList=cntzListPage.data.selectedDdztList;
    selectedDdztList.push(ddzt);
    console.log(selectedDdztList)
    cntzListPage.sortDdztSelectedAttrs(selectedDdztList);
  },
  removeDdztFromSelectedList:function(ddzt){
    let selectedDdztList=cntzListPage.data.selectedDdztList;
    console.log(selectedDdztList)
    for(let i=0;i<selectedDdztList.length;i++){
      let selectedDdzt=selectedDdztList[i];
      if(selectedDdzt.id==ddzt.id){
        selectedDdztList.splice(i,1);
        break;
      }
    }
    console.log(selectedDdztList)
    cntzListPage.sortDdztSelectedAttrs(selectedDdztList);
  },
  checkIfDdztInSelectedList:function(id){
    let flag=false;
    let selectedDdztList=cntzListPage.data.selectedDdztList;
    for(let i=0;i<selectedDdztList.length;i++){
      let selectedDdzt=selectedDdztList[i];
      if(selectedDdzt.id==id){
        flag=true;
        break;
      }
    }
    console.log("flag==="+flag)
    return flag;
  },
  sortDdztSelectedAttrs:function(selectedDdztList){
    let ddztSelectIds="";
    let ddztSelectMcs="";
    for(let i=0;i<selectedDdztList.length;i++){
      let selectedDdzt=selectedDdztList[i];
      let ddztId=selectedDdzt.id;
      let ddztMc=selectedDdzt.mc;
      console.log("ddztId="+ddztId+",ddztMc="+ddztMc);
      ddztSelectIds+=","+ddztId;
      ddztSelectMcs+=","+ddztMc;
    }
    ddztSelectIds=ddztSelectIds.substring(1);
    ddztSelectMcs=ddztSelectMcs.substring(1);
    console.log("ddztSelectIds="+ddztSelectIds+",ddztSelectMcs="+ddztSelectMcs);
    this.setData({ddztSelectIds:ddztSelectIds,ddztSelectMcs:ddztSelectMcs});
  },
  pickerJhysrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    cntzListPage.setData({jhysrq:value});
  },
  pickerJcksrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    cntzListPage.setData({jcksrq:value});
  },
  pickerJckssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    cntzListPage.setData({jckssj:value});
  },
  pickerJcjsrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    cntzListPage.setData({jcjsrq:value});
  },
  pickerJcjssjChange:function(e){
    let value = e.detail.value;
    console.log(value)
    cntzListPage.setData({jcjssj:value});
  },
  pickerJhysrqCancel:function(){
    cntzListPage.setData({jhysrq:''});
  },
  pickerJcksrqCancel:function(){
    cntzListPage.setData({jcksrq:''});
  },
  pickerJckssjCancel:function(){
    cntzListPage.setData({jckssj:''});
  },
  pickerJcjsrqCancel:function(){
    cntzListPage.setData({jcjsrq:''});
  },
  pickerJcjssjCancel:function(){
    cntzListPage.setData({jcjssj:''});
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
            url: rootIP+"deleteCLTZ",
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
  goDetailPage:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/clgl/cntz/detail?id='+id,
    })
  },
  goHomePage:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})