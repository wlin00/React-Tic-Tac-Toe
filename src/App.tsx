import { useState, useCallback, useMemo } from 'react';
import  './App.scss'
import TimeTravelListItem from './components/TimeTravelListItem';
import { BOARDSQUARE } from './enums';
import Board from './components/Board';


// APP
export default function Game() {
  const [history, setHistory] = useState([new Array(BOARDSQUARE).fill(null)]) // [ [LENGTH = 9], [], []... ]
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
          currentIndex={currentIndex}
          onPlay={handleBoardClick} 
        />
      </div>
      <div className="game-info">
        { TimeTravelList }
      </div>
    </div>
  );
}