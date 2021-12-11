import "./style.scss"
import * as miniMax from "./minimax"  

let player:boolean = true;
let turns = 0;
let done = false;
let result:string = "";
const buttons = document.querySelectorAll(".btn")!;
const end = <HTMLButtonElement> document.querySelector("#end")

let board = [["","",""],["","",""],["","",""]];
function drawOnBoard(){
    buttons.forEach(button=>{
        let place = button.id.split("btn")[1];
        button.innerHTML =  board[Number(place[0])][Number(place[1])];
        if(button.innerHTML!=""){
            button.disabled = true;
        }
    });
}
buttons.forEach(button => {
    button.addEventListener("click", () =>{
        button.innerHTML =  player?"X":"O";
        button.disabled = true;
        let index : string = button.id.split("btn")[1];
        check(Number(index[0]),Number(index[1]), button.innerHTML);
        if(done){
            end.innerHTML = result;
            end.hidden = false;
            end.addEventListener("click", ()=>{
                clearGrid()
            });
        }
    });
});

function check(x:number,y:number, symbol:string) {
    board[x][y] = symbol;
    if(horizontal(x)){
        result = win();
    }else if(vertical(y)){
        result =win()
    }else if(diagonal(x,y)){
        result =win()
    }else{
        player =  !player;
        turns++;
        if(turns==9){
			result = draw();
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
    done = true;
    return (`${player?"X":"O"} WON`)
}

function draw() {
    done = true;
    return(`DRAW`)
}

function clearGrid(){
	board=[["","",""],["","",""],["","",""]];
    buttons.forEach(button => {
        button.disabled = false
        button.innerHTML =  "";
    });
    player = true;
	turns = 0;
    done = false;
    result = ""
    end.hidden = true;
}