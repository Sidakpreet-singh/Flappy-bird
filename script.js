const bird = document.querySelector('.bird');
const gameCard = document.querySelector('.gamecard');
const pipe = document.querySelector('.pipe');


let birdTop = 200;
let gravity = 2;

setInterval(()=>{
    birdTop+=gravity;
    bird.style.top=birdTop +"px";
    
    

},20);
setInterval(createPillar,2000);

document.addEventListener("keydown",(e)=>{
    if(e.code === 'Space'){
        birdTop-=60;
        bird.style.top=birdTop +"px";

    }
    
});

function createPillar() {

    let topPipe = document.createElement("div");
    let bottomPipe = document.createElement("div");

    topPipe.classList.add("pipe");
    bottomPipe.classList.add("pipe");

    topPipe.style.top = "0px";
    bottomPipe.style.bottom = "0px";


    let gap = 200;

    let maxHeight = gameCard.clientHeight;

    let topPipeHeight =
        Math.random() * (maxHeight - gap) + 50;

    let bottomPipeHeight =
        maxHeight - topPipeHeight - gap;


    topPipe.style.height = topPipeHeight + "px";
    bottomPipe.style.height = bottomPipeHeight + "px";

    gameCard.append(topPipe, bottomPipe);


    let pipeLeft = gameCard.clientWidth;


    const pipeMovement = setInterval(() => {

        pipeLeft -= 3;

        topPipe.style.left = pipeLeft + "px";
        bottomPipe.style.left = pipeLeft + "px";


        

        if (
            birdTop < 0 ||
            birdTop + bird.clientHeight >
            gameCard.clientHeight - 70
        ) {

            gameOver();

            clearInterval(pipeMovement);

            return;
        }


  

        let birdRect =
            bird.getBoundingClientRect();

        let topPipeRect =
            topPipe.getBoundingClientRect();

        let bottomPipeRect =
            bottomPipe.getBoundingClientRect();


        if (
            isColliding(birdRect, topPipeRect) ||
            isColliding(birdRect, bottomPipeRect)
        ) {

            gameOver();

            clearInterval(pipeMovement);

            return;
        }


    

        if (pipeLeft < -40) {

            topPipe.remove();
            bottomPipe.remove();

            clearInterval(pipeMovement);
        }

    }, 20);
}

function isColliding(rect1, rect2) {

    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

let isGameOver = false;


function gameOver(){
    if(isGameOver) return;

    isGameOver = true;
    alert('Game Over');
    location.reload();

}