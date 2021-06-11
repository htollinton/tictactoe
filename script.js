
const gameBoard =(()=>{
let turn = 1;
let restart = 1;
let nextGo = document.getElementById("next-go");
nextGo.textContent = "Player 1 first!";
let result = document.getElementById("winner");
let crossesWin = document.getElementById("player-one-win");
let noughtsWin = document.getElementById("player-two-win");
let noughtsScore = 0;
let crossesScore = 0;
let restartElement = document.getElementById("restart");
let checkArray = [];
let playerOnePiece = document.getElementById("player-one-piece");
let playerTwoPiece = document.getElementById("player-two-piece");
playerOnePiece.textContent = "Player-one: Crosses";
playerTwoPiece.textContent = "Player-two: Noughts";
let computer=1;


let createSquares = function () {
    noughtsScore = 0;
    noughtsWin.textContent = noughtsScore;
    crossesScore = 0;
    crossesWin.textContent = crossesScore;
    let position = [];
    computer =1;
    turn = 1;
    for (i = 0; i < 9; i++) {
        position[i] = document.createElement("div");
        container.appendChild(position[i]);
        position[i].setAttribute("id",`${i}`)
        let letsPlay = (function(){
        position[i].addEventListener("click", function(){   
            if(turn===1 && !this.classList.contains("done") ){
                cantGoThere(this);
                this.setAttribute("class", "done cross");
                let left = document.createElement("div");
                left.setAttribute("class","left");
                this.appendChild(left);
                let right = document.createElement("div");
                right.setAttribute("class","right");
                this.appendChild(right);
                turn=-1;
            } else if(turn===-1 && !this.classList.contains("done")){
                cantGoThere(this);
                this.setAttribute("class", "done noughty");
                let nought = document.createElement("div");
                nought.setAttribute("class","nought");
                this.appendChild(nought);
                turn=1;
            } else{
                cantGoThere(this)
            };           
            won();
            newGame();
            resetGame();
            allSquaresTaken();
            restartButton();          
        },false);
        }());
    };    
};
let createSquaresComputer = function () {    
    let position = [];   
    noughtsScore = 0;
    noughtsWin.textContent = noughtsScore;
    crossesScore = 0;
    crossesWin.textContent = crossesScore;
    turn = 1;
    computer = -1;
    computerFirst();
    for (i = 0; i < 9; i++) {
        position[i] = document.createElement("div");
        container.appendChild(position[i]);
        position[i].setAttribute("id",`${i}`)
        position[i].setAttribute("class","not-used");
        let letsPlay = (function(){
        position[i].addEventListener("click", function(){ 
            if(turn===1 && !this.classList.contains("done") ){
                cantGoThere(this);
                this.setAttribute("class", "done cross");
                let left = document.createElement("div");
                left.setAttribute("class","left");
                this.appendChild(left);
                let right = document.createElement("div");
                right.setAttribute("class","right");
                this.appendChild(right);
                turn=-1;

                
            } else if(turn===-1 && !this.classList.contains("done")){
                cantGoThere(this);
                this.setAttribute("class", "done noughty");
                let nought = document.createElement("div");
                nought.setAttribute("class","nought");
                this.appendChild(nought);
                turn=1;
            } else{
                cantGoThere(this)
            };           
            won();
            newGame();
            resetGame();
            allSquaresTaken(); 
            restartButton();
            if((nextGo.textContent!=="Can't go there!"&&playerOnePiece.textContent ==="Player-one: Crosses"&&computer===-1&&turn ===-1)){
                setTimeout(computerGo,500);
            }else if(nextGo.textContent!=="Can't go there!"&&computer===-1&&turn ===1&&playerOnePiece.textContent === "Player-one: Noughts"){
                setTimeout(computerGo,500);
            }
          
                      
        },false);
        }());
    };    
    
};

let swapPieces = function(){
    let swap = document.getElementById("swap-pieces");
    swap.addEventListener("click", function(){
        turn = 1;
        if(playerOnePiece.textContent ==="Player-one: Crosses"){
            playerOnePiece.textContent = "Player-one: Noughts";
            playerTwoPiece.textContent = "Player-two: Crosses";
            computerFirst();
            
            
        } else{
            playerOnePiece.textContent = "Player-one: Crosses";
            playerTwoPiece.textContent = "Player-two: Noughts";
             
               
        };

    })
}


//finds a random square that has not yet been taken
let freeSpaceCheck = function(){
    checkArray =[...document.getElementsByClassName("not-used")];
    let ids =[];
    let ranNum;
    for(i=0;i<checkArray.length;i++){
    ids[i] =checkArray[i].id;
    };
    ranNum = Math.floor(Math.random()*ids.length);
    
    return ids[ranNum];
};

//uses the random square that has not been taken from freeSpaceCheck to 
//pick a square and set it properties to either noughts or crosses
let computerGo = function(){
    let x = document.getElementById(freeSpaceCheck());
    if(turn===1 && !x.classList.contains("done") ){
        x.setAttribute("class", "done cross");
        let left = document.createElement("div");
        left.setAttribute("class","left");
        x.appendChild(left);
        let right = document.createElement("div");
        right.setAttribute("class","right");
        x.appendChild(right);
        turn=-1;

        
    } else if(turn===-1 && !x.classList.contains("done")){
        x.setAttribute("class", "done noughty");
        let nought = document.createElement("div");
        nought.setAttribute("class","nought");
        x.appendChild(nought);
        turn=1;
    }
    won();
    newGame();
    resetGame();
    allSquaresTaken();
    restartButton();
    
}
let computerFirst = function(){
if(playerTwoPiece.textContent === "Player-two: Crosses"&&computer ===-1){
    setTimeout(computerGo,500);
};
};



//function that prevents users taking a square already used
let cantGoThere = function(a){
    if(a.classList.contains("done")){
        nextGo.textContent = "Can't go there!";
    }else if(turn ===1){
        nextGo.textContent = "Player 2 up next!"
    }else{
        nextGo.textContent = "Player 1 up next!"
    }
};


// function to check if each square has the class of either nought or cross.
//This is then implemented in both winnerCross and winnerNought
let check = [];
let checker = function(a){
    let position = [];
    for(i = 0; i < 9; i++){
        (function test(){
        position[i] = document.getElementById(`${i}`);
        check[i] = position[i].classList.contains(a);
        })();
};
return check
};

//functions to implement checker on three different squares to see
let winnerCross = function(a,b,c){
    let currentState =checker("cross");
    let truthy =[currentState[a], currentState[b],currentState[c]].every(e=>e===true);
    return truthy                
};
let winnerNought = function(a,b,c){
    let currentState =checker("noughty");
    let truthy =[currentState[a], currentState[b],currentState[c]].every(e=>e===true);
    return truthy                
};


//function to implement winnerCross and winnerNought to check if any of the
//combinations that would lead to victory have been acheived.
let won = (function(){
    if(winnerCross(0,1,2)||winnerCross(3,4,5)||winnerCross(6,7,8)||winnerCross(0,3,6)||
    winnerCross(1,4,7)||winnerCross(2,5,8)||winnerCross(0,4,8)||winnerCross(2,4,6)){
        result.textContent = "Crosses win!";
        return "Crosses win!";
    } else if(winnerNought(0,1,2)||winnerNought(3,4,5)||winnerNought(6,7,8)||winnerNought(0,3,6)||
    winnerNought(1,4,7)||winnerNought(2,5,8)||winnerNought(0,4,8)||winnerNought(2,4,6)){
        result.textContent = "Noughts win!";
        return "Noughts win!";
    }else{
        return "Keep going";
    }
});

//function to increment the score of the player who won the game 
let newGame = function(){
    
    if(result.textContent === "Noughts win!" && playerOnePiece.textContent ==="Player-one: Noughts"){
        crossesScore+= 1;
        crossesWin.textContent = crossesScore;
        nextGo.textContent = "Player 1 wins!";
        restart *= -1;
        turn =1;
    } else if(result.textContent === "Crosses win!" && playerOnePiece.textContent ==="Player-one: Crosses"){
        crossesScore+= 1;
        crossesWin.textContent = crossesScore;
        nextGo.textContent = "Player 1 wins!";
        restart *= -1;
        turn =1;
    } else if(result.textContent === "Noughts win!" && playerTwoPiece.textContent ==="Player-two: Noughts"){
        noughtsScore+= 1;
        noughtsWin.textContent = noughtsScore; 
        nextGo.textContent = "Player 2 wins!";
        restart *= -1;
        turn =1;
    }else if(result.textContent === "Crosses win!" && playerTwoPiece.textContent ==="Player-two: Crosses"){
        noughtsScore+= 1;
        noughtsWin.textContent = noughtsScore; 
        nextGo.textContent = "Player 2 wins!";
        restart *= -1;
        turn =1;
        
    }
}

//function that resets the boards once the end of a game has been reached to allow another game to be played
let resetGame = function(){
    if(restart ===-1){
        restart =1;
        result.textContent = "";
        for (i = 0; i < 9; i++){
            let a =document.getElementById(`${i}`);
            while(a.firstChild){
            a.removeChild(a.firstChild);
            a.className= "";
            a.className = "not-used";
            turn = 1;
            };
        };
    }
    
}

//function ends game if all squares are taken and there has been no winner
//then triggers resetGame to clear the board.
let allSquaresTaken = function(){
    let all =[];
    for(i = 0; i < 9; i++){
        (function test(){
            all[i] = document.getElementById(`${i}`);
            check[i] = all[i].classList.contains("done");
            })();
        }
    if(check.every(e=>e===true)){
        result.textContent = "draw!";
        restart *=-1;
        nextGo.textContent = "draw!";
        resetGame();
    }
}


//creates a click event for restart button that resets the board
let restartButton = function(){
    restartElement.addEventListener("click",function(){    
    result.textContent = "";
    for (i = 0; i < 9; i++){
        let a =document.getElementById(`${i}`);
        while(a.firstChild){
        a.removeChild(a.firstChild);
        a.className= "";
        a.className = "not-used";
        };
    };
});
};




return {
    createSquares,createSquaresComputer , swapPieces
};
}
)();

gameBoard.createSquares();

let oneOrTwoPlayer = function(){
    let submit = document.getElementById("submit");
    submit.addEventListener("click", function(){
        let result = document.getElementById("winner");
        let onePlayer = document.getElementById("one-player");
        let twoPlayer = document.getElementById("two-player");
        result.textContent="";
        container.textContent="";
        if(onePlayer.checked){
            gameBoard.createSquares();            
        }else if(twoPlayer.checked){            
            gameBoard.createSquaresComputer();           
        };
    });
}
oneOrTwoPlayer();
gameBoard.swapPieces();








