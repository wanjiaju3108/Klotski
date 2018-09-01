class Pool {
  persons = []
  addPerson(person) {
    this.persons.push(person)
  }
  findDirection(myself) {
    var directions = [2, 2, 2, 2]
    var cx = myself.cx
    var cy = myself.cy
    var w = myself.w
    var h = myself.h
    var persons = this.persons
    /*
    判断墙
    */
    if (myself.y == 0) {
      directions[0] = 0
    }
    if (myself.y + myself.h == 5) {
      directions[1] = 0
    }
    if (myself.x == 0) {
      directions[2] = 0
    }
    if (myself.x + myself.w == 4) {
      directions[3] = 0
    }
    /*
    判断与其他人碰撞
    */
    this.persons.forEach((person) => {
      if (person.cx != cx || person.cy != cy) {
        if (person.isCollision(cx, cy - 1, w, h)) {
          directions[0] = 0
        }
        if (person.isCollision(cx, cy + 1, w, h)) {
          directions[1] = 0
        }
        if (person.isCollision(cx - 1, cy, w, h)) {
          directions[2] = 0
        }
        if (person.isCollision(cx + 1, cy, w, h)) {
          directions[3] = 0
        }
      }
    })
    return directions
  }
}

export default Pool