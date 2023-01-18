// pages/home/home.js
var home;
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    home=this;

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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