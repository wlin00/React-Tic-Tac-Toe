export interface ISquare {
  value: string
  onSquareClick: () => void
}

export interface IBoard {
  xIsNext: boolean
  squares: string[]
  currentIndex: number
  onPlay: (list: string[]) => void
}

export interface ITimeTravelListItem {
  index: number
  jumpTo: (index: number) => void
}