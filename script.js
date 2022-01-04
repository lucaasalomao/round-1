const canvasInit = document.getElementById('game-space');
const context = canvasInit.getContext('2d');

const ground = new Image();
ground.src = "images/ground.jpg";
const playerImg = new Image();
playerImg.src = "images/player.png";
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
    this.context.drawImage(ground,0,0)
    this.context.drawImage(doll,520,140,70,100)
    this.context.drawImage(finishLine,500,0,20,this.canvas.height)
    this.createGuardPositions()
  };

  createGuardPositions = () => { 

    for (let guard = 0; guard < 6; guard++) {
      let guardPositions = new Array

      const guardPositionX = Math.floor(Math.random() * (300));
      const guardPositionY = Math.floor(Math.random() * (300));

      context.drawImage(playerImg,guardPositionX,guardPositionY,20,30)

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

  positionPlayer = () => {
    this.posX += this.movePosX
    this.posY += this.movePosY
  }

  drawPlayer = () => {
    this.positionPlayer()
    this.playerContext.drawImage(playerImg,this.posX,this.posY,this.width,this.height)
  }

  clearPlayer = () => {
    this.playerContext.clearRect(this.posX, this.posY, this.width, this.height)
  }

}

const player = new Player()

window.addEventListener("load", () => {
  document.getElementById('start-button').onclick = () => {
    game.createPlayGround()
    
    player.drawPlayer()
    
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          player.movePosX -= 1;
          break;
        case "ArrowRight":
          player.movePosX += 1;
          break;
        case "ArrowUp":
          player.movePosY -= 1;
          break;
        case "ArrowDown":
          player.movePosY += 1;
      }
    })

  }

  document.getElementById('restart-button').onclick = () => {
    game.clear()
    player.clearPlayer()
    game.createPlayGround()
    player.drawPlayer()
    console.log("entrei no restart")
  }
})