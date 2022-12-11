// pages/test/multipleSelect.js
//原文链接：https://blog.csdn.net/u013306050/article/details/124928543
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: [{
      tag: 1,
      name: '10:00',
      type : ""
    }, {
      tag: 2,
      name: '12:00',
      type : ""
    }, {
      tag: 3,
      name: '14:00',
      type : ""
    }, {
      tag: 4,
      name: '20:00',
      type : ""
    }]
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
  choose_item:function(e){
    var index=e.currentTarget.dataset.index;
    var data =  this.data.array[index];
    if(data['type'] == 'choosed'){
      data['type'] = ''
    }else{
      data['type'] = 'choosed'
    }
    console.log("index==="+index);
    console.log("data==="+JSON.stringify(data));
    this.data.array[index] = data
    this.setData({
      array: this.data.array
    })
  }
})