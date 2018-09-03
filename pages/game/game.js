//game.js
//获取应用实例
import Pool from '../pool/Pool.js'
import Person from '../person/Person.js'
import levelInfo from '../config/config.js'

var canMove = true
var directions = null
var currentLevel
var count = 0
var currentPersonX
var currentPersonY
Page({
  data: {
    wall: null,
    unitLength: null,
    caocao: null,
    border: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    countText: "步数：0",
    isPass: false,
    personPool: null
  },
  sceneInit: function() {
    var zoom = 0.1
    var wall = new Object()
    wall.x = zoom * wx.getSystemInfoSync().windowWidth
    wall.y = zoom * wx.getSystemInfoSync().windowHeight
    wall.w = (1 - zoom * 2) * wx.getSystemInfoSync().windowWidth
    wall.h = (1 - zoom * 2) * wx.getSystemInfoSync().windowHeight
    if (wall.w / 4 > wall.h / 5) {
      wall.x = wall.x + 0.5 * (wall.w - wall.h / 5 * 4)
      wall.x = wall.h / 5 * 4
    } else if (wall.w / 4 < wall.h / 5) {
      wall.y = wall.y + 0.5 * (wall.h - wall.w / 4 * 5)
      wall.h = wall.w / 4 * 5
    }
    var unitLength = wall.w / 4
    this.setData({
      wall: wall,
      unitLength: unitLength
    })
  },
  gameInit(level) {
    var personPool = new Pool
    var unitLength = this.data.unitLength
    for (var i = 0; i < 10; i++) {
      var person = new Person
      currentLevel = level
      var levelConfig = levelInfo["level" + level][i]
      person.init(levelConfig[0], levelConfig[1], levelConfig[2], levelConfig[3], levelConfig[4], unitLength)
      personPool.addPerson(person)
    }
    this.setData({
      personPool: personPool
    })
  },
  ts: function(e) {
    if (!this.data.isPass) {
      var n = e.currentTarget.id
      var border = this.data.border
      border[n] = 7
      this.setData({
        border: border
      })
      this.setDirections(n)
      var person = this.data.personPool.persons[n]
      currentPersonX = person.x
      currentPersonY = person.y
    }
  },
  tm: function(e) {
    if (canMove && !this.data.isPass) {
      var n = e.currentTarget.id
      var unitLength = this.data.unitLength
      var wall = this.data.wall
      var top = wall.y + 10
      var left = wall.x + 10
      var personPool = this.data.personPool
      var person = personPool.persons[n]
      var x = (e.touches[0].pageX - left) / unitLength
      var y = (e.touches[0].pageY - top) / unitLength
      if (directions[0] > 0) {
        if (y < person.y && y > person.y - 1) {
          personPool.persons[n].setPosition(person.x, Math.floor(y))
          this.setData({
            personPool: personPool
          })
          canMove = false
          this.setDirections(n)
          canMove = true
        }
      }
      if (directions[1] > 0) {
        if (y > person.y + 1 && y < person.y + 2) {
          personPool.persons[n].setPosition(person.x, Math.floor(y))
          this.setData({
            personPool: personPool
          })
          canMove = false
          this.setDirections(n)
          canMove = true
        }
      }
      if (directions[2] > 0) {
        if (x < person.x && x > person.x - 1) {
          personPool.persons[n].setPosition(Math.floor(x), person.y)
          this.setData({
            personPool: personPool
          })
          canMove = false
          this.setDirections(n)
          canMove = true
        }
      }
      if (directions[3] > 0) {
        if (x > person.x + 1 && x < person.x + 2) {
          personPool.persons[n].setPosition(Math.floor(x), person.y)
          this.setData({
            personPool: personPool
          })
          canMove = false
          this.setDirections(n)
          canMove = true
        }
      }
    }
  },
  te: function(e) {
    if (!this.data.isPass) {
      this.setData({
        border: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      })
      var n = e.currentTarget.id
      var person = this.data.personPool.persons[n]
      if (currentPersonX != person.x || currentPersonY != person.y) {
        count++
        this.setData({
          countText: "步数：" + count
        })
      }
      this.checkPass()
    }
  },
  onLoad: function(option) {
    var level = option.level
    this.sceneInit()
    this.gameInit(level)
  },
  setDirections: function(n) {
    var pool = this.data.personPool
    var person = pool.persons[n]
    directions = pool.findDirection(person)
    canMove = directions[0] > 0 || directions[1] > 0 || directions[2] > 0 || directions[3] > 0
    directions = directions
  },
  checkPass: function() {
    if (this.data.personPool.persons[0].cx == 2 && this.data.personPool.persons[0].cy == 4) {
      this.setData({
        isPass: true
      })
    }
  },
  reset: function() {
    this.gameInit(currentLevel)
    count = 0
    this.setData({
      countText: "步数：" + count,
      isPass: false
    })
  },
  return: function() {
    wx.navigateBack()
  }
})