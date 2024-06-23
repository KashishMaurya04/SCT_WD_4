document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('game-board');
  const cells = document.querySelectorAll('.cell');
  const gameStatus = document.getElementById('game-status');
  const restartButton = document.getElementById('restart-button');

  let currentPlayer = 'X';
  let gameState = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const cellIndex = parseInt(
      clickedCell.getAttribute('data-cell-index')
    );

    if (gameState[cellIndex] !== '' || !gameActive) {
      return;
    }

    gameState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.style.color = currentPlayer === 'X' ? 'blue' : 'red';

    if (checkWin()) {
      gameActive = false;
      gameStatus.textContent = `${currentPlayer} wins!`;
      return;
    }

    if (checkDraw()) {
      gameActive = false;
      gameStatus.textContent = 'Draw!';
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `${currentPlayer}'s turn`;
  };

  const checkWin = () => {
    return winningConditions.some((condition) => {
      return condition.every((index) => {
        return gameState[index] === currentPlayer;
      });
    });
  };

  const checkDraw = () => {
    return gameState.every((cell) => {
      return cell !== '';
    });
  };

  const restartGame = () => {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    gameStatus.textContent = `${currentPlayer}'s turn`;
    cells.forEach((cell) => {
      cell.textContent = '';
      cell.style.color = '';
    });
  };

  cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
  });

  restartButton.addEventListener('click', restartGame);
});
