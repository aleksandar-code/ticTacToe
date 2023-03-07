const ticTacToe = () => {
  const Player = (id) => {
    const symbol = id === 0 ? "X" : "O";

    return { symbol, id };
  };

  const Board = ((doc) => {
    const board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];

    const arrayOfCells = [];
    const getCell = (cell) => {
      arrayOfCells.push(cell);
    };
    const createBoard = () => {
      const gameBoard = doc.getElementById("game");
      board.forEach((row) => {
        const boardRow = document.createElement("div");
        boardRow.classList.add("board-row");
        gameBoard.appendChild(boardRow);
        row.forEach((col) => {
          const boardCell = doc.createElement("div");
          boardCell.classList.add("board-cell");
          const cellContent = document.createElement("p");
          cellContent.textContent = col;
          getCell(boardCell);
          boardRow.appendChild(boardCell);
          boardCell.appendChild(cellContent);
        });
      });
    };

    const playSymbolAt = (symbol, index) => {
      arrayOfCells[index].textContent = symbol;
    };

    return { createBoard, arrayOfCells, playSymbolAt };
  })(document);

  const Game = () => {
    const board = Board;
    const players = [Player(0), Player(1)];
    let i = 0;
    let currentPlayer = players[i];
    const switchPlayer = () => {
      i = i === 0 ? 1 : 0;
      currentPlayer = players[i];
    };

    board.createBoard();
    const listenClick = () => {
      board.arrayOfCells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
          board.playSymbolAt(currentPlayer.symbol, index);
          switchPlayer();
        });
      });
    };
    const gameLoop = () => {
      listenClick();
    };
    return { gameLoop };
  };

  const tictactoe = Game();
  tictactoe.gameLoop();
};

ticTacToe();
