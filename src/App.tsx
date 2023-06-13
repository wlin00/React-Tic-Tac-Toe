import { useState, useCallback, useMemo } from 'react';
import React from 'react';
import  './App.scss'
import { ISquare, IBoard, ITimeTravelListItem } from './interface';

// 棋盘中的某个格组件 - props：1、当前展示值'X' or 'O'；2、
const Square: React.FC<ISquare> = ({ value, onSquareClick }) => {
  return (
    <button onClick={onSquareClick} className='square'>{ value }</button>
  )
}

// 棋盘组件
const Board: React.FC<IBoard> = ({ xIsNext, squares, onPlay }) => {
  const winner = caculateWinner(squares)
  const status = winner ? `Winner is ${winner}` : `Next Player is ${xIsNext ? 'X' : 'O'}` 
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

// 时间旅行列表元素组件
const TimeTravelListItem: React.FC<ITimeTravelListItem> = ({ index, jumpTo })=> {
  const description = index > 0 ? `Go to step${index}` : 'Go to game start'
  return (
    <li key={index}>
      <button onClick={() => jumpTo(index)}>{ description }</button>
    </li>
  )
}

// APP
export default function Game() {
  const [history, setHistory] = useState([new Array(9).fill(null)]) // [ [], [], []... ]
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const currentSquares = useMemo(() => history[currentIndex], [history, currentIndex])
  // const currentSquares = history[currentIndex]
  const isNextStepX = currentIndex % 2 === 0 // 下一步棋是否是 ‘X’
  
  const handleBoardClick = (squaresSlice: string[]) => { // 根据当前currentIndex，追加历史记录
    const historyCopy = history.slice(0, currentIndex + 1) // 确保当前history时间历史数组长度和当前时间线下标匹配，即history.length - 1 = currentIndex
    setHistory([...historyCopy, squaresSlice])
    setCurrentIndex(currentIndex + 1)
  }

  const handleJumpTo = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const TimeTravelList = history.map((item, index) => {
    return (
      <TimeTravelListItem key={index} index={index} jumpTo={handleJumpTo} />
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          xIsNext={isNextStepX} 
          squares={currentSquares} 
          onPlay={handleBoardClick} 
        />
      </div>
      <div className="game-info">
        { TimeTravelList }
      </div>
    </div>
  );
}