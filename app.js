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
    const track = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [2, 4, 6],
      [0, 4, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ];

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
          arrayOfCells.push(boardCell);
          boardRow.appendChild(boardCell);
          boardCell.appendChild(cellContent);
        });
      });
    };

    const playSymbolAt = (symbol, index) => {
      arrayOfCells[index].textContent = symbol;
      track.forEach((array, idx1) => {
        array.forEach((element, idx2) => {
          if (element === index) {
            track[idx1][idx2] = symbol;
          }
        });
      });
    };

    return { track, createBoard, arrayOfCells, playSymbolAt };
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

    const checkWin = () => {
      const sym = currentPlayer.symbol;

      board.track.forEach((combo) => {
        if (combo.toString() === [sym, sym, sym].toString()) {
          console.log(currentPlayer, "wins");
        }
      });
      console.log(board.track);
    };

    const listenClick = () => {
      board.arrayOfCells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
          board.playSymbolAt(currentPlayer.symbol, index);
          checkWin();
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
