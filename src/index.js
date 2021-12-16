import "./style.scss";

let HUMAN = 1;
let AI = -1;
let player = true;
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

function clearBoard() {
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
	end.hidden = true;
}
buttons.forEach((button) => {
	button.addEventListener("click", () => {
		button.disabled = true;
		let index = button.id.split("btn")[1];
		board[Number(index[0])][Number(index[1])] = player ? "X" : "O";
	});
});
