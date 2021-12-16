import "./style.scss";

let level;
let COOP = false;
let aiFirst = false;

let board = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

const levels = {
	easy: 1,
	medium: 3,
	hard: 6,
	impossible: 9,
};

let player = true;
let HUMAN = player ? "X" : "O";
let AI = player ? "O" : "X";
const buttons = document.querySelectorAll(".btn");
const end = document.querySelector("#end");
const grid = document.querySelector(".board");
const start = document.querySelector(".start");
const choice = document.querySelector(".choice");

const single = document.querySelector("#single");
const multi = document.querySelector("#coop");

single.addEventListener("click", () => {
	COOP = false;
	start.setAttribute("style", "display:none");
	choice.setAttribute("style", "display: grid");
});
const easyBtn = document.querySelector("#easy");
easyBtn.addEventListener("click", () => {
	choice.setAttribute("style", "display:none");
	grid.setAttribute("style", "display: grid");
	level = levels.easy;
});

const mediumBtn = document.querySelector("#medium");
mediumBtn.addEventListener("click", () => {
	choice.setAttribute("style", "display:none");
	grid.setAttribute("style", "display: grid");
	level = levels.medium;
});

const hardBtn = document.querySelector("#hard");
hardBtn.addEventListener("click", () => {
	choice.setAttribute("style", "display:none");
	grid.setAttribute("style", "display: grid");
	level = levels.hard;
});

const impossibleBtn = document.querySelector("#impossible");
impossibleBtn.addEventListener("click", () => {
	choice.setAttribute("style", "display:none");
	grid.setAttribute("style", "display: grid");
	level = levels.impossible;
});

multi.addEventListener("click", () => {
	COOP = true;
	start.setAttribute("style", "display:none");
	grid.setAttribute("style", "display: grid");
});

end.addEventListener("click", () => {
	board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];
	buttons.forEach((button) => {
		button.innerHTML = "";
		button.disabled = false;
	});
	grid.setAttribute("style", "display: none");
	start.setAttribute("style", "display:grid");
	end.setAttribute("style", "display: none");
	end.innerHTML = "";
});

function emptyPlaces(state) {
	let places = [];
	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {
			if (state[x][y] == "") {
				places.push([x, y]);
			}
		}
	}
	return places;
}

function drawOnBoard() {
	buttons.forEach((button) => {
		let place = button.id.split("btn")[1];
		button.innerHTML = board[Number(place[0])][Number(place[1])];
		if (button.innerHTML != "") {
			button.disabled = true;
		}
	});
}

function disableAll() {
	buttons.forEach((button) => {
		button.disabled = true;
	});
}

buttons.forEach((button) => {
	button.addEventListener("click", () => {
		button.disabled = true;
		let index = button.id.split("btn")[1];
		if (COOP) {
			board[Number(index[0])][Number(index[1])] = player ? "X" : "O";
			player = !player;
		} else {
			board[Number(index[0])][Number(index[1])] = HUMAN;
			aiTurn();
		}
		drawOnBoard();
		if (gameOverAll(board)) {
			disableAll();
			if (evaluate(board) > 0) {
				end.innerHTML = `${HUMAN} WON`;
			} else {
				end.innerHTML = `${AI} WON`;
			}
			end.setAttribute("style", "display:grid");
		} else if (emptyPlaces(board).length == 0) {
			end.setAttribute("style", "display:grid");
			end.innerHTML = "DRAW";
		}
	});
});

function gameOver(state, player) {
	let winState = [
		[state[0][0], state[0][1], state[0][2]],
		[state[1][0], state[1][1], state[1][2]],
		[state[2][0], state[2][1], state[2][2]],
		[state[0][0], state[1][0], state[2][0]],
		[state[0][1], state[1][1], state[2][1]],
		[state[0][2], state[1][2], state[2][2]],
		[state[0][0], state[1][1], state[2][2]],
		[state[2][0], state[1][1], state[0][2]],
	];
	for (let i = 0; i < winState.length; i++) {
		if (
			winState[i][0] == winState[i][1] &&
			winState[i][1] == winState[i][2] &&
			winState[i][0] == player
		) {
			return true;
		}
	}
	return false;
}
function gameOverAll(state) {
	return gameOver(state, HUMAN) || gameOver(state, AI);
}

function evaluate(state) {
	if (gameOver(state, HUMAN)) {
		return 1;
	} else if (gameOver(state, AI)) {
		return -1;
	}
	return 0;
}

function minimax(state, depth, player) {
	let best;
	let other;
	if (player == HUMAN) {
		best = [-1, -1, -Infinity];
		other = AI;
	} else {
		best = [-1, -1, Infinity];
		other = HUMAN;
	}
	if (depth == 0 || gameOverAll(state)) {
		let score = evaluate(state);
		return [-1, -1, score];
	}
	emptyPlaces(state).forEach((place) => {
		let x = place[0];
		let y = place[1];
		state[x][y] = player;
		let score = minimax(state, depth - 1, other);
		state[x][y] = "";
		score[0] = x;
		score[1] = y;
		if (player == HUMAN) {
			if (score[2] > best[2]) {
				best = score;
			}
		} else {
			if (score[2] < best[2]) {
				best = score;
			}
		}
	});
	return best;
}

function aiTurn() {
	let x, y;
	let move;

	if (emptyPlaces(board).length == 9) {
		x = Math.trunc(Math.random() * 3);
		y = Math.trunc(Math.random() * 3);
	} else {
		let depth = emptyPlaces(board).length;
		if (depth > level) {
			depth = level;
		}
		move = minimax(board, depth, AI);
		x = move[0];
		y = move[1];
	}
	if (!(x < 0) || !(y < 0)) {
		board[x][y] = AI;
	}
}

if (aiFirst) {
	aiTurn();
	drawOnBoard();
}
