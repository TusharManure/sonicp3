var background,backgroundImg;
var sonic,sonicImg;
var stone,stoneImg;
var bullet,bulletImg;
var obstacle3,obstacle3Img;
var background1;
var ground;
var sonicJump,sonicJumpImg;
var score=0;
var ring,ringImg;
var ringGroup;
var stoneGroup;
var bulletsGroup;
var gameState="Serve"
var button1;
var invisibleWall;
var runningSound;
var jumpSound;
var gameoverSound;


// Images Load
function preload(){
 backgroundImg= loadImage("background.png");
 stoneImg= loadImage("stone.webp");
 bulletImg= loadImage("bullet.png");
 ringImg= loadImage("Ring.webp");
 sonicJumpImg= loadAnimation("jump1.png","jump2.png","jump3.png","jump4.png");
// runningSound=loadSound("running.mp3");
jumpSound=loadSound("jump.mp3");
gameoverSound=loadSound("gameover.mp3");
 sonicImg= loadAnimation("jog0.png","jog1.png","jog2.png","jog3.png","jog4.png","jog5.png","jog6.png","jog7.png","jog8.png","jog9.png","jog10.png",)
}


function setup(){
  createCanvas(displayWidth,displayHeight);
//  runningSound.loop();

button1=createImg("BT.jpg");
button1.size(50,50);
button1.position(displayWidth-500,500);

  ringGroup= new Group();
  stoneGroup= new Group();
  bulletsGroup= new Group();

  background1=createSprite(200,450);
  background1.addImage(backgroundImg);
  background1.velocityX=-5

  sonic=createSprite(200,670,20,20);
  sonic.addAnimation("Running",sonicImg);
  sonic.addAnimation("Jumping",sonicJumpImg);
  sonic.scale=0.5
 
  ground=createSprite(150,800,200,10);
  ground.visible=false;

  invisibleWall=createSprite(200,350,200,20);
  invisibleWall.visible=false;
  
  
}

function draw(){
    background("black");
    sonic.collide(ground);

  
    

   

    
drawSprites();

fill("red");
textSize(30);
text("score: "+score,200,200);


if (gameState==="Serve"){
background1.velocityX=0;
button1.mousePressed(move);
sonic.visible=false
text("Click Here To Play",displayWidth-600,600)

}
else if(gameState==="Play"){
    button1.hide();
    sonic.visible=true
    if (background1.x<0){
        background1.x=200;
    }

    if (keyWentDown(UP_ARROW)){
        sonic.velocityY=-19;
        sonic.changeAnimation("Jumping");
        jumpSound.play();
    }

    if (keyWentUp(UP_ARROW)){
        sonic.velocityY=7;
        sonic.changeAnimation("Running");
    }


    sonic.bounceOff(invisibleWall);
   
    if (stoneGroup.isTouching(sonic)){
        score=score-1
        stoneGroup.destroyEach();
    }

    spawnBullets();
    spawnStone();
    spawnRings();

    if(ringGroup.isTouching(sonic)){
        score=score+1
        ringGroup.destroyEach();
        }
         if (bulletsGroup.isTouching(sonic)){
             gameState="End"
             gameoverSound.play();
         }

}
else if(gameState==="End"){
background1.destroy();
sonic.destroy();
stoneGroup.destroyEach();
bulletsGroup.destroyEach();
ringGroup.destroyEach();
textSize(50);
text("Game Over",300,300);
score=0;

}


}

function spawnBullets(){
    if (frameCount%100===0){
 bullet=createSprite(displayWidth-20,400,20,20);
 bullet.debug=true;
 bullet.setCollider("circle",0,0,200)
 bullet.y=Math.round(random(400,700));
 bullet.addImage(bulletImg);
 bullet.scale=0.1
 bullet.velocityX=-5;
 bulletsGroup.add(bullet);
    }
}

function spawnStone(){
    if (frameCount%300===0){
        stone=createSprite(displayWidth-200,700,20,20);
        stone.x=Math.round(random(displayWidth-200,displayWidth-50));
        stone.addImage(stoneImg);
       // stone.scale=0.1
        stone.velocityX=-5;
        stoneGroup.add(stone);
}
}

function spawnRings(){
    if (frameCount%300===0){
        ring=createSprite(displayWidth-20,400,20,20);
        ring.y=Math.round(random(400,600));
        ring.addImage(ringImg);
        ring.velocityX=-4;
        ring.scale=0.2
        ringGroup.add(ring);
    }
}

function move(){
    background1.velocityX=-5
    gameState="Play"
}