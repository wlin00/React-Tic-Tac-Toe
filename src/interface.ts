export interface ISquare {
  value: string
  onSquareClick: () => void
}

export interface IBoard {
  xIsNext: boolean
  squares: string[]
  onPlay: (list: string[]) => void
}
