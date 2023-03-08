const ticTacToe = () => {
  let gameEnd;
  let reset;

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

    const symbolsPlaced = 0;

    const createBoard = (() => {
      const gameBoard = doc.getElementById("game");
      board.forEach((row) => {
        const boardRow = document.createElement("div");
        boardRow.classList.add("board-row");
        gameBoard.appendChild(boardRow);
        row.forEach(() => {
          const boardCell = doc.createElement("div");
          boardCell.classList.add("board-cell");

          arrayOfCells.push(boardCell);
          boardRow.appendChild(boardCell);
        });
      });
    })();

    const playSymbolAt = (symbol, index) => {
      let bool = false;
      if (arrayOfCells[index].textContent === "") {
        bool = !bool;
        arrayOfCells[index].textContent = symbol;
        track.forEach((array, idx1) => {
          array.forEach((element, idx2) => {
            if (element === index) {
              track[idx1][idx2] = symbol;
            }
          });
        });
      }
      return bool;
    };

    return { track, createBoard, arrayOfCells, playSymbolAt, symbolsPlaced };
  })(document);

  const Game = () => {
    const board = Board;
    const players = [Player(0), Player(1)];
    let i = 0;
    let currentPlayer = players[i];
    let gameStatus = true;

    const switchPlayer = () => {
      i = i === 0 ? 1 : 0;
      currentPlayer = players[i];
      board.symbolsPlaced += 1;
    };

    const checkWin = () => {
      const sym = currentPlayer.symbol;
      let bool = false;
      board.track.forEach((combo) => {
        if (combo.toString() === [sym, sym, sym].toString()) {
          console.log(currentPlayer, "wins");
          gameStatus = false;
          bool = true;
        }
      });
      return bool;
    };

    const checkTie = () => {
      if (gameStatus === true && board.symbolsPlaced === 8) {
        gameStatus = false;
      }
    };

    const playRound = (index) => {
      const bool = board.playSymbolAt(currentPlayer.symbol, index);
      checkWin();
      checkTie();
      if (bool === true && checkWin() === false) switchPlayer();
    };

    const gameLoop = () => {
      board.arrayOfCells.forEach((cell, index) => {
        cell.addEventListener("click", () => playRound(index));
      });

      const gameBoard = document.getElementById("game");
      gameBoard.onclick = () => {
        if (gameStatus === false) {
          if (checkWin() === true) {
            gameEnd(`${currentPlayer.symbol} wins`);
          } else {
            gameEnd("It's a Tie!");
          }
        }
      };
    };
    return { gameLoop };
  };

  const disableClick = () => {
    const gameBoard = document.getElementById("game");
    gameBoard.style.pointerEvents = "none";
  };

  const enableClick = () => {
    const gameBoard = document.getElementById("game");
    gameBoard.style.pointerEvents = "auto";
  };

  const showReplayScreen = (string) => {
    const replayCard = document.createElement("div");
    replayCard.setAttribute("id", "replay-card");
    const main = document.getElementById("main");
    const replayButton = document.createElement("button");
    replayButton.setAttribute("id", "replay-button");
    replayButton.textContent = "Replay";
    replayCard.textContent = string;
    main.appendChild(replayCard);
    replayCard.appendChild(replayButton);
  };

  const removeReplayScreen = () => {
    const replayCard = document.getElementById("replay-card");
    replayCard.remove();
  };

  const start = () => {
    const tictactoe = Game();
    tictactoe.gameLoop();
  };

  const replayGame = () => {
    const replayButton = document.getElementById("replay-button");
    replayButton.addEventListener("click", () => {
      reset();
    });
  };

  gameEnd = (string) => {
    disableClick();
    showReplayScreen(string);
    replayGame();
  };

  reset = () => {
    const boardRows = document.querySelectorAll(".board-row");
    boardRows.forEach((element) => {
      element.remove();
    });
    enableClick();
    removeReplayScreen();
    ticTacToe();
  };
  start();
};

ticTacToe();
