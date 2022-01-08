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
    this.points = 0
    this.guardInitPosition = []
  }

  createPlayGround = () => {
    this.context.drawImage(finishLine,820,0,20,this.canvas.height)
    this.context.drawImage(guard,900,150,20,30)
    this.context.drawImage(doll,880,200,70,100)
    this.context.drawImage(guard,900,320,20,30)
    this.createGuardPositions()
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
  }

  /*
  positionPlayer = () => {
    this.posX += this.movePosX
    this.posY += this.movePosY
  }
  */

  drawPlayer = () => {
    this.playerContext.drawImage(playerImg,this.posX,this.posY,this.width,this.height)
  }

  movePlayer = () => {
    //this.positionPlayer()
    this.playerContext.clearRect(this.posX, this.posY, this.width, this.height)
    this.playerContext.drawImage(playerImg,this.posX,this.posY,this.width,this.height)
  }

}

const player = new Player()

function checkWin (rightPlayerPosition) {
  if (rightPlayerPosition >= 820) {
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


window.addEventListener("load", () => {
  document.getElementById('start-button').onclick = () => {
    game.createPlayGround()
    player.drawPlayer()
    
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          //player.movePosX -= 1
          player.posX -= 4
          player.movePlayer()
          break;
        case "ArrowRight":
          //player.movePosX += 1
          player.posX += 50
          player.movePlayer()
          checkWin(player.posX)
          break;
        case "ArrowUp":
          //player.movePosY -= 1
          player.posY -= 4
          player.movePlayer()
          break;
        case "ArrowDown":
          //player.movePosY += 1
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