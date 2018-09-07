import React, { Component } from 'react';
import './App.css';
import Square from './square';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentGrid: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      turn: 2,
      gameOver: false,
      winner: `X's turn`,
      aiChecked: false
    }
    this.handleUserTurn = this.handleUserTurn.bind(this)
  }

  handleUserTurn(itemPos) {
    let availableMoves = []
    let takenMoves = []
    let gridCopy = [...this.state.currentGrid]
    gridCopy[itemPos[0]][itemPos[1]] = this.state.turn
    this.state.currentGrid.forEach((row, rowIdx) => {
      row.forEach((item, itemIdx) => {
        if (!item) {
          availableMoves.push([rowIdx, itemIdx])
        } else {
          takenMoves.push({ move: [rowIdx, itemIdx], user: this.state.currentGrid[rowIdx][itemIdx] })
        }
      })
    })

    // console.log('available', availableMoves, 'taken', takenMoves, 'itemPos', itemPos)
    this.setState({ currentGrid: gridCopy, winner: this.checkForWinner(this.state.currentGrid) })
    if (this.state.aiChecked && this.state.turn !== 1) {
      setTimeout(() => {
        this.aiMovement(takenMoves, availableMoves)
      }, 1000);
    }
    this.setState({ turn: this.state.turn === 2 ? 1 : 2 })
  }


  // ===== Win condition checker ====

  checkForWinner(array) {
    if (this.horizCheck(array)) return this.horizCheck(array)
    else if (this.vertCheck(array)) return this.vertCheck(array)
    else if (this.diagCheck(array)) return this.diagCheck(array)
    else { return this.checkForZero(array) }
  }
  changeWinnerLabel() {
    const { winner, turn } = this.state
    let winnerLabel = ''
    this.resetBoard()    
    if (winner === -1 && turn === 1) { this.setState({ winner: `O's turn` }) }
    else if (winner === -1 && turn === 2) { this.setState({ winner: `X's turn` }) }
    else if (winner === 2) { this.setState({ winner: `X's win!`, gameOver: true }) }
    else if (winner === 1) { this.setState({ winner: `O's win!`, gameOver: true }) }
    else if (winner === 0) { this.setState({ winner: `It's a tie!`, gameOver: true }) }
  }
  resetBoard() {
    const { winner } = this.state
    console.log('winner', winner)
    if (winner === 2 || winner === 1) {
      if (winner === 2) { this.setState({ winner: `X's win!`, gameOver: true, resetting: true }) }
      else if (winner === 1) { this.setState({ winner: `O's win!`, gameOver: true, resetting: true }) }
      setTimeout(() => {
        this.setState({
          currentGrid: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        })
      }, 5000);
    }
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
  // ==== A.I movement ==== 
  handleChecked = (e) => {
    this.setState({ aiChecked: !this.state.aiChecked })
  }
  aiMovement(takenMoves, availableMoves) {
    let random = availableMoves[Math.round(Math.random() * (availableMoves.length - 1 - 0) + 0)]
    availableMoves.splice(availableMoves.findIndex(e => e[0] === random[0] && e[1] === random[1]), 1)
    takenMoves.push({ move: random, user: this.state.turn === 2 ? 1 : 2 })
    if (availableMoves.length !== 0 && !this.state.gameOver) this.handleUserTurn(random)
    return [takenMoves, availableMoves]
  }



  render() {
    // console.log(this.state)
    let grid = this.state.currentGrid.map((row, rowIdx) => {

      return row.map((item, itemIdx) => {
        return (
          <div key={itemIdx} className='grid_Item flexColumn'>
            <Square
              squareValue={item}
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
        <hr />
        {this.state.winner}
        <hr />
        A.I
        <input onChange={this.handleChecked} type='checkBox' />
        <div className='grid'>
          {grid}
        </div>
      </div>
    );
  }
}

export default App;
