import { IBoard } from '../interface';
import Square from './Square';
import { BOARDSQUARE } from '../enums';
// 棋盘组件
const Board: React.FC<IBoard> = ({ xIsNext, squares, onPlay, currentIndex }) => {
  const winner = caculateWinner(squares)
  const status = winner 
    ? `Winner is ${winner}` 
    : (currentIndex === BOARDSQUARE ? 'Ended In A Draw' : `Next Player Is ${xIsNext ? 'X' : 'O'}`)
  const handleClick = (index: number) => { // 
    if (squares[index] || caculateWinner(squares)) { // 若已经出现胜者，或者当前格已有棋子，则return
      return
    }
    const squareSlice = squares.slice()
    squareSlice[index] = xIsNext ? 'X' : 'O'
    onPlay(squareSlice)
  }
  function caculateWinner (squares: string[]) {
    const arr = squares.slice()
    const winnerResultArr = [ // 胜利者下标数组
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < winnerResultArr.length; i++) {
      const [a, b, c] = winnerResultArr[i]
      if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
        return arr[a]
      }
    }
    return null
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}
export default Board