export class Game {
  public boards = [...Array(9)].map((_, i) => new Board(i))
  private moveCounter = 0
  private availableBoardIndexes = [...Array(9)].map((_, i) => i)

  public makeMove(boardIndex: number, cellIndex: number) {
    this.moveCounter++

    const currentPlayer = (this.moveCounter % 2) ? 'x' : 'o'
    const res = this.boards[boardIndex].makeMove(cellIndex, currentPlayer)

    if (res === 'win') {
      this.availableBoardIndexes = []
      this.boards.forEach(board => board.isActive = false)
      return res
    }

    if (this.boards[cellIndex].getAvailableCellIndexes().length)
      this.availableBoardIndexes = [cellIndex]
    else
      this.availableBoardIndexes =
        this.boards.map((board, i) =>
          board.getAvailableCellIndexes().length ? i : -1).filter(value => value !== -1)

    this.boards.forEach(board => board.isActive = false)
    this.availableBoardIndexes.forEach(value => this.boards[value].isActive = true)
  }
}

export class Board {
  public isActive = true
  public winRow: number[] = []
  private state = [...Array(9)].map(_ => '')
  private variants = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ]

  constructor(public index: number) {}

  public makeMove(cellIndex: number, player: 'x' | 'o') {
    if (this.state[cellIndex])
      throw new Error('Cell is not empty')

    this.state[cellIndex] = player

    for (const variant of this.variants) {
      const cell1 = this.state[variant[0]]
      const cell2 = this.state[variant[1]]
      const cell3 = this.state[variant[2]]

      if (cell1 && cell1 === cell2 && cell2 === cell3) {
        this.winRow = variant
        return 'win'
      }
    }
  }

  public getCells() {
    return this.state
  }

  public getAvailableCellIndexes() {
    return this.state.map((value, i) => value ? -1 : i).filter(value => value !== -1)
  }
}