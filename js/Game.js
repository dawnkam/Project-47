class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");
   }

  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount();

    p1 = createSprite(width / 2 - 50, height - 100);
    p1.addImage("p1", pImage);
    p1.scale = 0.3;

    p2 = createSprite(width / 2 + 100, height - 100);
    p2.addImage("p2", pImage);
    p2.scale = 0.3;
    pokemons = [p1,p2]
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: "wait",
        players: {},
        carsAtEnd: 0
      });
      window.location.reload();
    });
  }

  handlePlayerControls() {
    if(this.blast === false){
      if (keyIsDown(UP_ARROW)) {
        this.playerMoving = true;
        player.positionY += 10;
        player.update();
      }
  
      if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
        this.leftKeyActive = true;
        player.positionX -= 5;
        player.update();
        this.playerMoving = true;
      }
  
      if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
        this.leftKeyActive = false;
        player.positionX += 5;
        player.update();
        this.playerMoving = true;
      }
    }
   
  } 

  play() {
   this.handleElements();
   this.handleResetButton();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        pokemons[index - 1].position.x = x;
        pokemons[index - 1].position.y = y;


        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);


          // Changing camera position in y direction
          camera.position.y = pokemons[index - 1].position.y;
        }
      }

      this.handlePlayerControls();

      drawSprites();
    }
  }
}