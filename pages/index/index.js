//index.js
//获取应用实例
const app = getApp()

var level
Page({
  data: {
    level: 1
  },
  chooseLevel: function(e) {
    var n = e.currentTarget.id
    this.setData({
      
    })
    wx.navigateTo({
      url: '/pages/game/game'
    })
  },
  onLoad: function() {
    wx.getStorage({
      key: "level",
      success: (res) => {
        level = res.data
        if (level == undefined) {
          level = 1
        }
      }
    })
  }
})