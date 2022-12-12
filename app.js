// app.js
var rootIP = "http://192.168.40.1:8080/ZnczCxtc/phone/";
var serverRootIP = "http://192.168.40.1:8080/";
//var rootIP = "http://192.168.0.103:8080/ZnczCxtc/phone/";
//var serverRootIP = "http://192.168.0.103:8080/";

var syLxlx=1;
var qyLxlx=2;
var syLxlxMc="送运";
var qyLxlxMc="取运";
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  },
  getRootIP:function(){
    return rootIP;
  },
  getServerRootIP:function(){
    return serverRootIP;
  },
  getLxlxMcById:function(lxlxId){
    var str;
    switch (lxlxId) {
      case syLxlx:
        str=syLxlxMc;//送运
        break;
      case qyLxlx:
        str=qyLxlxMc;//取运
        break;
    }
    return str;
  }
})
