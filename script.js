const board=document.querySelector('.board');
const button=document.querySelector('.btn-start');
const modal=document.querySelector('.modal');
const startGameModal=document.querySelector(".start-game");
const gameOverModal=document.querySelector(".game-over");
const restartModalbtn=document.querySelector(".btn-restart");

const highScoreEl=document.querySelector("#high-score")
const scoreEl=document.querySelector("#score")
const timeEl=document.querySelector('#time')



let highScore=localStorage.getItem("highScore")|| 0;
let score=0;
let time=`00-00`

highScoreEl.innerHTML=highScore

const blockHeight=50;
const blockWidth=50;

const cols= Math.floor(board.clientWidth /blockWidth);
const rows= Math.floor(board.clientHeight /blockHeight);

let intervalID=null;

let timerId=null;

let food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};

// for(let i=0;i<rows*cols;i++){
//     const block=document.createElement('div');
//     block.classList.add('block');
//     board.appendChild(block);
// }

let dirn="down"
const blocks=[]
let snake=[{
    x:1,y:3
}]

for(let row=0;row<rows;row++){
    for(let col=0;col<cols;col++){
         const block=document.createElement('div');
         block.classList.add('block');
        board.appendChild(block);
        // block.innerHTML=`${row}-${col}`
        blocks[`${row}-${col}`]=block
    }
}

function render(){

        let head=null

        blocks[`${food.x}-${food.y}`].classList.add("food")



    if(dirn==="left"){
        head={x:snake[0].x,y:snake[0].y-1}
    }
    else if(dirn==="right"){
        head={x:snake[0].x,y:snake[0].y+1}
    }
    else if(dirn==="down"){
        head={x:snake[0].x+1,y:snake[0].y}
    }
    else if(dirn==="up"){
        head={x:snake[0].x-1,y:snake[0].y}
    }

    if(head.x<0 ||head.x>=rows || head.y<0||head.y>=cols){
        clearInterval(intervalID)
        modal.style.display="flex";
        startGameModal.style.display="none";
        gameOverModal.style.display="flex";
}

    if(head.x==food.x && head.y==food.y){
         blocks[`${food.x}-${food.y}`].classList.remove("food")

         food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}

         blocks[`${food.x}-${food.y}`].classList.add("food")

         snake.unshift(head);

         score+=10;
         scoreEl.innerHTML=score;

         if(score>highScore){
            highScore=score;
            localStorage.setItem("highScore",highScore.toString())
         }

    }

    

    snake.forEach(function(segment){
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
    })

    snake.unshift(head)
    snake.pop()
    snake.forEach(function(segment){
        blocks[`${segment.x}-${segment.y}`].classList.add("fill")
    })
}



button.addEventListener("click",function(){
    modal.style.display="none";
    intervalID=setInterval(() => { render()}, 250);
    timerId=setInterval(() => {
        let [min,sec]=time.split("-").map(Number);

        if(sec==59){
            min+=1;
            sec=0;
        }else{
            sec+=1
        }

        time=`${min}-${sec}`
        timeEl.innerHTML=time
    }, 1000);

})

restartModalbtn.addEventListener("click",restartGame)

function restartGame(){

            modal.style.display="none";
            snake=[{x:1,y:3}]
            dirn="down"
            score=0;
            time=`00-00`
            scoreEl.innerHTML=score;

            timeEl.innerHTML=time
            highScoreEl.innerHTML=highScore

        blocks[`${food.x}-${food.y}`].classList.remove("food")

           snake.forEach(function(segment){
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
    })


    
    
    food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
    intervalID=setInterval(() => { render()}, 250);
        

     
    
    
    

}

addEventListener("keydown",function(event){
    if(event.key=="ArrowUp"){
        dirn="up"
    }
    else if(event.key=="ArrowRight"){
        dirn="right"
    }
    if(event.key=="ArrowLeft"){
        dirn="left"
    }
    if(event.key=="ArrowDown"){
        dirn="down"
    }
})



