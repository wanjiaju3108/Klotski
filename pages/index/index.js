//index.js
//获取应用实例
const app = getApp()

Page({
  chooseLevel: function(e) {
    var n = e.currentTarget.id
    this.setData({

    })
    wx.navigateTo({
      url: '/pages/game/game?level=' + n
    })
  }
})