// pages/ddgl/zhcx/edit.js
var editPage;
var rootIP;
var serverRootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backButSign:'<',
    lxlxList:[{value:"",text:"请选择"},{value:"1",text:"送运"},{value:"2",text:"取运"}],
    showLxlxOption:false,
    showYssOption:false,
    showWzlxOption:false,
    showWzOption:false,
    showFhdwOption:false,
    showShdwOption:false,
    showCyclOption:false,
    showCysjOption:false,
    jhysrq:'',
    pickerStartTime: '1970-01-01 12:37',
    pickerEndTime: '2099-12-31 12:38',
    jhysrqPlaceholder:'请选择计划运输日期',
    dfgbsjPlaceholder: '请选择时间',
    showSaveBut:true,
    showSavingBut:false,
    showSavedBut:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    editPage=this;
    rootIP=getApp().getRootIP();
    serverRootIP=getApp().getServerRootIP();
    let id=options.id;
    console.log(id)
    editPage.setData({id:id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    editPage.getYssSelectData();
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
  checkEdit:function(){
    if(editPage.checkYzxzl()){
      if(editPage.checkLXLXId()){
        if(editPage.checkJHYSRQ()){
          if(editPage.checkYSSId()){
            if(editPage.checkWZLXId()){
              if(editPage.checkWZId()){
                if(editPage.checkFHDWId()){
                  if(editPage.checkSHDWId()){
                    if(editPage.checkCYCLId()){
                      if(editPage.checkCYSJId()){
                        editPage.editDingDan();
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  editDingDan:function(){
    editPage.saving(true);
    let id=editPage.data.id;
    let yzxzl=editPage.data.yzxzl;
    let lxlxSelectId=editPage.data.lxlxSelectId;
    let sjzl=editPage.data.sjzl;
    let jhysrq=editPage.data.jhysrq;
    let bz=editPage.data.bz;
    let jszl=editPage.data.jszl;
    let bs=editPage.data.bs;
    let ks=editPage.data.ks;
    let dfgbjz=editPage.data.dfgbjz;
    let dfgbpz=editPage.data.dfgbpz;
    let dfgbmz=editPage.data.dfgbmz;
    let dfgbsj=editPage.data.dfgbsj;
    let yssSelectId=editPage.data.yssSelectId;
    let wzlxSelectId=editPage.data.wzlxSelectId;
    let wzSelectId=editPage.data.wzSelectId;
    let fhdwSelectId=editPage.data.fhdwSelectId;
    let shdwSelectId=editPage.data.shdwSelectId;
    let cyclSelectId=editPage.data.cyclSelectId;
    let cyclSelectCph=editPage.data.cyclSelectCph;
    let cysjSelectId=editPage.data.cysjSelectId;
    console.log("yzxzl==="+yzxzl)
    console.log("lxlxSelectId==="+lxlxSelectId)
    console.log("sjzl==="+sjzl)
    console.log("jhysrq==="+jhysrq)
    console.log("bz==="+bz)
    console.log("jszl==="+jszl)
    console.log("bs==="+bs)
    console.log("ks==="+ks)
    console.log("dfgbjz==="+dfgbjz)
    console.log("dfgbpz==="+dfgbpz)
    console.log("dfgbmz==="+dfgbmz)
    console.log("dfgbsj==="+dfgbsj)
    console.log("yssSelectId==="+yssSelectId)
    console.log("wzlxSelectId==="+wzlxSelectId)
    console.log("wzSelectId==="+wzSelectId)
    console.log("fhdwSelectId==="+fhdwSelectId)
    console.log("shdwSelectId==="+shdwSelectId)
    console.log("cyclSelectId==="+cyclSelectId)
    console.log("cysjSelectId==="+cysjSelectId)
    //return false;
    wx.request({
      url: rootIP+"editDingDan",
      data:{id:id,yzxzl:yzxzl,lxlx:lxlxSelectId,sjzl:sjzl,jhysrq:jhysrq,bz:bz,jszl:jszl,bs:bs,ks:ks,dfgbjz:dfgbjz,dfgbpz:dfgbpz,dfgbmz:dfgbmz,dfgbsj:dfgbsj,yssId:yssSelectId,wzlxId:wzlxSelectId,wzId:wzSelectId,fhdwId:fhdwSelectId,shdwId:shdwSelectId,cyclId:cyclSelectId,cyclCph:cyclSelectCph,cysjId:cysjSelectId},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        console.log("message==="+message)
        if(message=="ok"){
          let tempFilePath=editPage.data.tempFilePath;
          //console.log("tempFilePath==="+tempFilePath)
          if(tempFilePath==null||tempFilePath==undefined){
            editPage.saving(false);
            wx.showToast({
              title: data.info,
            })
            setTimeout(() => {
              editPage.goListPage();
            }, 1000);
          }
          else{
            editPage.uploadDfbdzp(); 
          }
        }
        else{
          wx.showToast({
            title: data.info,
          })
        }
      }
    })
  },
  getInputValue:function(e){
    if(e.currentTarget.id=="yzxzl_inp"){
      let yzxzl=e.detail.value;
      editPage.setData({yzxzl:yzxzl});
    }
    else if(e.currentTarget.id=="sjzl_inp"){
      let sjzl=e.detail.value;
      editPage.setData({sjzl:sjzl});
    }
    else if(e.currentTarget.id=="bz_inp"){
      let bz=e.detail.value;
      editPage.setData({bz:bz});
    }
    else if(e.currentTarget.id=="jszl_inp"){
      let jszl=e.detail.value;
      editPage.setData({jszl:jszl});
    }
    else if(e.currentTarget.id=="bs_inp"){
      let bs=e.detail.value;
      editPage.setData({bs:bs});
    }
    else if(e.currentTarget.id=="ks_inp"){
      let ks=e.detail.value;
      editPage.setData({ks:ks});
    }
    else if(e.currentTarget.id=="dfgbjz_inp"){
      let dfgbjz=e.detail.value;
      editPage.setData({dfgbjz:dfgbjz});
    }
    else if(e.currentTarget.id=="dfgbpz_inp"){
      let dfgbpz=e.detail.value;
      editPage.setData({dfgbpz:dfgbpz});
    }
    else if(e.currentTarget.id=="dfgbmz_inp"){
      let dfgbmz=e.detail.value;
      editPage.setData({dfgbmz:dfgbmz});
    }
  },
  focusYzxzl:function(){
    let yzxzl=editPage.data.yzxzl;
    if(yzxzl=="预装卸重量不能为空"){
      editPage.setData({yzxzl:''});
    }
  },
  checkYzxzl:function(){
    let yzxzl=editPage.data.yzxzl;
    if(yzxzl==""||yzxzl==null||yzxzl=="预装卸重量不能为空"){
      editPage.setData({yzxzl:'预装卸重量不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkLXLXId:function(){
    let lxlxSelectId=editPage.data.lxlxSelectId;
    if(lxlxSelectId==null||lxlxSelectId==""){
      wx.showToast({
        title: "请选择流向类型",
      })
	  	return false;
    }
    else
      return true;
  },
  checkJHYSRQ:function(){
    let jhysrq=editPage.data.jhysrq;
    if(jhysrq==null||jhysrq==""){
        wx.showToast({
          title: "请选择计划运输日期",
        })
        return false;
    }
    else
      return true;
  },
  //验证运输商
  checkYSSId:function(){
    let yssSelectId=editPage.data.yssSelectId;
    if(yssSelectId==null||yssSelectId==""){
        wx.showToast({
          title: "请选择运输商",
        })
        return false;
    }
    else
      return true;
  },
  //验证物资类型
  checkWZLXId:function(){
    let wzlxSelectId=editPage.data.wzlxSelectId;
    if(wzlxSelectId==null||wzlxSelectId==""){
        wx.showToast({
          title: "请选择物资类型",
        })
        return false;
    }
    else
      return true;
  },
  //验证物资名称
  checkWZId:function(){
    let wzSelectId=editPage.data.wzSelectId;
    if(wzSelectId==null||wzSelectId==""){
        wx.showToast({
          title: "请选择物资名称",
        })
        return false;
    }
    else
      return true;
  },
  //验证发货单位
  checkFHDWId:function(){
    let fhdwSelectId=editPage.data.fhdwSelectId;
    if(fhdwSelectId==null||fhdwSelectId==""){
        wx.showToast({
          title: "请选择发货单位",
        })
        return false;
    }
    else
      return true;
  },
  //验证收货单位
  checkSHDWId:function(){
    let shdwSelectId=editPage.data.shdwSelectId;
    if(shdwSelectId==null||shdwSelectId==""){
        wx.showToast({
          title: "请选择收货单位",
        })
        return false;
    }
    else
      return true;
  },
  //验证承运车辆
  checkCYCLId:function(){
    let cyclSelectId=editPage.data.cyclSelectId;
    if(cyclSelectId==null||cyclSelectId==""){
        wx.showToast({
          title: "请选择承运车辆",
        })
        return false;
    }
    else
      return true;
  },
  //验证承运司机
  checkCYSJId:function(){
    let cysjSelectId=editPage.data.cysjSelectId;
    if(cysjSelectId==null||cysjSelectId==""){
        wx.showToast({
          title: "请选择承运司机",
        })
        return false;
    }
    else
      return true;
  },
  goListPage:function(){
    wx.redirectTo({
      url: '/pages/ddgl/zhcx/list',
    })
  },
  // 点击下拉显示框
  showLxlxOption() {
    editPage.setData({
      showLxlxOption: !editPage.data.showLxlxOption,
    });
  },
  // 点击下拉显示框
  showYssOption() {
    editPage.setData({
      showYssOption: !editPage.data.showYssOption,
    });
  },
  // 点击下拉显示框
  showWzlxOption() {
    editPage.setData({
      showWzlxOption: !editPage.data.showWzlxOption,
    });
  },
  // 点击下拉显示框
  showWzOption() {
    editPage.setData({
      showWzOption: !editPage.data.showWzOption,
    });
  },
  // 点击下拉显示框
  showFhdwOption() {
    editPage.setData({
      showFhdwOption: !editPage.data.showFhdwOption,
    });
  },
  // 点击下拉显示框
  showShdwOption() {
    editPage.setData({
      showShdwOption: !editPage.data.showShdwOption,
    });
  },
  // 点击下拉显示框
  showCyclOption() {
    editPage.setData({
      showCyclOption: !editPage.data.showCyclOption,
    });
  },
  // 点击下拉显示框
  showCysjOption() {
    editPage.setData({
      showCysjOption: !editPage.data.showCysjOption,
    });
  },
  // 点击下拉列表
  selectLxlxOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let lxlxList=editPage.data.lxlxList;
    let lxlx=lxlxList[index];
    console.log(index+","+lxlx.value+","+lxlx.text);
    editPage.setData({
      lxlxSelectIndex: index,
      lxlxSelectId: lxlx.value,
      showLxlxOption: !editPage.data.showLxlxOption
    });
  },
  // 点击下拉列表
  selectYssOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let yssList=editPage.data.yssList;
    let yss=yssList[index];
    console.log(index+","+yss.id+","+yss.mc);
    editPage.setData({
      yssSelectIndex: index,
      yssSelectId: yss.id,
      showYssOption: !editPage.data.showYssOption
    });
  },
  // 点击下拉列表
  selectWzlxOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let wzlxList=editPage.data.wzlxList;
    let wzlx=wzlxList[index];
    console.log(index+","+wzlx.id+","+wzlx.mc);
    editPage.setData({
      wzlxSelectIndex: index,
      wzlxSelectId: wzlx.id,
      showWzlxOption: !editPage.data.showWzlxOption
    });
  },
  // 点击下拉列表
  selectWzOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let wzList=editPage.data.wzList;
    let wz=wzList[index];
    console.log(index+","+wz.id+","+wz.mc);
    editPage.setData({
      wzSelectIndex: index,
      wzSelectId: wz.id,
      showWzOption: !editPage.data.showWzOption
    });
  },
  // 点击下拉列表
  selectFhdwOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let fhdwList=editPage.data.fhdwList;
    let fhdw=fhdwList[index];
    console.log(index+","+fhdw.id+","+fhdw.mc);
    editPage.setData({
      fhdwSelectIndex: index,
      fhdwSelectId: fhdw.id,
      showFhdwOption: !editPage.data.showFhdwOption
    });
  },
  // 点击下拉列表
  selectShdwOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let shdwList=editPage.data.shdwList;
    let shdw=shdwList[index];
    console.log(index+","+shdw.id+","+shdw.mc);
    editPage.setData({
      shdwSelectIndex: index,
      shdwSelectId: shdw.id,
      showShdwOption: !editPage.data.showShdwOption
    });
  },
  // 点击下拉列表
  selectCyclOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let cyclList=editPage.data.cyclList;
    let cycl=cyclList[index];
    console.log(index+","+cycl.id+","+cycl.cph);
    editPage.setData({
      cyclSelectIndex: index,
      cyclSelectId: cycl.id,
      cyclSelectCph: cycl.cph,
      showCyclOption: !editPage.data.showCyclOption
    });
  },
  // 点击下拉列表
  selectCysjOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let cysjList=editPage.data.cysjList;
    let cysj=cysjList[index];
    console.log(index+","+cysj.id+","+cysj.xm);
    editPage.setData({
      cysjSelectIndex: index,
      cysjSelectId: cysj.id,
      showCysjOption: !editPage.data.showCysjOption
    });
  },
  pickerJhysrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    editPage.setData({jhysrq:value});
  },
  pickerJhysrqCancel:function(){
    editPage.setData({jhysrq:''});
  },
  onPickerDfgbsjChange: function (e) {
    console.log("dateString==="+e.detail.dateString)
    editPage.setData({
      dfgbsj:e.detail.dateString  //选中的数据
    })
  },
  getYssSelectData:function(){
    wx.request({
      url: rootIP+"getYunShuShangSelectList",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let yssList=res.data.list;
        //console.log(yssList);
        editPage.setData({yssList:yssList});
        editPage.getWzlxSelectData();
      }
    })
  },
  getWzlxSelectData:function(){
    wx.request({
      url: rootIP+"getWuZiLeiXingSelectList",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let wzlxList=res.data.list;
        //console.log(wzlxList);
        editPage.setData({wzlxList:wzlxList});
        editPage.getWzSelectData(wzlxList[0].id);
      }
    })
  },
  getWzSelectData:function(wzlxId){
    wx.request({
      url: rootIP+"getWuZiSelectList",
      data:{wzlxId:wzlxId},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let wzList=res.data.list;
        //console.log(wzList);
        editPage.setData({wzList:wzList});
        editPage.getFhdwSelectData();
      }
    })
  },
  getFhdwSelectData:function(){
    wx.request({
      url: rootIP+"getFaHuoDanWeiSelectList",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let fhdwList=res.data.list;
        //console.log(fhdwList);
        editPage.setData({fhdwList:fhdwList});
        editPage.getShdwSelectData();
      }
    })
  },
  getShdwSelectData:function(){
    wx.request({
      url: rootIP+"getShouHuoDanWeiSelectList",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let shdwList=res.data.list;
        //console.log(shdwList);
        editPage.setData({shdwList:shdwList});
        editPage.getCyclSelectData();
      }
    })
  },
  getCyclSelectData:function(){
    wx.request({
      url: rootIP+"getCheLiangSelectList",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let cyclList=res.data.list;
        //console.log(cyclList);
        editPage.setData({cyclList:cyclList});
        editPage.getCysjSelectData();
      }
    })
  },
  getCysjSelectData:function(){
    wx.request({
      url: rootIP+"getSiJiSelectList",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let cysjList=res.data.list;
        //console.log(cysjList);
        editPage.setData({cysjList:cysjList});
        editPage.getDDInfo();
      }
    })
  },
  getDDInfo:function(){
    let id=editPage.data.id;
    wx.request({
      url: rootIP+"getDingDan",
      method: 'POST',
      data: { id:id},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        let dd=data.dd;
        let dfgbjl=data.dfgbjl;
        let yzxzl=dd.yzxzl;
        let lxlx=dd.lxlx;
        let lxlxSelectIndex=editPage.getLxlxIndexInListById(lxlx);
        let sjzl=dd.sjzl;
        let jhysrq=dd.jhysrq;
        let bz=dd.bz;
        let jszl=dd.jszl;
        let bs=dd.bs;
        let ks=dd.ks;
        let dfgbjz=dfgbjl.dfgbjz;
        let dfgbpz=dfgbjl.dfgbpz;
        let dfgbmz=dfgbjl.dfgbmz;
        let dfbdzp=dfgbjl.dfbdzp;
        let dfgbsj=dfgbjl.dfgbsj;
        let yssId=dd.yssId;
        let yssSelectIndex=editPage.getYssIndexInListById(yssId);
        let wzlxId=dd.wzlxId;
        let wzlxSelectIndex=editPage.getWzlxIndexInListById(wzlxId);
        let wzId=dd.wzId;
        let wzSelectIndex=editPage.getWzIndexInListById(wzId);
        let fhdwId=dd.fhdwId;
        let fhdwSelectIndex=editPage.getFhdwIndexInListById(fhdwId);
        let shdwId=dd.shdwId;
        let shdwSelectIndex=editPage.getShdwIndexInListById(shdwId);
        let cyclId=dd.cyclId;
        let cyclSelectIndex=editPage.getCyclIndexInListById(cyclId);
        let cyclSelectCph=dd.cyclCph;
        //console.log(cyclSelectCph)
        let cysjId=dd.cysjId;
        let cysjSelectIndex=editPage.getCysjIndexInListById(cysjId);
        editPage.setData({yzxzl:yzxzl,lxlxSelectId:lxlx,lxlxSelectIndex:lxlxSelectIndex,sjzl:sjzl,jhysrq:jhysrq,bz:bz,jszl:jszl,bs:bs,ks:ks,dfgbjz:dfgbjz,dfgbpz:dfgbpz,dfgbmz:dfgbmz,dfbdzp:serverRootIP+dfbdzp,dfgbsj:dfgbsj,yssSelectId:yssId,yssSelectIndex:yssSelectIndex,wzlxSelectId:wzlxId,wzlxSelectIndex:wzlxSelectIndex,wzSelectId:wzId,wzSelectIndex:wzSelectIndex,fhdwSelectId:fhdwId,fhdwSelectIndex:fhdwSelectIndex,shdwSelectId:shdwId,shdwSelectIndex:shdwSelectIndex,cyclSelectId:cyclId,cyclSelectIndex:cyclSelectIndex,cyclSelectCph:cyclSelectCph,cysjSelectId:cysjId,cysjSelectIndex:cysjSelectIndex});
      }
    })
  },
  getLxlxIndexInListById:function(lxlxId){
    let lxlxSelectIndex;
    let lxlxList=editPage.data.lxlxList;
    //console.log(lxlxList)
    for(let i=0;i<lxlxList.length;i++){
      let lxlx=lxlxList[i];
      if(lxlxId==lxlx.value){
        lxlxSelectIndex=i;
        break;
      }
    }
    return lxlxSelectIndex;
  },
  getYssIndexInListById:function(yssId){
    let yssSelectIndex;
    let yssList=editPage.data.yssList;
    //console.log(yssList)
    for(let i=0;i<yssList.length;i++){
      let yss=yssList[i];
      if(yssId==yss.id){
        yssSelectIndex=i;
        break;
      }
    }
    return yssSelectIndex;
  },
  getWzlxIndexInListById:function(wzlxId){
    let wzlxSelectIndex;
    let wzlxList=editPage.data.wzlxList;
    //console.log(wzlxList)
    for(let i=0;i<wzlxList.length;i++){
      let wzlx=wzlxList[i];
      if(wzlxId==wzlx.id){
        wzlxSelectIndex=i;
        break;
      }
    }
    return wzlxSelectIndex;
  },
  getWzIndexInListById:function(wzId){
    let wzSelectIndex;
    let wzList=editPage.data.wzList;
    //console.log(wzList)
    for(let i=0;i<wzList.length;i++){
      let wz=wzList[i];
      if(wzId==wz.id){
        wzSelectIndex=i;
        break;
      }
    }
    return wzSelectIndex;
  },
  getFhdwIndexInListById:function(fhdwId){
    let fhdwSelectIndex;
    let fhdwList=editPage.data.fhdwList;
    //console.log(fhdwList)
    for(let i=0;i<fhdwList.length;i++){
      let fhdw=fhdwList[i];
      if(fhdwId==fhdw.id){
        fhdwSelectIndex=i;
        break;
      }
    }
    return fhdwSelectIndex;
  },
  getShdwIndexInListById:function(shdwId){
    let shdwSelectIndex;
    let shdwList=editPage.data.shdwList;
    //console.log(shdwList)
    for(let i=0;i<shdwList.length;i++){
      let shdw=shdwList[i];
      if(shdwId==shdw.id){
        shdwSelectIndex=i;
        break;
      }
    }
    return shdwSelectIndex;
  },
  getCyclIndexInListById:function(cyclId){
    let cyclSelectIndex;
    let cyclList=editPage.data.cyclList;
    //console.log(cyclList)
    for(let i=0;i<cyclList.length;i++){
      let cycl=cyclList[i];
      if(cyclId==cycl.id){
        cyclSelectIndex=i;
        break;
      }
    }
    return cyclSelectIndex;
  },
  getCysjIndexInListById:function(cysjId){
    let cysjSelectIndex;
    let cysjList=editPage.data.cysjList;
    //console.log(cysjList)
    for(let i=0;i<cysjList.length;i++){
      let cysj=cysjList[i];
      if(cysjId==cysj.id){
        cysjSelectIndex=i;
        break;
      }
    }
    return cysjSelectIndex;
  },
  takeDfbdzp:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("res.tempFilePaths==="+res.tempFilePaths)
        
        let tempFilePaths=res.tempFilePaths;
        let data=editPage.data;
        if(data.dfbdzp==null)
          editPage.setData({dfbdzp:tempFilePaths[0],tempFilePath:tempFilePaths[0]});
      }
    })
  },
  deleteDfbdzp:function(){
    editPage.setData({dfbdzp:null});
  },
  saving:function(flag){
    if(flag){
      editPage.setData({showSaveBut:false,showSavingBut:true});
    }
    else{
      editPage.setData({showSavingBut:false,showSavedBut:true});
    }
  },
  uploadDfbdzp:function(){
    let ddId=editPage.data.id;
    let dfbdzp=editPage.data.dfbdzp;
    wx.uploadFile({
      url: rootIP+'uploadDuiFangGuoBangJiLuFile', //仅为示例，非真实的接口地址
      filePath: dfbdzp,
      name: 'file',
      formData:{ddId:ddId},
      success: function(res){
        editPage.saving(false);
        setTimeout(() => {
          editPage.goListPage();
        }, 1000);
      }
    })
  }
})