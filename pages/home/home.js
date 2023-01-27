// pages/home/home.js
var home;
var rootIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ddgl_ddzt:1,
    ddgl_dsh:2,
    ddgl_dzj:3,
    ddgl_drk:4,
    ddgl_zhcx:5,
    ddgl_shjl:6,

    gbgl_bdjl:7,
    gbgl_gbjl:8,
    gbgl_yjdsh:9,
    gbgl_ejdsh:10,

    wzgl_wzlx:11,
    wzgl_wzcx:12,

    dwgl_yss:13,
    dwgl_fhdw:14,
    dwgl_shdw:15,
    dwgl_ck:16,

    clgl_dsh:17,
    clgl_zhcx:18,
    clgl_shjl:19,
    clgl_tzcx:20,
    clgl_cntz:21,

    sjgl_dsh:22,
    sjgl_zhcx:23,
    sjgl_shjl:24,

    pdgl_hmzt:25,
    pdgl_hmcx:26,
    pdgl_dlcx:27,

    xtgl_yhxx:28,
    xtgl_yhcx:29,
    xtgl_dshyh:30,
    xtgl_yhshjl:31,
    xtgl_jscx:32,
    xtgl_qxcx:33,
    
    showDdglV:false,
    showDdglDdztV:false,
    showDdglDshV:false,
    showDdglDzjV:false,
    showDdglDrkV:false,
    showDdglZhcxV:false,
    showDdglShjlV:false,

    showGbglV:false,
    showGbglBdjlV:false,
    showGbglGbjlV:false,
    showGbglYjdshV:false,
    showGbglEjdshV:false,

    showWzglV:false,
    showWzglWzlxV:false,
    showWzglWzcxV:false,

    showDwglV:false,
    showDwglYssV:false,
    showDwglFhdwV:false,
    showDwglShdwV:false,
    showDwglCkV:false,

    showClglV:false,
    showClglDshV:false,
    showClglZhcxV:false,
    showClglShjlV:false,
    showClglTzcxV:false,
    showClglCntzV:false,

    showSjglV:false,
    showSjglDshV:false,
    showSjglZhcxV:false,
    showSjglShjlV:false,

    showPdglV:false,
    showPdglHmztV:false,
    showPdglHmcxV:false,
    showPdglDlcxV:false,

    showXtglV:false,
    showXtglYhxxV:false,
    showXtglYhcxV:false,
    showXtglDshyhV:false,
    showXtglYhshjlV:false,
    showXtglJscxV:false,
    showXtglQxcxV:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    home=this;
    rootIP=getApp().getRootIP();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    home.getConstantFlagMap();
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
        //home.setData({constantFlagMap:constantFlagMap});
        let yhQx=constantFlagMap.yhQx;
        let constantFlags=yhQx;
        home.getConstantMap(constantFlags);
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
        home.setData({constantMap:constantMap});
        home.showMenuByQx();
      }
    })
  },
  showMenuByQx:function(){
    let data=home.data;
    let showDdglV=data.showDdglV;
    let showDdglDdztV=data.showDdglDdztV;
    let showDdglDshV=data.showDdglDshV;
    let showDdglDzjV=data.showDdglDzjV;
    let showDdglDrkV=data.showDdglDrkV;
    let showDdglZhcxV=data.showDdglZhcxV;
    let showDdglShjlV=data.showDdglShjlV;

    let showGbglV=data.showGbglV;
    let showGbglBdjlV=data.showGbglBdjlV;
    let showGbglGbjlV=data.showGbglGbjlV;
    let showGbglYjdshV=data.showGbglYjdshV;
    let showGbglEjdshV=data.showGbglEjdshV;

    let showWzglV=data.showWzglV;
    let showWzglWzlxV=data.showWzglWzlxV;
    let showWzglWzcxV=data.showWzglWzcxV;

    let showDwglV=data.showDwglV;
    let showDwglYssV=data.showDwglYssV;
    let showDwglFhdwV=data.showDwglFhdwV;
    let showDwglShdwV=data.showDwglShdwV;
    let showDwglCkV=data.showDwglCkV;

    let showClglV=data.showClglV;
    let showClglDshV=data.showClglDshV;
    let showClglZhcxV=data.showClglZhcxV;
    let showClglShjlV=data.showClglShjlV;
    let showClglTzcxV=data.showClglTzcxV;
    let showClglCntzV=data.showClglCntzV;

    let showSjglV=data.showSjglV;
    let showSjglDshV=data.showSjglDshV;
    let showSjglZhcxV=data.showSjglZhcxV;
    let showSjglShjlV=data.showSjglShjlV;
    
    let showPdglV=data.showPdglV;
    let showPdglHmztV=data.showPdglHmztV;
    let showPdglHmcxV=data.showPdglHmcxV;
    let showPdglDlcxV=data.showPdglDlcxV;
    
    let showXtglV=data.showXtglV;
    let showXtglYhxxV=data.showXtglYhxxV;
    let showXtglYhcxV=data.showXtglYhcxV;
    let showXtglDshyhV=data.showXtglDshyhV;
    let showXtglYhshjlV=data.showXtglYhshjlV;
    let showXtglJscxV=data.showXtglJscxV;
    let showXtglQxcxV=data.showXtglQxcxV;

    let yongHu=wx.getStorageSync("yongHu");
    let yhm=yongHu.yhm;
    if(yhm=="admin"){
      showDdglV=true;
      showDdglDdztV=true;
      showDdglDshV=true;
      showDdglDzjV=true;
      showDdglDrkV=true;
      showDdglZhcxV=true;
      showDdglShjlV=true;

      showGbglV=true;
      showGbglBdjlV=true;
      showGbglGbjlV=true;
      showGbglYjdshV=true;
      showGbglEjdshV=true;

      showWzglV=true;
      showWzglWzlxV=true;
      showWzglWzcxV=true;

      showDwglV=true;
      showDwglYssV=true;
      showDwglFhdwV=true;
      showDwglShdwV=true;
      showDwglCkV=true;

      showClglV=true;
      showClglDshV=true;
      showClglZhcxV=true;
      showClglShjlV=true;
      showClglTzcxV=true;
      showClglCntzV=true;

      showSjglV=true;
      showSjglDshV=true;
      showSjglZhcxV=true;
      showSjglShjlV=true;
      
      showPdglV=true;
      showPdglHmztV=true;
      showPdglHmcxV=true;
      showPdglDlcxV=true;

      showXtglV=true;
      showXtglYhxxV=true;
      showXtglYhcxV=true;
      showXtglDshyhV=true;
      showXtglYhshjlV=true;
      showXtglJscxV=true;
      showXtglQxcxV=true;
    }
    else{
      let yhQxMap=home.data.constantMap.yhQxMap;
      let ddztcxQx=yhQxMap.ddztcxQx;
      let xdshQx=yhQxMap.xdshQx;
      let zjshQx=yhQxMap.zjshQx;
      let cxddQx=yhQxMap.cxddQx;
      let zxhshQx=yhQxMap.zxhshQx;
      let cxbdjlQx=yhQxMap.cxbdjlQx;
      let cxgbjlQx=yhQxMap.cxgbjlQx;
      let yjshQx=yhQxMap.yjshQx;
      let ejshQx=yhQxMap.ejshQx;
      let cxwzlxQx=yhQxMap.cxwzlxQx;
      let cxwzQx=yhQxMap.cxwzQx;
      let cxyssQx=yhQxMap.cxyssQx;
      let cxfhdwQx=yhQxMap.cxfhdwQx;
      let cxshdwQx=yhQxMap.cxshdwQx;
      let cxckQx=yhQxMap.cxckQx;
      let shclQx=yhQxMap.shclQx;
      let cxclQx=yhQxMap.cxclQx;
      let cxclshjlQx=yhQxMap.cxclshjlQx;
      let cxcltzQx=yhQxMap.cxcltzQx;
      let shsjQx=yhQxMap.shsjQx;
      let cxsjQx=yhQxMap.cxsjQx;
      let cxsjshjlQx=yhQxMap.cxsjshjlQx;
      let pdhmztcxQx=yhQxMap.pdhmztcxQx;
      let cxpdhmQx=yhQxMap.cxpdhmQx;
      let cxdlQx=yhQxMap.cxdlQx;
      let cxyhQx=yhQxMap.cxyhQx;
      let shyhQx=yhQxMap.shyhQx;
      let cxyhshjlQx=yhQxMap.cxyhshjlQx;
      let cxjsQx=yhQxMap.cxjsQx;
      let cxddshjlQx=yhQxMap.cxddshjlQx;
      let qxIds=yongHu.qxIds;
      console.log(qxIds)
      let qxIdArr=qxIds.split(",");
      for(let i=0;i<qxIdArr.length;i++){
        if(qxIdArr[i]==ddztcxQx){
          showDdglDdztV=true;
          showClglZhcxV=true;
        }
        if(qxIdArr[i]==xdshQx){
          showDdglDshV=true;
        }
        if(qxIdArr[i]==zjshQx){
          showDdglDzjV=true;
        }
        if(qxIdArr[i]==cxddQx){
          showDdglZhcxV=true;
        }
        if(qxIdArr[i]==zxhshQx){
          showDdglDrkV=true;
        }
        if(qxIdArr[i]==cxddshjlQx){
          showDdglShjlV=true;
        }
        if(qxIdArr[i]==cxbdjlQx){
          showGbglBdjlV=true;
        }
        if(qxIdArr[i]==cxgbjlQx){
          showGbglGbjlV=true;
        }
        if(qxIdArr[i]==yjshQx){
          showGbglYjdshV=true;
        }
        if(qxIdArr[i]==ejshQx){
          showGbglEjdshV=true;
        }
        if(qxIdArr[i]==cxwzlxQx){
          showWzglWzlxV=true;
        }
        if(qxIdArr[i]==cxwzQx){
          showWzglWzcxV=true;
        }
        if(qxIdArr[i]==cxyssQx){
          showDwglYssV=true;
        }
        if(qxIdArr[i]==cxfhdwQx){
          showDwglFhdwV=true;
        }
        if(qxIdArr[i]==cxshdwQx){
          showDwglShdwV=true;
        }
        if(qxIdArr[i]==cxckQx){
          showDwglCkV=true;
        }
        if(qxIdArr[i]==shclQx){
          showClglDshV=true;
        }
        if(qxIdArr[i]==cxclQx){
          showClglZhcxV=true;
        }
        if(qxIdArr[i]==cxclshjlQx){
          showClglShjlV=true;
        }
        if(qxIdArr[i]==cxcltzQx){
          showClglTzcxV=true;
          showClglCntzV=true;
        }
        if(qxIdArr[i]==shsjQx){
          showSjglDshV=true;
        }
        if(qxIdArr[i]==cxsjQx){
          showSjglZhcxV=true;
        }
        if(qxIdArr[i]==cxsjshjlQx){
          showSjglShjlV=true;
        }
        if(qxIdArr[i]==pdhmztcxQx){
          showPdglHmztV=true;
        }
        if(qxIdArr[i]==cxpdhmQx){
          showPdglHmcxV=true;
        }
        if(qxIdArr[i]==cxdlQx){
          showPdglDlcxV=true;
        }
        if(qxIdArr[i]==cxyhQx){
          showXtglYhcxV=true;
        }
        if(qxIdArr[i]==shyhQx){
          showXtglDshyhV=true;
        }
        if(qxIdArr[i]==cxyhshjlQx){
          showXtglYhshjlV=true;
        }
        if(qxIdArr[i]==cxjsQx){
          showXtglJscxV=true;
        }
      }
      if(showDdglDdztV||showDdglDshV||showDdglDzjV||showDdglZhcxV||showDdglDrkV||showDdglShjlV){
        showDdglV=true;
      }
      if(showGbglBdjlV||showGbglGbjlV||showGbglYjdshV||showGbglEjdshV){
        showGbglV=true;
      }
      if(showWzglWzlxV||showWzglWzcxV){
        showWzglV=true;
      }
      if(showDwglYssV||showDwglFhdwV||showDwglShdwV||showDwglCkV){
        showDwglV=true;
      }
      if(showClglDshV||showClglZhcxV||showClglShjlV||showClglTzcxV||showClglCntzV){
        showClglV=true;
      }
      if(showSjglDshV||showSjglZhcxV||showSjglShjlV){
        showSjglV=true;
      }
      if(showPdglHmztV||showPdglHmcxV||showPdglDlcxV){
        showPdglV=true;
      }
      if(showXtglYhcxV||showXtglDshyhV||showXtglYhshjlV||showXtglJscxV){
        showXtglV=true;
      }
    }
    home.setData({
      showDdglV:showDdglV,
      showDdglDdztV:showDdglDdztV,
      showDdglDshV:showDdglDshV,
      showDdglDzjV:showDdglDzjV,
      showDdglDrkV:showDdglDrkV,
      showDdglZhcxV:showDdglZhcxV,
      showDdglShjlV:showDdglShjlV,

      showGbglV:showGbglV,
      showGbglBdjlV:showGbglBdjlV,
      showGbglGbjlV:showGbglGbjlV,
      showGbglYjdshV:showGbglYjdshV,
      showGbglEjdshV:showGbglEjdshV,

      showWzglV:showWzglV,
      showWzglWzlxV:showWzglWzlxV,
      showWzglWzcxV:showWzglWzcxV,

      showDwglV:showDwglV,
      showDwglYssV:showDwglYssV,
      showDwglFhdwV:showDwglFhdwV,
      showDwglShdwV:showDwglShdwV,
      showDwglCkV:showDwglCkV,

      showClglV:showClglV,
      showClglDshV:showClglDshV,
      showClglZhcxV:showClglZhcxV,
      showClglShjlV:showClglShjlV,
      showClglTzcxV:showClglTzcxV,
      showClglCntzV:showClglCntzV,

      showSjglV:showSjglV,
      showSjglDshV:showSjglDshV,
      showSjglZhcxV:showSjglZhcxV,
      showSjglShjlV:showSjglShjlV,
      
      showPdglV:showPdglV,
      showPdglHmztV:showPdglHmztV,
      showPdglHmcxV:showPdglHmcxV,
      showPdglDlcxV:showPdglDlcxV,

      showXtglV:showXtglV,
      showXtglYhxxV:showXtglYhxxV,
      showXtglYhcxV:showXtglYhcxV,
      showXtglDshyhV:showXtglDshyhV,
      showXtglYhshjlV:showXtglYhshjlV,
      showXtglJscxV:showXtglJscxV,
      showXtglQxcxV:showXtglQxcxV,
    });
  },
  goPage:function(e){
    let pageFlag=e.currentTarget.dataset.pageflag;
    let url="/pages/";
    console.log(pageFlag)
    switch (pageFlag) {
      case home.data.ddgl_ddzt:
        url+='ddgl/ddzt/list';
        break;
      case home.data.ddgl_dsh:
        url+='ddgl/dsh/list';
        break;
      case home.data.ddgl_dzj:
        url+='ddgl/dzj/list';
        break;
      case home.data.ddgl_drk:
        url+='ddgl/drk/list';
        break;
      case home.data.ddgl_zhcx:
        url+='ddgl/zhcx/list';
        break;
      case home.data.ddgl_shjl:
        url+='ddgl/shjl/list';
        break;
      case home.data.gbgl_bdjl:
        url+='gbgl/bdjl/list';
        break;
      case home.data.gbgl_gbjl:
        url+='gbgl/gbjl/list';
        break;
      case home.data.gbgl_yjdsh:
        url+='gbgl/yjdsh/list';
        break;
      case home.data.gbgl_ejdsh:
        url+='gbgl/ejdsh/list';
        break;
      case home.data.wzgl_wzlx:
        url+='wzgl/wzlx/list';
        break;
      case home.data.wzgl_wzcx:
        url+='wzgl/wzcx/list';
        break;
      case home.data.dwgl_yss:
        url+='dwgl/yss/list';
        break;
      case home.data.dwgl_fhdw:
        url+='dwgl/fhdw/list';
        break;
      case home.data.dwgl_shdw:
        url+='dwgl/shdw/list';
        break;
      case home.data.dwgl_ck:
        url+='dwgl/ck/list';
        break;
      case home.data.clgl_dsh:
        url+='clgl/dsh/list';
        break;
      case home.data.clgl_zhcx:
        url+='clgl/zhcx/list';
        break;
      case home.data.clgl_shjl:
        url+='clgl/shjl/list';
        break;
      case home.data.clgl_tzcx:
        url+='clgl/tzcx/list';
        break;
      case home.data.clgl_cntz:
        url+='clgl/cntz/list';
        break;
      case home.data.sjgl_dsh:
        url+='sjgl/dsh/list';
        break;
      case home.data.sjgl_zhcx:
        url+='sjgl/zhcx/list';
        break;
      case home.data.sjgl_shjl:
        url+='sjgl/shjl/list';
        break;
      case home.data.pdgl_hmzt:
        url+='pdgl/hmzt/list';
        break;
      case home.data.pdgl_hmcx:
        url+='pdgl/hmcx/list';
        break;
      case home.data.pdgl_dlcx:
        url+='pdgl/dlcx/list';
        break;
      case home.data.xtgl_yhxx:
        url+='xtgl/yhxx/list';
        break;
      case home.data.xtgl_yhcx:
        url+='xtgl/yhcx/list';
        break;
      case home.data.xtgl_dshyh:
        url+='xtgl/dshyh/list';
        break;
      case home.data.xtgl_yhshjl:
        url+='xtgl/yhshjl/list';
        break;
      case home.data.xtgl_jscx:
        url+='xtgl/jscx/list';
        break;
      case home.data.xtgl_qxcx:
        url+='xtgl/qxcx/list';
        break;
    }
    wx.redirectTo({
      url: url,
    })
  }
})