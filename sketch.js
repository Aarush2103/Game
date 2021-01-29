var player;
var ground,background,invisibleGround;
var enemy1,enemy2,enemy3;

var playerIdle,backgroundImg,playerRun,groundImg,playerJump;
var playerRun2,playerJump2;
var wall,obstacle,obstaclesGroup;

var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var house,houseImg,gameOverImg;
var gameState = "play";

//3912 end
function preload(){
playerIdle = loadAnimation("idle.png");
playerRun = loadAnimation("run.png");
playerRun2 = loadAnimation("run2.png");
playerJump = loadAnimation("jump.png");
playerJump2 = loadAnimation("jump2.png");



obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");

houseImg = loadImage("house.png");
backgroundImg = loadImage("BG.png");
groundImg = loadImage("ground.jpg");
gameOverImg = loadImage("over.png");
}

function setup(){
createCanvas(displayWidth,displayHeight-40);
player = createSprite(200,790,20,20)
player.addAnimation("idle",playerIdle);
player.addAnimation("running",playerRun);
player.addAnimation("running2",playerRun2);
player.addAnimation("jumping",playerJump);
player.addAnimation("jumping2",playerJump2);
player.setCollider("circle",-150,0,200);
//player.debug = true;


player.scale = 0.3;

ground = createSprite(-200,1000,8000,100);
ground.addImage(groundImg)
invisibleGround = createSprite(-200,990,8000,100);
invisibleGround.visible = false;
wall = createSprite(100,100,10,4000);
wall.visible = false;

house = createSprite(3900,850,50,50);
house.addImage(houseImg)
house.scale = 1.5;

obstaclesGroup = new Group();
}

function draw(){
background(backgroundImg);


player.changeAnimation("idle",playerIdle);

if(gameState === "play") {
player.velocityY = player.velocityY + 0.8;
if(keyDown("w") || keyDown("UP_ARROW")) {
player.x = player.x+3; 
player.changeAnimation("running",playerRun);
}

if(keyDown("s") || keyDown("DOWN_ARROW")) {
    player.x = player.x-3;    
 player.changeAnimation("running2",playerRun2);
    }

if(keyDown("SPACE") && player.y >=865) {
 player.velocityY = -20;   
}  

if(player.y <=865){
player.changeAnimation("jumping",playerJump);
}

if((player.y <=865 && keyDown("s")) ||(player.y <=865 && keyDown("DOWN_ARROW"))){
    player.changeAnimation("jumping2",playerJump2);
    }

if(player.isTouching(obstaclesGroup)) {
 player.x = player.x-200;   
}   

if(player.isTouching(house)) {
 gameState = "end"       
}


console.log(player.x);
//console.log(player.y);
camera.position.x = player.x;
//camera.position.y = player.y;

//console.log(camera.position.x);
//console.log(camera.position.y);

console.log(player.y);
player.collide(invisibleGround);
player.collide(wall);
//player.collide(obstaclesGroup);
spawnObstacles();
drawSprites();
}
else if(gameState === "end") {
background(gameOverImg)

textSize(100);
fill("red");
text("Game Over!",displayWidth/2,displayHeight/2);   
}

}

function spawnObstacles() {
    if(frameCount % 400 === 0) {
      var obstacle = createSprite(player.x+ 1000,900);
      obstacle.velocityX = -(2);
      obstacle.setCollider("circle",0,0,200);
      //obstacle.debug = true;
      //obstacle.scale = 1.5
     
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
      obstacle.scale = 0.2;
      obstacle.lifetime = 500;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    }
} 