import "./style.scss"

let player:boolean = true;
let turns = 0;
const buttons = document.querySelectorAll("button")!;

let board = [["","",""],["","",""],["","",""]];
buttons.forEach(button => {
    button.addEventListener("click", () =>{
        button.innerHTML =  player?"X":"O";
        button.disabled = true
        let index : string = button.id.split("btn")[1];
        check(Number(index[0]),Number(index[1]), button.innerHTML);
    });
});

function check(x:number,y:number, symbol:string) {
    board[x][y] = symbol;
    if(horizontal(x)){
        win();
    }else if(vertical(y)){
        win()
    }else if(diagonal(x,y)){
        win()
    }else{
        player =  !player;
        turns++;
        if(turns==9){
			draw();
		}
    }
}

function horizontal(x: number) {
    if(board[x][0]==board[x][1]&&board[x][0]==board[x][2]){
		return true;
	}
    return false;
}
function vertical(y: number) {
    if(board[0][y]==board[1][y]&&board[0][y]==board[2][y]){
		return true;
	}
    return false;
}

function diagonal(x: number, y: number) {
    if(board[1][1]!=""){
        if((board[0][0]==board[1][1]&&board[1][1]==board[2][2]) || (board[0][2]==board[1][1]&&board[1][1]==board[2][0])){
		return true;
	}
    }
    return false;
}

function win() {
    console.log(`${player?"X":"O"} WON`)
    clearGrid();
}

function draw() {
    console.log(`DRAW`)
    clearGrid();
}

function clearGrid(){
	board=[["","",""],["","",""],["","",""]];
    buttons.forEach(button => {
        button.disabled = false
        button.innerHTML =  "";
    });
    player = true;
	turns = 0;
}