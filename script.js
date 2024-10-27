const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

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

const checkWinner = () => {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      highlightCells([a, b, c]);
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes('')) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
};

const highlightCells = (winningCells) => {
  winningCells.forEach(index => {
    cells[index].classList.add('winning');
  });
};

const cellClick = (e) => {
  const cell = e.target;
  const index = Array.from(cells).indexOf(cell);

  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  checkWinner();
};

const resetBoard = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  statusText.textContent = `Player X's Turn`;
  gameActive = true;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning');
  });
};

cells.forEach(cell => cell.addEventListener('click', cellClick));
restartButton.addEventListener('click', resetBoard);
