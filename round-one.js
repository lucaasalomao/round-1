

class Player {
    constructor() {
        this.positionX = 10;
        this.positionY = 175;
    }
    move() {
        
    }
}

function startGame(){
    const canvas = document.getElementById('game-space');
    const context = canvas.getContext('2d');
    
    const ground = new Image();
    ground.src = "C:/Users/27095/Desktop/git-practices/round-1/images/ground.jpg";
    const player = new Image();
    player.src = "C:/Users/27095/Desktop/git-practices/round-1/images/player.png";
    const doll = new Image();
    doll.src = "C:/Users/27095/Desktop/git-practices/round-1/images/doll.png";

    gameStart = false
    
    document.getElementById('start-button').onclick = () => {
        context.drawImage(ground,0,0)
        context.drawImage(player,10,175,20,30)
        context.drawImage(doll,520,140,70,100)
        gameStart = true
    };

    let canvasVariables = [canvas, context,gameStart]

    return canvasVariables
}

function restartGame(canvasVariables){
    console.log(canvasVariables[2])
    if(canvasVariables[2]){
        document.getElementById('restart-button').onclick = () => {
            canvasVariables[1].clearRect(0, 0, canvasVariables[0].width, canvasVariables[0].height)
            console.log("Estamos dando restart")
            startGame()
        };
    }
}

window.onload = () => {
    let canvasVariables = startGame()
    setInterval(function() {
        restartGame(canvasVariables)}
        , 5000);
}


