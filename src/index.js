import "./style.scss";

let COOP = false;
let aiFirst = false;

let player = true;
let HUMAN = player ? "X" : "O";
let AI = player ? "O" : "X";
const buttons = document.querySelectorAll(".btn");
const end = document.querySelector("#end");

let board = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

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
		move = minimax(board, emptyPlaces(board).length, AI);
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
