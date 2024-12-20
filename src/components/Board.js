import React, { useState } from "react";
import PopAnimation from './PopAnimation';

function Board() {
  const [showChoice, setShowChoice] = useState(true);
  const boardSize = 15;
  const [board, setBoard] = useState(
    Array(boardSize)
      .fill()
      .map(() => Array(boardSize).fill(null))
  );
  const [isBlackNext, setIsBlackNext] = useState(true);
  const [blackFirst, setBlackFirst] = useState(true);
  const [winner, setWinner] = useState(null);
  const [count, setCount] = useState(0);

  const checkWinner = (newBoard, row, col) => {
    const directions = [
      [
        [0, 1],
        [0, -1],
      ], // horizontal
      [
        [1, 0],
        [-1, 0],
      ], // vertical
      [
        [1, 1],
        [-1, -1],
      ], // diagonal
      [
        [1, -1],
        [-1, 1],
      ], // anti-diagonal
    ];

    const currentPlayer = newBoard[row][col];

    for (const dirPair of directions) {
      let count = 1;
      for (const [dx, dy] of dirPair) {
        let newRow = row + dx;
        let newCol = col + dy;
        while (
          newRow >= 0 &&
          newRow < boardSize &&
          newCol >= 0 &&
          newCol < boardSize &&
          newBoard[newRow][newCol] === currentPlayer
        ) {
          count++;
          newRow += dx;
          newCol += dy;
        }
      }
      // console.log(count)

      if (count >= 5) return currentPlayer;
    }
    return null;
  };

  // put the chess
  const handleClick = (row, col) => {
    if (board[row][col] || winner) return;
    setCount(count + 1);
    // const newBoard = board.map((row) => [...row]);
    // newBoard[row][col] = isBlackNext ? "black" : "white";
    const newBoard = board.map((r, rowIndex) =>
      rowIndex === row
        ? r.map((cell, colIndex) => (colIndex === col ? (isBlackNext ? "black" : "white") : cell))
        : r
    );
    setBoard(newBoard);
    const newWinner = checkWinner(newBoard, row, col);

    if (newWinner) {
      setWinner(newWinner);
    } else {
      setIsBlackNext(!isBlackNext);
    }
  };

  const renderCell = (row, col) => {
    return (
      <div
        className={`cell ${board[row][col] || ""}`}
        onClick={() => handleClick(row, col)}
        key={col}
      />
    );
  };

  const renderRow = (row) => {
    return (
      <div className="board-row" key={row}>
        {Array(boardSize)
          .fill()
          .map((_, col) => renderCell(row, col))}
      </div>
    );
  };

  // const withdrawChess = () => {
  //   if (count === 0) {
  //     return;
  //   }
  //   const newBoard = board.map((row) => [...row]);
  //   newBoard[board.length - 1 - Math.floor(count / boardSize)][count % boardSize] =
  //     null;
  //   setBoard(newBoard);
  //   setIsBlackNext(!isBlackNext);
  //   setCount(count - 1);
  // };

  // reset the board
  const resetBoard = () => {
    if (count === 0) {
      return;
    }
    if (count > 0) {
      const confirmReset = window.confirm('Are you sure you want to reset the game?');
      if (!confirmReset) {
        return;
      }
    }
    setBoard(
      Array(boardSize)
        .fill()
        .map(() => Array(boardSize).fill(null))
    );
    setIsBlackNext(blackFirst);
    setCount(0);
    setWinner(null);
  };

  const IntroPage = () => {
    return (
      <div>
        <div className="choice-container">
          <button
            className="choice-button-black"
            onClick={() => {
              setShowChoice(false);
              setBlackFirst(true);
              setIsBlackNext(true);
            }}
          >
            Black First
          </button>
          <button
            className="choice-button-white"
            onClick={() => {
              setShowChoice(false);
              setBlackFirst(false);
              setIsBlackNext(false);
            }}
          >
            White First
          </button>
        </div>
      </div>
    );
  };
  const BoardPage = () => {
    return (
      <div>
        <div className="choice-container">
          <button
            className="choice-button"
            onClick={() => resetBoard()}
          >
            Reset Board
          </button>
          {/* <button
            className="choice-button"
            onClick={() => withdrawChess()}
          >
            Withdraw Chess
          </button> */}
        </div>
        {winner && <PopAnimation text={`Winner is ${winner}!!`} />}
        <div className="status">
          {winner
            ? `Win!`
            : `Next player: ${isBlackNext ? "Black" : "White"}`}
        </div>
        <div className="board">
          {Array(boardSize)
            .fill()
            .map((_, row) => renderRow(row))}
        </div>
      </div>
    );
  };
  return <div>{showChoice ? <IntroPage /> : <BoardPage />}</div>;
}

export default Board;
