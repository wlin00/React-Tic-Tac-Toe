import { ISquare } from '../interface';
// 棋盘中的某个格组件 - props：1、当前展示值'X' or 'O'；2、
const Square: React.FC<ISquare> = ({ value, onSquareClick }) => {
  return (
    <button onClick={onSquareClick} className='square'>{ value }</button>
  )
}

export default Square
