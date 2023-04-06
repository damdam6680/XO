var board;
var human = "O";
var ai = "X";
var wybor =  document.getElementsByName('rb');
var currPlayer;

    

    



// window.onload = function() {
//     setGame();
    
// }

function setGame() {
  var elem = document.getElementById('but');
    board = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ]
    for(i = 0; i < wybor.length; i++) {
        if(wybor[i].checked){
             currPlayer  = wybor[i].value.toString();
          }
      }    

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.innerText = "";
            
            tile.addEventListener("click", setTile);
            document.getElementById("board").appendChild(tile);
        }
    }
    if(currPlayer === ai){
      najruch(board);
    }
    elem.parentNode.removeChild(elem);
}
let wy_r;
let wy_c;
let wybrane = true;
function setTile(){
    let prz = ZaznaczWygranego();

    if(prz !== null){
      return;
    }

    let coords = this.id.split("-");

    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    
        if(board[r][c] ==! ' '){
            
            board[r][c] = currPlayer;
            this.innerText = currPlayer;
           
        
    
            if(prz == null){
                if(currPlayer == human){
                    najruch(board);
            }else{
                currPlayer = human;
            }
            }
            board.forEach(function(entry) {
                console.log(entry);
              });
              console.log(currPlayer);
        }
    console.log("przegrany" + ZaznaczWygranego());
}



function ZaznaczWygranego(){
    let przegrany = null;
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {

            for (let i = 0; i < 3; i++) {
                 let tile = document.getElementById(r.toString() + "-" + i.toString());
                 tile.classList.add("winner");
            }

            przegrany = board[r][1];
            window.alert("przegrywa " + przegrany);
            location.reload();
            return;
        }
    }

    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] ==  board[2][c] && board[0][c] != ' ') {
            for (let i = 0; i < 3; i++) {
                 let tile = document.getElementById(i.toString() + "-" + c.toString());                
                 tile.classList.add("winner");
            }
            przegrany = board[1][c];
            window.alert("przegrywa " + przegrany);
            location.reload();
            return;
        }
    }


    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());                
           tile.classList.add("winner");
        }
        przegrany = board[1][1];
        window.alert("przegrywa " + przegrany);
        location.reload();
        return;
    }

    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {

         let tile = document.getElementById("0-2");                
         tile.classList.add("winner");

         tile = document.getElementById("1-1");                
         tile.classList.add("winner");

         tile = document.getElementById("2-0");                
         tile.classList.add("winner");
         przegrany = board[1][1];
         window.alert("przegrywa " + przegrany);
         location.reload();
         return;
    
    }
    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == ' ') {
          openSpots++;
        }
      }
    }
  
    if (przegrany == null && openSpots == 0) {
      window.alert("remis");
      location.reload();
      return 'tie';
    }else{
        return przegrany;
    }
  
}


function checkWinner(){
    let przegrany = null;
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            przegrany = board[r][1];
            return;        
        }
    }
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] ==  board[2][c] && board[0][c] != ' ') {
            przegrany = board[1][c]; 
            return;    
        }
    }
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        przegrany = board[1][1];
        return;  
       }

    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        przegrany = board[1][1];
        return;  
    }
    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == ' ') {
          openSpots++;
        }
      }
    }
      if (przegrany == null && openSpots == 0) {
      return 'tie';
     
    } else {
      return przegrany;
    }
  
}
let bestScore = -Infinity;
let bestMove;
function najruch(board){
    
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(board[i][j] == ' '){
                board[i][j] = ai;
                let score = minmax(board, 0, false);
                board[i][j] = ' ';
                if(score > bestScore){
                    bestScore = score
                    bestMove = {i , j};
                }
            }
        }
    }

    
    
    board[bestMove.i][bestMove.j] = ai; 
    

    currPlayer = human;
    console.log("best move =" + bestMove.i + " " + bestMove.j);
    let temp = document.getElementById(bestMove.i.toString() + "-" + bestMove.j.toString());
    temp.innerText = "X";
    bestScore = -Infinity
}
let scores = {
    X: -10,
    O: 10,
    tie: 0
  };
function minmax(board, depth, isMaximizaing){
    let result = checkWinner();
    if (result !== null) {
      return scores[result];
    }
  
    if (isMaximizaing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == ' ') {
            board[i][j] = ai;
            let score = minmax(board, depth + 1, false);
            board[i][j] = ' ';
           if(score > bestScore){
             bestScore = score;
           }
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == ' ') {
            board[i][j] = human;
            let score = minmax(board, depth + 1, true);
            board[i][j] = ' ';
            if(score < bestScore){
                bestScore = score;
              }
          }
        }
      }
      return bestScore;
    }
}