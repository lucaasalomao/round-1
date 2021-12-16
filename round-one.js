window.onload = () => {
    const canvas = document.getElementById('game-space');
    const context = canvas.getContext('2d');

    const ground = new Image();
    ground.src = "C:/Users/27095/Desktop/git-practices/round-1/images/ground.jpg";
    const player = new Image();
    player.src = "C:/Users/27095/Desktop/git-practices/round-1/images/player.png";
    const doll = new Image();
    doll.src = "C:/Users/27095/Desktop/git-practices/round-1/images/doll.png";

    document.getElementById('start-button').onclick = () => {
        console.log("Apertei")
        context.drawImage(ground,0,0)
        context.drawImage(player,10,175,20,30)
        context.drawImage(doll,520,140,70,100)
    };
    
    function movePlayer() {
        
    }
}


