const ticTacToe = () => {
  const Player = (id) => {
    const name = document.getElementById("name").value;

    const symbol = id === 0 ? "X" : "O";

    return { name, symbol, id };
  };

  const Board = ((doc) => {
    const board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];

    // const playSymbolAt = (symbol, at) => {};

    // const displayBoard = () => {

    // };

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
          cellContent.textContent = "X";
          boardRow.appendChild(boardCell);
          boardCell.appendChild(cellContent);
        });
      });
    };

    return { board, createBoard };
  })(document);

  const Game = (() => {
    const board = Board;
    const players = [Player(0), Player(1)];
    const keepGoing = true;
    let i = 0;
    let currentPlayer = players[i];
    const switchPlayer = () => {
      i = i === 0 ? 1 : 0;
      currentPlayer = players[i];
    };

    board.createBoard();
    const gameLoop = () => {
      // while (keepGoing) {
      //   board.playSymbolAt(currentPlayer.symbol);
      //   switchPlayer();
      //   keepGoing = false;
      // }
    };
  })();
};

// ticTacToe();
