const boxes=document.querySelectorAll(".box");
const gameinfo=document.querySelector(".game-info");
const newgamebtn=document.querySelector(".btn");

let currentplayer;
let gamegrid;
const winningposition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let create a function to initailize the game
function initgame(){
   currentplayer="X";
   gamegrid=["","","","","","","","",""];
   boxes.forEach((box,index)=>{
      box.innerText="";
      boxes[index].style.pointerEvents="all";
      //green boxes ko remove karna hai.
      box.classList=`box box${index+1}`;
   });
   newgamebtn.classList.remove("active");
   gameinfo.innerText=`Current Player-${currentplayer}`;
}
initgame(); 
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handclick(index);
    })
});
function checkgameover(){
   let answer= "";
  winningposition.forEach((position)=>{//boxes sholud be non-empty and same in value.
    if((gamegrid[position[0]]!=="" || gamegrid[position[1]]!=="" || gamegrid[position[2]]!=="")
     && (gamegrid[position[0]]===gamegrid[position[1]] ) &&(gamegrid[position[1]]===gamegrid[position[2]])){
       if(gamegrid[position[0]]==="X")
       answer="X";
    else 
    answer="O";
//disable pointer event
boxes.forEach((box)=>{
    box.style.pointerEvents="none";
})
boxes[position[0]].classList.add("win");
boxes[position[1]].classList.add("win");
boxes[position[2]].classList.add("win");

    }
  });
   // it means we have a winner;
  if(answer!==""){
     gameinfo.innerText=`Winner Player-${answer}`;
     newgamebtn.classList.add("active");
     return;
  }
   //when there is no winner
     let fillcount=0;
     gamegrid.forEach((box)=>{
        if(box!=="")
        fillcount++;
     });
     if(fillcount===9){
        gameinfo.innerText="Game Tied !";
        newgamebtn.classList.add("active");
     }
}
function swapturn(){
    if(currentplayer==="X"){
        currentplayer="O";
    }
    else{
        currentplayer='X';
    }
    gameinfo.innerText=`Current Player-${currentplayer}`;
}
function handclick(index){
    if(gamegrid[index]===""){
        boxes[index].innerText=currentplayer;//ye game(ui) mai change karega
        gamegrid[index]=currentplayer;// ye yaha js mai change karega.
        boxes[index].style.pointerEvents="none";
        swapturn();
        checkgameover();
    }
}
newgamebtn.addEventListener("click",initgame);