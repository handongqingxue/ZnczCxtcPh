// pages/test/datePicker.js
//参考链接:https://www.jb51.net/article/254855.htm
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerIndexList: [0, 0, 0],//日期选择器下标
    //isShowDateLayer: false,//是否显示日期弹层
    isShowDateLayer: true,//是否显示日期弹层
    txtDate: '請选择提貨日期',//选中日期
    isSeltDate: false,//是否选择日期
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  // 截获竖向滑动
    catchTouchMove: function (res) {
    return true;
  },
 
  //获取天数列表
  getDayList: function (year, month) {
    var that = this;
    var dayList;
    switch (month + 1) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12: dayList = that.getDayNum(31);
        break;
      case 4:
      case 6:
      case 9:
      case 11: dayList = that.getDayNum(30);
        break;
      case 2: dayList = that.getDayNum((that.data.yearList[year] % 4 == 0 && that.data.yearList[year] % 100 != 0 || that.data.yearList[year] % 400 == 0) ? 29 : 28);
        break;
    }
    return dayList;
  },
 
  //获取天数
  getDayNum: function (num) {
    var dayList = [];
    for (var i = 1; i <= num; i++) {
      dayList.push(i);
    }
    return dayList;
  },
 
  //打开选择日期弹层
  bindOpenDateLayer: function (e) {
    var that = this;
    var pickerIndexList = that.data.pickerIndexList;
    that.setData({
      isShowDateLayer: !that.data.isShowDateLayer,
      dayList: that.getDayList(pickerIndexList[0], pickerIndexList[1]),
    })
  },
 
  //日期选择改变事件
  bindChangeDate: function (e) {
    var that = this;
    var pickerColumnList = e.detail.value;
    that.setData({
      dayList: that.getDayList(pickerColumnList[0], pickerColumnList[1]),
      pickerIndexList: pickerColumnList,
    })
  },
 
  //选择日期弹层确定按钮
  bindConfirmDate: function (e) {
    var that = this;
    var pickerIndexList = that.data.pickerIndexList;
    var txtDate = that.data.yearList[pickerIndexList[0]] + '-' + that.data.monthList[pickerIndexList[1]] + '-' + that.data.dayList[pickerIndexList[2]];
    console.log(txtDate)
    that.setData({
      isShowDateLayer: false,
      pickerIndexList,
      txtDate,
      isSeltDate: true,
    })
  },
 
  //选择日期弹层取消按钮
  bindCancelDate: function (e) {
    var that = this;
    var pickerIndexList = that.data.pickerIndexList;
    that.setData({
      isShowDateLayer: !that.data.isShowDateLayer,
    })
    var yearList = that.data.yearList;
    var monthList = that.data.monthList;
    var txtDate = that.data.txtDate;
    var yearIndex = yearList.findIndex(o => o == parseInt(txtDate.slice(0, txtDate.indexOf('-'))));//年份下标
    var monthIndex = monthList.findIndex(o => o == parseInt(txtDate.slice(txtDate.indexOf('-') + 1, txtDate.lastIndexOf('-'))));//月份下标
    var dayList = that.getDayList(yearIndex, monthIndex);//天数
    if (that.data.isSeltDate) {//选择过日期
      if (txtDate == (yearList[pickerIndexList[0]] + '-' + monthList[pickerIndexList[1]] + '-' + dayList[pickerIndexList[2]]))
        that.setData({ pickerIndexList })
      else
        that.setData({ pickerIndexList: [yearIndex, monthIndex, dayList.findIndex(o => o == parseInt(txtDate.slice(txtDate.lastIndexOf('-') + 1, txtDate.length)))] })
    } else {//未选择过日期
      that.setData({
        //pickerIndexList: app.globalData.dateIndexList,
      })
    }
  },
 
  //阻止冒泡事件
  catchLayer: function (e) { },
 
  //獲取當前日期
  getCurrentDate: function (e) {
    var that = this;
    var yearList = [], monthList = [], dayList = [];
    for (var i = new Date().getFullYear(); i <= 2050; i++) {//年份
      yearList.push(i);
    }
    for (var i = 1; i <= 12; i++) {//月份
      monthList.push(i);
    }
    var myDate = new Date();
    var currentYearIndex = yearList.findIndex(o => o == myDate.getFullYear());
    var currentMonthIndex = monthList.findIndex(o => o == myDate.getMonth() + 1);
    var dayList = that.getDayList(currentYearIndex, currentMonthIndex);//天
    var currentDayIndex = dayList.findIndex(o => o == myDate.getDate());
    var pickerIndexList = that.data.pickerIndexList;
    pickerIndexList[0] = currentYearIndex;
    pickerIndexList[1] = currentMonthIndex;
    pickerIndexList[2] = currentDayIndex;
    console.log(pickerIndexList)
    //app.globalData.dateIndexList = pickerIndexList;
    that.setData({
      yearList,
      monthList,
      dayList,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getCurrentDate();//獲取當前時間
    that.setData({
      pickerIndexList: that.data.pickerIndexList
    })
  }
})