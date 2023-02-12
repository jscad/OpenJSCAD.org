/*
 * The smallest and simplest binary heap priority queue in JavaScript
 * Copyright (c) 2017, Vladimir Agafonkin
 * https://github.com/mourner/tinyqueue
 */

class TinyQueue {
  constructor (data, compare) {
    this.data = data
    this.length = this.data.length
    this.compare = compare

    if (this.length > 0) {
      for (let i = (this.length >> 1) - 1; i >= 0; i--) this._down(i)
    }
  }

  push (item) {
    this.data.push(item)
    this._up(this.length++)
  }

  pop () {
    if (this.length === 0) return undefined

    const top = this.data[0]
    const bottom = this.data.pop()

    if (--this.length > 0) {
      this.data[0] = bottom
      this._down(0)
    }

    return top
  }

  peek () {
    return this.data[0]
  }

  _up (pos) {
    const { data, compare } = this
    const item = data[pos]

    while (pos > 0) {
      const parent = (pos - 1) >> 1
      const current = data[parent]
      if (compare(item, current) >= 0) break
      data[pos] = current
      pos = parent
    }

    data[pos] = item
  }

  _down (pos) {
    const { data, compare } = this
    const halfLength = this.length >> 1
    const item = data[pos]

    while (pos < halfLength) {
      let bestChild = (pos << 1) + 1 // initially it is the left child
      const right = bestChild + 1

      if (right < this.length && compare(data[right], data[bestChild]) < 0) {
        bestChild = right
      }
      if (compare(data[bestChild], item) >= 0) break

      data[pos] = data[bestChild]
      pos = bestChild
    }

    data[pos] = item
  }
}
