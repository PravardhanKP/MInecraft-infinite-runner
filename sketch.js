var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player,problem,wepon,base,bg;
var problem1,problem2,problem3,problem4,problemimg,weponimg,baseimg,dedPlayerimg,blastimg;
var helper,helperimg,helper2,helper2img,helper3,helper3img,helper4,helper4img,helper5,helper5img;

var problemDeathSound,problemSound,helper1sound,helper2sound,helper3sound,helper4sound,helper5sound;

var invisibleGround;

var bg2;

var cloudsGroup, cloudImage;

var score=0;

var gameOver, restart;


function preload(){
  
  baseimg = loadImage("baseBlock.png");
  
  bg = loadImage("monstor.jpg");

  cloudImage = loadImage("cloud.png");
  
  gameOverImg = loadImage("gameOver.png");

  playerimg = loadImage("playerOriginal.png");
  problem1 = loadImage("problem.png");
  problem2 = loadImage("problem2.png");
  problem3 = loadImage("problem3.png");
  problem4 = loadImage("problem4.png");
  dedPlayerimg = loadImage("dedPlayer.png");
  blastimg = loadImage("blast.jpg");
  helperimg = loadImage("helper.png");
  helper2img = loadImage("helper2.png");
  helper3img = loadImage("helper3.png");
  helper4img = loadImage("helper4.png");
  helper5img = loadImage("helper5.png");

  bg2 = loadImage("minecraft.jpg");

  problemSound = loadSound("problem.mp3");
  problemDeathSound = loadSound("problemDeath.mp3");

  helper1sound = loadSound("helper1.mp3");
  helper2sound = loadSound("helper2.mp3");
  helper3sound = loadSound("helper3.mp3");
  helper4sound = loadSound("helper4.mp3");
  helper5sound = loadSound("helper5.mp3");
  
}

function setup() {
  createCanvas(1080,590);
  
  /*base = createSprite(200,200,500,500);
  base.addImage("ground",baseimg);
  base.scale = 0.1;
  base.x = base.width /2;
  base.velocityX = -(6 + 3*score/100);
*/
  player = createSprite(50,500,20,50);
  
  player.addImage("running",playerimg);
  player.addImage("collided",dedPlayerimg);
  player.scale = 0.1;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
 // restart = createSprite(300,140);
 // restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  //restart.scale = 0.5;

  gameOver.visible = false;
 // restart.visible = false;
  
  invisibleGround = createSprite(200,560,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  problemGroup = new Group();
  helperGroup = new Group();
  
  score = 0;
}

function draw() {
  //player.debug = true;
  background(bg);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    problemGroup.velocityX = -(6 + 3*score/100);

    if(keyDown("space")&&player.y>=161) {
      player.velocityY = -12;
    }
  
    player.velocityY = player.velocityY + 0.8

    if (problemGroup.isTouching(helperGroup)){
      problemGroup[0].destroy();
     // problemDeathSound.play();
      //problemDeathSound.setVolume(0.05);
      }
  
    /*if (base.x < 0){
      base.x = base.width/2;
    }
  */
    player.collide(invisibleGround);
    spawnClouds();
    spawnProblem();
    helpingObject();
    //distory();
    if(problemGroup.isTouching(player)){
        gameState = END;
    }
    }
  else if (gameState === END) {
    gameOver.visible = false;
    fill("yellow");
    textSize(35);
    text("Game over",200,300);

    fill("red");
    textSize(40);
    text("you lost NOOB",500,500);
    //restart.visible = true;
    
    //set velcity of each game object to 0
    //base.velocityX = 0;
    player.velocityY = 0;
    problemGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    player.changeImage("collided",dedPlayerimg);
    
    //set lifetime of the game objects so that they are never destroyed
    problemGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
   // if(mousePressedOver(restart)) {
     // reset();
    //}
  }
  if(score >= 10000){
    background(bg2);
  }
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(1080,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 1080;
    
    //adjust the depth
    cloud.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnProblem() {
  if(frameCount % 60 === 0) {
    var problem = createSprite(1080,500,10,40);
   // problem.addImage(problemimg);
    problem.scale = 0.1;
    //obstacle.debug = true;
    problem.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: problem.addImage(problem1);
              break;
      case 2: problem.addImage(problem2);
              break;
      case 3: problem.addImage(problem3);
              break;
      case 4: problem.addImage(problem4);
              break;
      default: break;
    }

    console.log(problemGroup.depth);
    problemSound.play();
    //assign scale and lifetime to the obstacle           
    //problem.scale = 0.5;
    problem.lifetime = 300;
    //add each obstacle to the group
    problemGroup.add(problem);
  }
}

function helpingObject(){
  if (keyDown("a")){
    helper = createSprite(80,500,100,100);
    helper.addImage(helperimg);
    helper1sound.play();
    //helper.debug = true;
    helper.scale = 0.5;
    helper.velocityX = 2 ;
    helper.lifetime = 100;
    helperGroup.add(helper);
  }
  if (keyDown("s")){
    helper2 = createSprite(80,500,100,100);
    helper2.addImage(helper2img);
    helper2.scale = 0.1;
    helper2.velocityX = 2 ;
    helper2.lifetime = 100;
    helperGroup.add(helper2);
    helper2sound.play();
  }
  if (keyDown("d")){
    helper3 = createSprite(80,500,100,100);
    helper3.addImage(helper3img);
    helper3.scale = 0.05 ;
    helper3.velocityX = 2 ;
    helper3.lifetime = 100;
    helperGroup.add(helper3);
    helper3sound.play();
  }
  if (keyDown("f")){
    helper4 = createSprite(80,500,100,100);
    helper4.addImage(helper4img);
    helper4.scale = 0.1;
    helper4.velocityX = 2 ;
    helper4.lifetime = 100;
    helperGroup.add(helper4);
    helper4sound.play();
  }
  if (keyDown("g")){
    helper5 = createSprite(80,500,100,100);
    helper5.addImage(helper5img);
    helper5.scale = 0.5;
    helper5.velocityX = 2 ;
    helper5.lifetime = 100;
    helperGroup.add(helper5);
    helper5sound.play();
  }

//helperGroup = problemGroup;
//problemGroup = problemGroup+1;
//helperGroup = helperGroup+1;  

console.log(helperGroup.depth);

}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
 // restart.visible = false;
  
  problem.destroyEach();
  cloudsGroup.destroyEach();
  
  player.changeAnimation("running",playerimg);
  
 
  
  score = 0;
  
}

//function distory(){

//}

/*
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
*/