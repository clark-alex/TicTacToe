import React, { Component } from 'react';
import './App.css';
import Square from './square';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentGrid: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      turn: 2,
      winner: `X's turn`,
    }
    this.handleUserTurn = this.handleUserTurn.bind(this)
  }
  handleUserTurn(itemPos) {
    let gridCopy = [...this.state.currentGrid]
    gridCopy[itemPos[0]][itemPos[1]] = this.state.turn
    this.setState({ currentGrid: gridCopy, turn: this.state.turn === 2 ? 1 : 2 })
    this.setState({winner:this.checkForWinner(this.state.currentGrid)})
  }
  
  // ===== Win condition checker ====
  checkForWinner(array) {
    if (this.horizCheck(array)) return this.horizCheck(array)
    else if (this.vertCheck(array)) return this.vertCheck(array)
    else if (this.diagCheck(array)) return this.diagCheck(array)
    else { return this.checkForZero(array) }
  }
  changeWinnerLabel(){
    const {winner, turn} = this.state
    let winnerLabel = ''
    if (winner === -1 && turn === 1 ){ this.setState({winner:`O's turn`})}
    else if (winner === -1 && turn === 2 ){ this.setState({winner:`X's turn`})}
    else if (winner === 2){ this.setState({winner:`X's win!`})}
    else if (winner === 1){ this.setState({winner:`O's win!`})}
    else if (winner === 0){ this.setState({winner:`It's a tie!`})}
  }

  horizCheck(array) {
    let result = []
    let currentIndex = 0
    let answer = 0
    array.forEach((row, i) => {
      if (i !== currentIndex) result.splice(0, 3)
      currentIndex = i
      row.forEach((item, index) => {
        if (result.indexOf(item) === -1) result.push(item)
        if (result.length === 1 && index === 2 && result[0] !== 0) {
          answer = result[0]
        }
      })
    })
    return answer
  }
  vertCheck(array) {
    let newArr = [[], [], []]
    array.forEach(row => {
      row.forEach((item, i) => {
        newArr[i].push(item)
      })
    })
    return this.horizCheck(newArr)
  }
  diagCheck(array) {
    let diagArr = [[array[0][0], array[1][1], array[2][2]], [array[0][2], array[1][1], array[2][0]]]
    return this.horizCheck(diagArr)
  }
  checkForZero(array) {
    let checkForZero = 0
    array.forEach(row => {
      row.forEach(item => {
        if (item === 0) checkForZero = -1
      })
    })
    return checkForZero
  }

  render() {
    this.changeWinnerLabel()    
    let grid = this.state.currentGrid.map((row, rowIdx) => {
      
      return row.map((item, itemIdx) => {
        return (
          <div key={itemIdx} className='grid_Item flexColumn'>
            <Square squareValue={item}
              turn={this.state.turn}
              itemPos={[rowIdx, itemIdx]}
              handleUserTurn={this.handleUserTurn}
            />
          </div>
        )
      })
    })
    return (
      <div className="App flexColumn">
        TicTacToe
        <hr/>
        {this.state.winner}
        <div className='grid'>
          {grid}
        </div>
      </div>
    );
  }
}

export default App;
