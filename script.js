const canvasInit = document.getElementById('game-space');
const context = canvasInit.getContext('2d');

const playerImg = new Image();
playerImg.src = "images/player.png";
const guard = new Image();
guard.src = "images/guard.png";
const doll = new Image();
doll.src = "images/doll.png";
const finishLine = new Image();
finishLine.src = "images/finish-line.png";
const tree = new Image();
tree.src = "images/tree.png";
const startPlace = new Image();
startPlace.src = "images/start.png"

class Game {
  
  constructor() {
    this.canvas = canvasInit
    this.context = context
    this.points = []
    this.guardsInitPosition = []
    this.time = 30000
    this.guardQtyOnGame = 30
  }

  createPlayGround = () => {
    this.context.drawImage(finishLine,690,0,20,this.canvas.height)
    this.context.drawImage(guard,790,105,20,30)
    this.context.drawImage(doll,765,155,65,90)
    this.context.drawImage(guard,790,265,20,30)
    this.context.drawImage(startPlace,10,190,20,20)
    this.createGuardPositions()
    this.updateTree()
    updateTime()
  };

  createGuardPositions = () => { 

    for (let guardQty = 0; guardQty < this.guardQtyOnGame; guardQty++) {
      let currentGuard = new Array
      
      const limitInitGuardX = 80
      const limitInitGuardY = 50

      const guardPositionLeft = Math.floor((Math.random() * (590))+limitInitGuardX);
      const guardPositionRight = guardPositionLeft + 20
      const guardPositionTop = Math.floor((Math.random() * (320))+limitInitGuardY);
      const guardPositionBottom = guardPositionTop + 30

      this.context.drawImage(guard,guardPositionLeft,guardPositionTop,20,30)

      currentGuard.push(guardPositionLeft)
      currentGuard.push(guardPositionRight)
      currentGuard.push(guardPositionTop)
      currentGuard.push(guardPositionBottom)

      this.guardsInitPosition.push(currentGuard)

    }
  };

  updateTree = () => {
     
    game.context.drawImage(tree,720,155,40,90)
    let treeCondition = true 

    var treeInterval = setInterval( function() {

      if (game.time % 2 === 0) {
        treeCondition = false 
        let latestX = player.posX
        let latestY = player.posY
        game.context.clearRect(720,155,40,90)
        //player.checkPlayersMove(player.posX,player.posY)
        var playersMoveInterval = setInterval( function() {
          if ((latestX != player.posX)|(latestY != player.posY)) {
            console.log("andou")
            player.lose = true
          } else if (treeCondition === true) {
            clearInterval(playersMoveInterval)
          }
        }, 50)
      } else if (game.time === 0) {
        clearInterval(treeInterval)
      } else {
        game.context.drawImage(tree,720,155,40,90)
        treeCondition = true 
      }
      console.log(treeCondition)
      }, 3000)
    
  }

}

const game = new Game()

class Player {
  
  constructor() {
    this.posX = 35;
    this.posY = 190;
    this.width = 20;
    this.height = 30;
    this.movePosX = 0;
    this.movePosY = 0;
    this.playerContext = game.context;
    this.lose = false;
  };

  drawPlayer = () => {
    this.playerContext.drawImage(playerImg,this.posX,this.posY,this.width,this.height)
  };
 
  movePlayer = (qtyOfMove,typeOfMove) => {

    this.playerContext.clearRect(this.posX, this.posY, this.width, this.height)
    
    if ((typeOfMove === "ArrowLeft") | (typeOfMove === "ArrowRight")){
      this.posX += qtyOfMove
    } else { 
      this.posY += qtyOfMove
    }

    this.playerContext.drawImage(playerImg,this.posX,this.posY,this.width,this.height)
    this.crashWith()
  };

  goBackPlayer = () => {
    this.playerContext.clearRect(this.posX, this.posY, this.width, this.height)
    this.posX = 35
    this.posY = 245
    this.playerContext.drawImage(playerImg,this.posX,this.posY,this.width,this.height)
  };

  crashWith = () => {
 
    for (let i = 0; i < game.guardQtyOnGame;i++) { 
      let guard = game.guardsInitPosition[i]

      const freeLeft = this.posX > guard[1]; // playerLeft > guardRight
      const freeRight = this.posX + this.width < guard[0]; // playerRight < guardLeft
      const freeTop = this.posY > guard[3]; // PlayerTop > guardBottom
      const freeBottom = this.posY + this.height  < guard[2]; // playerBottom < guardTop
      if (!(freeLeft || freeRight || freeTop || freeBottom)){
        return this.goBackPlayer()
      }
    }

  };

  checkPlayersMove = (lastPositionX,lastPositionY) => {
    var playersMoveInterval = setInterval( function() {
        if ((lastPositionX != player.posX)|(lastPositionY != player.posY)) {
          clearInterval(playersMoveInterval)
          console.log("andou")
          ///player.lose = true
        }
      }, 50)
  };

}

const player = new Player()

function checkWin (rightPlayerPosition) {
  if (rightPlayerPosition >= 700) {
    var gameDiv = document.getElementById("game-div")
    var canvasDiv = document.getElementById("canvas-div")
    var timer = document.getElementById("timer")
    //var start = document.getElementById("start-button")
    //start.id = "restart-button"
    //start.innerText = "Refresh Page"
    
    var youWinText = document.createElement("h2")
    youWinText.textContent = "You Won! Refresh the page and play again o/"
    
    canvasDiv.remove()
    timer.remove()
    gameDiv.appendChild(youWinText)
    score()
  }
}

function updateTime () {
  var timeElement = document.createElement("h3")
  timeElement.textContent = `Tempo restante: ${game.time} s`

  var timerDiv = document.getElementById("timer")
  timerDiv.appendChild(timeElement)
  
  var myInterval = setInterval( function() {
    if ((game.time === 0)|(player.lose===true)){
      clearInterval(myInterval)
      var gameDiv = document.getElementById("game-div")
      var canvasDiv = document.getElementById("canvas-div")
      var timer = document.getElementById("timer")
      
      var youLoseText = document.createElement("h2")

      if (game.time === 0){
        youLoseText.textContent = "Oohps! No more time to run, refresh the page and try again (º.º)_/"
      } else {
        youLoseText.textContent = "Oohps! She caught you x.x Refresh the page and try again!"
      }

      canvasDiv.remove()
      timer.remove()
      gameDiv.appendChild(youLoseText)
    }
    timeElement.innerText = `Tempo restante: ${game.time} s`
    game.time -=1
    }, 1000)
}

function score () {
  game.points.push(30 - game.time)
  var scoreDiv = document.getElementById("score")
  var scoreElement = document.createElement("h3")
  scoreElement.innerText = `Você terminou em ${game.points[game.points.length-1]} s`
  scoreDiv.appendChild(scoreElement)
}


window.addEventListener("keydown", function(e) {
  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
  }
}, false);

window.addEventListener("load", () => {
  document.getElementById('start-button').onclick = () => {
    window.scrollTo(0,document.body.scrollHeight);
    var startButton = document.getElementById("start-button")
    game.createPlayGround()
    player.drawPlayer()
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          player.movePlayer(-5,"ArrowLeft")  
          break;
        case "ArrowRight":
          player.movePlayer(5,"ArrowRight")
          checkWin(player.posX)
          break;
        case "ArrowUp":
          player.movePlayer(-5,"ArrowUp")
          break;
        case "ArrowDown":
          player.movePlayer(5,"ArrowDown")
          break;
      } 
    })
    startButton.disabled = true;
  }
/*
  document.getElementById('restart-button').onclick = () => {
    location.reload()
  }*/
}) 