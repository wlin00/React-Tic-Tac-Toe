import { ITimeTravelListItem } from '../interface';
// 时间旅行列表元素组件
const TimeTravelListItem: React.FC<ITimeTravelListItem> = ({ index, jumpTo })=> {
  const description = index > 0 ? `Go to step${index}` : 'Go to game start'
  return (
    <li key={index}>
      <button onClick={() => jumpTo(index)}>{ description }</button>
    </li>
  )
}
export default TimeTravelListItem