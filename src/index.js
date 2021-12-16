import "./style.scss";

let player = true;
let done = false;
let result = ["", 0];
const buttons = document.querySelectorAll(".btn");
const end = document.querySelector("#end");

let board = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

function drawOnBoard() {
	buttons.forEach((button) => {
		let place = button.id.split("btn")[1];
		button.innerHTML = board[Number(place[0])][Number(place[1])];
		if (button.innerHTML != "") {
			button.disabled = true;
		}
	});
}
buttons.forEach((button) => {
	button.addEventListener("click", () => {
		button.disabled = true;
		let index = button.id.split("btn")[1];
		board[Number(index[0])][Number(index[1])] = player ? "X" : "O";
		drawOnBoard();
		check(board);
		if (done) {
			end.innerHTML = result[0];
			end.hidden = false;
			end.addEventListener("click", () => {
				clearGrid();
			});
		}
	});
});

function continueOn() {
	if (emptyPlaces(board).length == 0) {
		draw();
	}
	aiTurn();
}

function check(state) {
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
			winState[i][1] == winState[i][1] &&
			winState[i][0] == (player ? "X" : "O")
		) {
			win();
			return winState[i];
		}
	}
	continueOn();
}

function win() {
	done = true;
	result[0] = `${player ? "X" : "O"} WON`;
	result[1] = player ? 1 : -1;
	return;
}

function draw() {
	done = true;
	result[0] = `DRAW`;
	result[1] = 0;
	return;
}

function clearGrid() {
	board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];
	buttons.forEach((button) => {
		button.disabled = false;
		button.innerHTML = "";
	});
	player = true;
	done = false;
	result[0] = "";
	result[1] = 0;
	end.hidden = true;
}

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

function aiTurn() {
	let x, y;
	let places = emptyPlaces(board);
	if (places.length == 9) {
		x = Math.trunc(Math.random() * 3);
		y = Math.trunc(Math.random() * 3);
	} else {
		let previousResult = result;
		let previousDone = done;
		move = minimax(board, places.length, false);
		x = move[0];
		y = move[1];
		result = previousResult;
		done = previousDone;
	}
	board[Number(x)][Number(y)] = player ? "X" : "O";
	check(board);
	drawOnBoard();
}

function minimax(state, depth, player) {
	let best;
	best = player ? [-1, -1, 10] : [-1, -1, -10];
	if (depth == 0) {
		check(state);
		return [-1, -1, result[1]];
	}
	emptyPlaces(state).forEach((place) => {
		let x = Number(place[0]);
		let y = Number(place[1]);
		state[x][y] = player ? "X" : "O";
		let score = minimax(state, depth - 1, !player);
		state[x][y] = "";
		score[0] = x;
		score[0] = y;

		if (!player) {
			if (score[2] > best[2]) {
				best = score;
			} else {
				if (score[2] < best[2]) {
					best = score;
				}
			}
		}
	});
	return best;
}
