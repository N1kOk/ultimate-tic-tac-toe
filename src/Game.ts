export class Game {
  public boards = [...Array(9)].map((_, i) => new Board(i))
  private moveCounter = 0
  private availableBoardIndexes = [...Array(9)].map((_, i) => i)

  constructor(private forceUpdate: Function) {}

  public async makeMove(boardIndex: number, cellIndex: number): Promise<void | 'win'> {
    this.moveCounter++

    const currentPlayer = (this.moveCounter % 2) ? 'x' : 'o'
    const res = this.boards[boardIndex].makeMove(cellIndex, currentPlayer)

    if (res === 'win') {
      this.availableBoardIndexes = []
      this.boards.forEach(board => board.isActive = false)
      this.forceUpdate()
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

    this.forceUpdate()

    if (currentPlayer === 'x') {
      await sleep(500)
      return this.makeBotMove()
    }
  }

  private makeBotMove() {
    const preferredIndexes = [0, 2, 4, 6, 8]
    const getCountX = (boardIndex: number) =>
      this.boards[boardIndex].getCells().reduce((acc, value) => acc + (value === 'x' ? 1 : 0), 0)

    const minX = Math.min(...[...Array(9)].map((_, i) => i).map(boardIndex => getCountX(boardIndex)))
    const boardsWithMinX = this.boards.reduce<number[]>((acc, _, boardIndex) => getCountX(boardIndex) === minX ? [...acc, boardIndex] : acc, [])

    const boardIndex = pickRandom(this.availableBoardIndexes)
    const emptyCellIndexes = this.boards[boardIndex].getAvailableCellIndexes()

    const state = this.boards[boardIndex].getCells()
    for (const cellIndex of emptyCellIndexes) {
      state[cellIndex] = 'o'
      if (checkWin(state)) {
        return this.makeMove(boardIndex, cellIndex)
      }
      state[cellIndex] = ''
    }

    const intersection = getIntersection(emptyCellIndexes, boardsWithMinX)

    if (intersection.length > 0) {
      const preferred = getIntersection(preferredIndexes, intersection)

      if (preferred.length > 0) {
        return this.makeMove(boardIndex, pickRandom(preferred))
      }

      return this.makeMove(boardIndex, pickRandom(intersection))
    }

    return this.makeMove(boardIndex, pickRandom(emptyCellIndexes))
  }
}

export class Board {
  public isActive = true
  public winRow: number[] = []
  private state = [...Array(9)].map(_ => '')

  constructor(public index: number) {}

  public makeMove(cellIndex: number, player: 'x' | 'o') {
    if (this.state[cellIndex])
      throw new Error('Cell is not empty')

    this.state[cellIndex] = player

    const winRow = checkWin(this.state)

    if (winRow) {
      this.winRow = winRow
      return 'win'
    }
  }

  public getCells() {
    return this.state.slice()
  }

  public getAvailableCellIndexes() {
    return this.state.map((value, i) => value ? -1 : i).filter(value => value !== -1)
  }
}

function pickRandom(array: any[]) {
  return array[Math.floor(Math.random() * array.length)]
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function getIntersection(array1: any[], array2: any[]) {
  return array1.filter(value => array2.includes(value))
}

function checkWin(state: string[]) {
  const variants = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ]

  for (const variant of variants) {
    const cell1 = state[variant[0]]
    const cell2 = state[variant[1]]
    const cell3 = state[variant[2]]

    if (cell1 && cell1 === cell2 && cell2 === cell3) {
      return variant
    }
  }

  return false
}
