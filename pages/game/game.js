//game.js
//获取应用实例
import Pool from '../pool/Pool.js'
import Person from '../person/Person.js'
import levelInfo from '../config/config.js'

var canMove = true
var directions = null
var level
Page({
  data: {
    wall: null,
    unitLength: null,
    unitLength: null,
    caocao: null,
    border: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    isPass: false
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
  gameInit() {
    var personPool = new Pool
    var caocao = new Person
    var unitLength = this.data.unitLength
    caocao.init(0, 1, 0, 2, 2, unitLength)
    personPool.addPerson(caocao)
    var zhangfei = new Person
    zhangfei.init(0, 0, 0, 1, 2, unitLength)
    personPool.addPerson(zhangfei)
    var machao = new Person
    machao.init(0, 3, 0, 1, 2, unitLength)
    personPool.addPerson(machao)
    var huangzhong = new Person
    huangzhong.init(0, 0, 2, 1, 2, unitLength)
    personPool.addPerson(huangzhong)
    var zhaoyun = new Person
    zhaoyun.init(0, 3, 2, 1, 2, unitLength)
    personPool.addPerson(zhaoyun)
    var guanyu = new Person
    guanyu.init(0, 1, 2, 2, 1, unitLength)
    personPool.addPerson(guanyu)
    var footman1 = new Person
    footman1.init(0, 0, 4, 1, 1, unitLength)
    personPool.addPerson(footman1)
    var footman2 = new Person
    footman2.init(0, 1, 3, 1, 1, unitLength)
    personPool.addPerson(footman2)
    var footman3 = new Person
    footman3.init(0, 2, 3, 1, 1, unitLength)
    personPool.addPerson(footman3)
    var footman4 = new Person
    footman4.init(0, 3, 4, 1, 1, unitLength)
    personPool.addPerson(footman4)
    this.setData({
      personPool: personPool
    })
  },
  ts: function(e) {
    var n = e.currentTarget.id
    var border = this.data.border
    border[n] = 7
    this.setData({
      border: border
    })
    this.setDirections(n)
  },
  tm: function(e) {
    if (canMove) {
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
      this.checkPass()
    }
  },
  te: function(e) {
    this.setData({
      border: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    })
  },
  onLoad: function() {
    this.sceneInit()
    this.gameInit()
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
      wx.setStorage({
        key: 'level',
        data: level + 1,
      })
    }
  }
})