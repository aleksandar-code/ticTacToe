const ticTacToe = () => {
  let gameEnd;
  let reset;

  const Player = (id, name) => {
    const symbol = id === 0 ? "X" : "O";
    return { name, symbol, id };
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

    const times = 0;

    (function createBoard() {
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

    const addAnimation = (symbol, index) => {
      if (symbol === "X") {
        arrayOfCells[index].style.color = "#f34a4a";
      } else {
        arrayOfCells[index].style.color = "#68c968";
      }

      arrayOfCells[index].style.fontSize = "6rem";
    };

    const playSymbolAt = (symbol, index) => {
      let bool = false;
      if (arrayOfCells[index].textContent === "") {
        bool = !bool;
        arrayOfCells[index].textContent = symbol;
        addAnimation(symbol, index);
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

    return { track, arrayOfCells, playSymbolAt, times };
  })(document);

  const Game = () => {
    const board = Board;
    const players = [Player(0, "Human"), Player(1, "Computer")];
    let i = 0;
    let currentPlayer = players[i];
    let gameStatus = true;

    const switchPlayer = () => {
      i = i === 0 ? 1 : 0;
      currentPlayer = players[i];
    };

    const checkWin = () => {
      const sym = currentPlayer.symbol;
      let bool = false;
      board.track.forEach((combo) => {
        if (combo.toString() === [sym, sym, sym].toString()) {
          gameStatus = false;
          bool = true;
        }
      });
      return bool;
    };

    const checkTie = () => {
      if (board.times === 9 && gameStatus === true) gameStatus = false;
    };
    let displayWinnerOrTie;
    const computerPlay = () => {
      let bool = false;
      while (bool === false && board.times !== 9 && gameStatus === true) {
        const index = Math.floor(Math.random() * 9);
        bool = board.playSymbolAt(currentPlayer.symbol, index);
        checkWin();
        checkTie();
        displayWinnerOrTie();
      }
      board.times += 1;
      switchPlayer();
    };
    const playRound = (index) => {
      const bool = board.playSymbolAt(currentPlayer.symbol, index);
      if (bool === true) {
        board.times += 1;
        checkWin();
        checkTie();
        displayWinnerOrTie();
        switchPlayer();
        computerPlay();
      }
    };

    displayWinnerOrTie = () => {
      if (gameStatus === false) {
        if (checkWin() === true) {
          gameEnd(`${currentPlayer.name} wins`);
        } else {
          gameEnd("It's a Tie!");
        }
      }
    };

    const gameLoop = () => {
      board.arrayOfCells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
          playRound(index);
        });
      });
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
    replayButton.textContent = "Play Again";
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

  const updateScore = (string) => {
    const scoreTxt = document.getElementById("score");
    let text = scoreTxt.innerHTML;
    if (string[0] === "H") {
      text = text.split("-");
      const result = Number(text[0]) + 1;
      text[0] = result.toString();
      text = text.join(" - ");
    } else if (string[0] === "C") {
      text = text.split("-");
      const result = Number(text[1]) + 1;
      text[1] = result.toString();
      text = text.join(" - ");
    }

    scoreTxt.textContent = text;
  };

  gameEnd = (string) => {
    disableClick();
    showReplayScreen(string);
    replayGame();
    updateScore(string);
  };

  const deleteBoard = () => {
    const boardRows = document.querySelectorAll(".board-row");
    boardRows.forEach((element) => {
      element.remove();
    });
  };

  reset = () => {
    deleteBoard();
    enableClick();
    removeReplayScreen();
    ticTacToe();
  };
  start();
};

ticTacToe();
