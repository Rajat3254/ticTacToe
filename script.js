const player=document.querySelector('.currentPlayer');
let box=document.querySelector('.box-1');
let currentPlayer="X";
const boxes=document.querySelectorAll('.box');
const gameInfo=document.querySelector('.btn');
const winnerName=document.querySelector('.win');
const boxees=document.querySelector('.boxees');
const playerName=document.querySelector('.playerName');
let gameGrid=["","","","","","","","",""];
let cnt=0;
const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
boxes.forEach((box,index) => {
    box.addEventListener('click',()=>{
        if(!gameInfo.innerText){
            gameInfo.classList.remove('hidden');
            gameInfo.classList.add('flex');
            gameInfo.innerText="Restart";
        }
       
        if(!box.innerText){  
            box.innerText=`${currentPlayer}`;
            gameGrid[index]=currentPlayer;
            cnt++;
            if(currentPlayer=="O"){
                box.style.color="white";
            }
          
            swapPlayer();
           checkGameOver();
        }
    });
});

function swapPlayer(){
    if(currentPlayer=="X"){
        currentPlayer="O";
        player.innerText=`Current Player - ${currentPlayer}`;
    }else{
        currentPlayer="X";
        player.innerText=`Current Player - ${currentPlayer}`;
    }
}
function intializeGame(){
    cnt=0;
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    player.innerText=`Current Player - ${currentPlayer}`;
    boxes.forEach((box,index)=>{
        box.innerText="";
        box.style.color ="";
    });
    gameInfo.innerText="";
    gameInfo.classList.remove('flex');
        gameInfo.classList.add('hidden');
}
intializeGame();

gameInfo.addEventListener('click',()=>{
    if(gameInfo.innerText!=="New Game")
    intializeGame();
    else{
        playerName.classList.remove('opacity-0');
        boxees.classList.remove('opacity-0');
        winnerName.classList.add('hidden');
        intializeGame();
    } 
});

function checkGameOver(){
  let winner="";
  winningPosition.forEach((position)=>{
    if((gameGrid[position[0]]!==""||gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") &&(gameGrid[position[0]]==gameGrid[position[1]] && gameGrid[position[1]]==gameGrid[position[2]])){
        winner=gameGrid[position[0]];
    }
    if(winner!==""){
        playerName.classList.add('opacity-0');
        boxees.classList.add('opacity-0');
        winnerName.classList.remove('hidden');
        //winnerName.classList.add('opacity-100');
        winnerName.innerText=`${winner} Winner!`;
        gameInfo.innerText="New Game";
    }else if(cnt==9){
        playerName.classList.add('opacity-0');
        boxees.classList.add('opacity-0');
        winnerName.classList.remove('hidden');
        winnerName.innerText="XO DRAW!";
        gameInfo.innerText="New Game";
        cnt=0;
    }
  });
}
