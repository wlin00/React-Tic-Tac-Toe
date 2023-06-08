export const calculateWinner = (squares: string[]) => { // squares: ['X', 'O', 'X', 'X'...]
  const lines = [ // 遍历所有获胜的可能性
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] // 输出当前胜者
    }
  }
  return null // 暂无胜者
}