class Person {
  init(t, x, y, w, h) {
    this.t = t
    this.x = x
    this.y = y
    this.cx = x + w / 2
    this.cy = y + h / 2
    this.w = w
    this.h = h
  }
  setPosition(x, y) {
    this.x = x
    this.y = y
    this.cx = x + this.w / 2
    this.cy = y + this.h / 2
  }
  isCollision(cx, cy, w, h) {
    if (Math.abs(this.cx - cx) < this.w / 2 + w / 2 &&
      Math.abs(this.cy - cy) < this.h / 2 + h / 2) {
      return true
    }
    return false
  }
}

export default Person