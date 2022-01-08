const canvasInit = document.getElementById('game-space');
const context = canvasInit.getContext('2d');

const ground = new Image();
ground.src = "images/ground.jpg";
const playerImg = new Image();
playerImg.src = "images/player.png";
const guard = new Image();
guard.src = "images/guard.png";
const doll = new Image();
doll.src = "images/doll.png";
const finishLine = new Image();
finishLine.src = "images/finish-line.png";

class Game {
  
  constructor() {
    this.canvas = canvasInit
    this.context = context
    this.points = []
    this.guardInitPosition = []
    this.time = 30
  }

  createPlayGround = () => {
    this.context.drawImage(finishLine,820,0,20,this.canvas.height)
    this.context.drawImage(guard,900,150,20,30)
    this.context.drawImage(doll,880,200,70,100)
    this.context.drawImage(guard,900,320,20,30)
    this.createGuardPositions()
    updateTime()
  };

  createGuardPositions = () => { 

    for (let guardQty = 0; guardQty < 10; guardQty++) {
      let guardPositions = new Array
      const limitInitGuardX = 80
      const limitInitGuardY = 50

      const guardPositionX = Math.floor((Math.random() * (750))+limitInitGuardX);
      const guardPositionY = Math.floor((Math.random() * (400))+limitInitGuardY);

      this.context.drawImage(guard,guardPositionX,guardPositionY,20,30)

      guardPositions.push(guardPositionX)
      guardPositions.push(guardPositionY)
      this.guardInitPosition.push(guardPositions)

    }
  }

  clear = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

}

const game = new Game()

class Player {
  
  constructor() {
    this.posX = 10;
    this.posY = 175;
    this.width = 20;
    this.height = 30;
    this.movePosX = 0;
    this.movePosY = 0;
    this.playerContext = game.context;
    this.win = false;
  }


  drawPlayer = () => {
    this.playerContext.drawImage(playerImg,this.posX,this.posY,this.width,this.height)
  }

  movePlayer = () => {
    this.playerContext.clearRect(this.posX, this.posY, this.width, this.height)
    this.playerContext.drawImage(playerImg,this.posX,this.posY,this.width,this.height)
  }

}

const player = new Player()

function checkWin (rightPlayerPosition) {
  if (rightPlayerPosition >= 820) {
    game.win = true
    var canvasDiv = document.getElementById("canvas-div")
    var gameSpace = document.getElementById("game-space")
    
    var youWinText = document.createElement("h4")
    youWinText.textContent = "You Won!"
    youWinText.classList.add("win-game-message")
    var youWinImage = document.createElement("img")
    youWinImage.src = "images/win.jpg" 
    
    gameSpace.remove()
    canvasDiv.appendChild(youWinImage)
    canvasDiv.appendChild(youWinText)
  }
}

function updateTime () {
  var timeElement = document.createElement("h5")
  timeElement.textContent = `${game.time} s`
  timeElement.classList.add("time-spent")

  var timerDiv = document.getElementById("timer")
  timerDiv.appendChild(timeElement)
  
  var myInterval = setInterval( function() {
    if ((game.time === 0)|(game.win===true)){
      score()
      clearInterval(myInterval)
    }
    timeElement.innerText = `${game.time} s`
    game.time -=1
    }, 1000)
}

function score () {
  game.points.push(30 - game.time)
  var scoreDiv = document.getElementById("score")
  var scoreElement = document.createElement("h4")
  scoreElement.innerText = `${game.points.length}º Jogo - Terminou em ${game.points[game.points.length-1]} s`
  scoreDiv.appendChild(scoreElement)
}

window.addEventListener("load", () => {
  document.getElementById('start-button').onclick = () => {
    game.createPlayGround()
    player.drawPlayer()
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          player.posX -= 4
          player.movePlayer()
          break;
        case "ArrowRight":
          player.posX += 50
          player.movePlayer()
          checkWin(player.posX)
          break;
        case "ArrowUp":
          player.posY -= 4
          player.movePlayer()
          break;
        case "ArrowDown":
          player.posY += 4
          player.movePlayer()
      }
    })

  }

  /*
  document.getElementById('restart-button').onclick = () => {
    game.clear()
    player.clearPlayer()
    game.createPlayGround()
    player.drawPlayer()
    console.log("entrei no restart")
  }
  */
})