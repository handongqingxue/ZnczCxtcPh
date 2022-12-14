// pages/ddgl/zhcx/new.js
var newPage;
var rootIP;
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
    newPage=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    newPage.getYssSelectData();
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
  checkNew:function(){
    if(newPage.checkYzxzl()){
      if(newPage.checkLXLXId()){
        if(newPage.checkJHYSRQ()){
          if(newPage.checkYSSId()){
            if(newPage.checkWZLXId()){
              if(newPage.checkWZId()){
                if(newPage.checkFHDWId()){
                  if(newPage.checkSHDWId()){
                    if(newPage.checkCYCLId()){
                      if(newPage.checkCYSJId()){
                        newPage.newDingDan();
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
  newDingDan:function(){
    newPage.saving(true);
    let yzxzl=newPage.data.yzxzl;
    let lxlxSelectId=newPage.data.lxlxSelectId;
    let sjzl=newPage.data.sjzl;
    let jhysrq=newPage.data.jhysrq;
    let bz=newPage.data.bz;
    let jszl=newPage.data.jszl;
    let bs=newPage.data.bs;
    let ks=newPage.data.ks;
    let dfgbjz=newPage.data.dfgbjz;
    let dfgbpz=newPage.data.dfgbpz;
    let dfgbmz=newPage.data.dfgbmz;
    let dfgbsj=newPage.data.dfgbsj;
    let yssSelectId=newPage.data.yssSelectId;
    let wzlxSelectId=newPage.data.wzlxSelectId;
    let wzSelectId=newPage.data.wzSelectId;
    let fhdwSelectId=newPage.data.fhdwSelectId;
    let shdwSelectId=newPage.data.shdwSelectId;
    let cyclSelectId=newPage.data.cyclSelectId;
    let cyclSelectCph=newPage.data.cyclSelectCph;
    let cysjSelectId=newPage.data.cysjSelectId;
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
      url: rootIP+"newDingDan",
      data:{yzxzl:yzxzl,lxlx:lxlxSelectId,sjzl:sjzl,jhysrq:jhysrq,bz:bz,jszl:jszl,bs:bs,ks:ks,dfgbjz:dfgbjz,dfgbpz:dfgbpz,dfgbmz:dfgbmz,dfgbsj:dfgbsj,yssId:yssSelectId,wzlxId:wzlxSelectId,wzId:wzSelectId,fhdwId:fhdwSelectId,shdwId:shdwSelectId,cyclId:cyclSelectId,cyclCph:cyclSelectCph,cysjId:cysjSelectId},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        let data=res.data;
        let message=data.message;
        console.log("message==="+message)
        if(message=="ok"){
          let dfbdzp=newPage.data.dfbdzp;
          //console.log("dfbdzp==="+dfbdzp)
          if(dfbdzp==null){
            newPage.saving(false);
            wx.showToast({
              title: data.info,
            })
            setTimeout(() => {
              newPage.goListPage();
            }, 1000);
          }
          else{
            console.log("ddId==="+data.ddId);
            newPage.setData({ddId:data.ddId});
            newPage.uploadDfbdzp(); 
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
      newPage.setData({yzxzl:yzxzl});
    }
    else if(e.currentTarget.id=="sjzl_inp"){
      let sjzl=e.detail.value;
      newPage.setData({sjzl:sjzl});
    }
    else if(e.currentTarget.id=="bz_inp"){
      let bz=e.detail.value;
      newPage.setData({bz:bz});
    }
    else if(e.currentTarget.id=="jszl_inp"){
      let jszl=e.detail.value;
      newPage.setData({jszl:jszl});
    }
    else if(e.currentTarget.id=="bs_inp"){
      let bs=e.detail.value;
      newPage.setData({bs:bs});
    }
    else if(e.currentTarget.id=="ks_inp"){
      let ks=e.detail.value;
      newPage.setData({ks:ks});
    }
    else if(e.currentTarget.id=="dfgbjz_inp"){
      let dfgbjz=e.detail.value;
      newPage.setData({dfgbjz:dfgbjz});
    }
    else if(e.currentTarget.id=="dfgbpz_inp"){
      let dfgbpz=e.detail.value;
      newPage.setData({dfgbpz:dfgbpz});
    }
    else if(e.currentTarget.id=="dfgbmz_inp"){
      let dfgbmz=e.detail.value;
      newPage.setData({dfgbmz:dfgbmz});
    }
  },
  focusYzxzl:function(){
    let yzxzl=newPage.data.yzxzl;
    if(yzxzl=="预装卸重量不能为空"){
      newPage.setData({yzxzl:''});
    }
  },
  checkYzxzl:function(){
    let yzxzl=newPage.data.yzxzl;
    if(yzxzl==""||yzxzl==null||yzxzl=="预装卸重量不能为空"){
      newPage.setData({yzxzl:'预装卸重量不能为空'});
      return false;
    }
    else{
      return true;
    }
  },
  checkLXLXId:function(){
    let lxlxSelectId=newPage.data.lxlxSelectId;
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
    let jhysrq=newPage.data.jhysrq;
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
    let yssSelectId=newPage.data.yssSelectId;
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
    let wzlxSelectId=newPage.data.wzlxSelectId;
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
    let wzSelectId=newPage.data.wzSelectId;
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
    let fhdwSelectId=newPage.data.fhdwSelectId;
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
    let shdwSelectId=newPage.data.shdwSelectId;
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
    let cyclSelectId=newPage.data.cyclSelectId;
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
    let cysjSelectId=newPage.data.cysjSelectId;
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
    newPage.setData({
      showLxlxOption: !newPage.data.showLxlxOption,
    });
  },
  // 点击下拉显示框
  showYssOption() {
    newPage.setData({
      showYssOption: !newPage.data.showYssOption,
    });
  },
  // 点击下拉显示框
  showWzlxOption() {
    newPage.setData({
      showWzlxOption: !newPage.data.showWzlxOption,
    });
  },
  // 点击下拉显示框
  showWzOption() {
    newPage.setData({
      showWzOption: !newPage.data.showWzOption,
    });
  },
  // 点击下拉显示框
  showFhdwOption() {
    newPage.setData({
      showFhdwOption: !newPage.data.showFhdwOption,
    });
  },
  // 点击下拉显示框
  showShdwOption() {
    newPage.setData({
      showShdwOption: !newPage.data.showShdwOption,
    });
  },
  // 点击下拉显示框
  showCyclOption() {
    newPage.setData({
      showCyclOption: !newPage.data.showCyclOption,
    });
  },
  // 点击下拉显示框
  showCysjOption() {
    newPage.setData({
      showCysjOption: !newPage.data.showCysjOption,
    });
  },
  // 点击下拉列表
  selectLxlxOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let lxlxList=newPage.data.lxlxList;
    let lxlx=lxlxList[index];
    console.log(index+","+lxlx.value+","+lxlx.text);
    newPage.setData({
      lxlxSelectIndex: index,
      lxlxSelectId: lxlx.value,
      showLxlxOption: !newPage.data.showLxlxOption
    });
  },
  // 点击下拉列表
  selectYssOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let yssList=newPage.data.yssList;
    let yss=yssList[index];
    console.log(index+","+yss.id+","+yss.mc);
    newPage.setData({
      yssSelectIndex: index,
      yssSelectId: yss.id,
      showYssOption: !newPage.data.showYssOption
    });
  },
  // 点击下拉列表
  selectWzlxOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let wzlxList=newPage.data.wzlxList;
    let wzlx=wzlxList[index];
    console.log(index+","+wzlx.id+","+wzlx.mc);
    newPage.setData({
      wzlxSelectIndex: index,
      wzlxSelectId: wzlx.id,
      showWzlxOption: !newPage.data.showWzlxOption
    });
  },
  // 点击下拉列表
  selectWzOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let wzList=newPage.data.wzList;
    let wz=wzList[index];
    console.log(index+","+wz.id+","+wz.mc);
    newPage.setData({
      wzSelectIndex: index,
      wzSelectId: wz.id,
      showWzOption: !newPage.data.showWzOption
    });
  },
  // 点击下拉列表
  selectFhdwOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let fhdwList=newPage.data.fhdwList;
    let fhdw=fhdwList[index];
    console.log(index+","+fhdw.id+","+fhdw.mc);
    newPage.setData({
      fhdwSelectIndex: index,
      fhdwSelectId: fhdw.id,
      showFhdwOption: !newPage.data.showFhdwOption
    });
  },
  // 点击下拉列表
  selectShdwOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let shdwList=newPage.data.shdwList;
    let shdw=shdwList[index];
    console.log(index+","+shdw.id+","+shdw.mc);
    newPage.setData({
      shdwSelectIndex: index,
      shdwSelectId: shdw.id,
      showShdwOption: !newPage.data.showShdwOption
    });
  },
  // 点击下拉列表
  selectCyclOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let cyclList=newPage.data.cyclList;
    let cycl=cyclList[index];
    console.log(index+","+cycl.id+","+cycl.cph);
    newPage.setData({
      cyclSelectIndex: index,
      cyclSelectId: cycl.id,
      cyclSelectCph: cycl.cph,
      showCyclOption: !newPage.data.showCyclOption
    });
  },
  // 点击下拉列表
  selectCysjOption(e) {
    let index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    let cysjList=newPage.data.cysjList;
    let cysj=cysjList[index];
    console.log(index+","+cysj.id+","+cysj.xm);
    newPage.setData({
      cysjSelectIndex: index,
      cysjSelectId: cysj.id,
      showCysjOption: !newPage.data.showCysjOption
    });
  },
  pickerJhysrqChange:function(e){
    let value = e.detail.value;
    console.log(value)
    newPage.setData({jhysrq:value});
  },
  pickerJhysrqCancel:function(){
    newPage.setData({jhysrq:''});
  },
  onPickerDfgbsjChange: function (e) {
    console.log("dateString==="+e.detail.dateString)
    newPage.setData({
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
        newPage.setData({yssList:yssList});
        newPage.getWzlxSelectData();
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
        newPage.setData({wzlxList:wzlxList});
        newPage.getWzSelectData(wzlxList[0].id);
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
        newPage.setData({wzList:wzList});
        newPage.getFhdwSelectData();
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
        newPage.setData({fhdwList:fhdwList});
        newPage.getShdwSelectData();
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
        newPage.setData({shdwList:shdwList});
        newPage.getCyclSelectData();
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
        newPage.setData({cyclList:cyclList});
        newPage.getCysjSelectData();
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
        newPage.setData({cysjList:cysjList});
      }
    })
  },
  takeDfbdzp:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log("res.tempFilePaths==="+res.tempFilePaths)
        
        let tempFilePaths=res.tempFilePaths;
        let data=newPage.data;
        if(data.dfbdzp==null)
          newPage.setData({dfbdzp:tempFilePaths[0]});
      }
    })
  },
  deleteDfbdzp:function(){
    newPage.setData({dfbdzp:null});
  },
  saving:function(flag){
    if(flag){
      newPage.setData({showSaveBut:false,showSavingBut:true});
    }
    else{
      newPage.setData({showSavingBut:false,showSavedBut:true});
    }
  },
  uploadDfbdzp:function(){
    let ddId=newPage.data.ddId;
    let dfbdzp=newPage.data.dfbdzp;
    wx.uploadFile({
      url: rootIP+'uploadDuiFangGuoBangJiLuFile', //仅为示例，非真实的接口地址
      filePath: dfbdzp,
      name: 'file',
      formData:{ddId:ddId},
      success: function(res){
        newPage.saving(false);
        setTimeout(() => {
          newPage.goListPage();
        }, 1000);
      }
    })
  }
})