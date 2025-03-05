import { create2dArray, randomBool } from "./utils"

class Grid {
  contents: Boolean[][]
  size: number
  constructor(size: number, contents: boolean[][]) {
    this.contents = contents
    this.size = size
  }

  private countAdjacent<T>(x: number, y: number) {
    let count = 0

    for (let xOffset = -1; xOffset < 2; xOffset++) {
      for (let yOffset = -1; yOffset < 2; yOffset++) {
        if (
          (xOffset !== 0 || yOffset !== 0)
          && xOffset + x >= 0 && xOffset + x < this.contents.length
          && y + yOffset >= 0 && y + yOffset < this.contents[0].length
          && this.contents[xOffset + x][y + yOffset]
        ) {
          count++
        }
      }
    }

    return count
  }

  nextState() {
    const newState = create2dArray(this.size, this.size, () => false)
    for (let i = 0; i < this.contents.length; i++) {
      for (let j = 0; j < this.contents[0].length; j++) {
        newState[i][j] = this.contents[i][j] ?
          this.countAdjacent(i, j) === 2 || this.countAdjacent(i, j) === 3
          : this.countAdjacent(i, j) === 3
      }
    }
    return new Grid(this.size, newState)
  }

  advance(steps: number) {
    let result: Grid = this
    for (let i = 0; i < steps; i++) {
      result = result.nextState()
    }

    return result;
  }

  toString() {
    return this.contents
      .map(
        row => row.map(
          cell => cell ? '□' : '■'
        ).join(' ')
      )
      .join('\n');
  }
}

export default Grid