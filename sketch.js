var knife,knifeImage;
var PLAY,END;
var score=0;
var select_fruit;
var fruit,f1,f2,f3,f4,b;
var alien1,alien2;
var knifeSound,gameover,gameoverImg,overSound;
var gamestate=PLAY,topEdge;
var position
function preload()
{
  knifeImage=loadImage("sword.png");
  f1=loadImage("fruit1.png");
  f2=loadImage("fruit2.png");
  f3=loadImage("fruit3.png");
  f4=loadImage("fruit4.png");
  alien1=loadImage("alien1.png");
  alien2=loadImage("alien2.png");
  knifeSound=loadSound("knifeSwooshSound.mp3");
  gameoverImg=loadImage("gameover.png");
  overSound=loadSound("gameover.mp3");
}
function setup()
{
  createCanvas(600,400);
  knife=createSprite(300,100,10,10);
  knife.addImage(knifeImage);
  knife.scale=0.6;
  
  //creating groups for fruit and bombs
  fruitGroup=new Group();
  bombGroup=new Group();
  
}

function draw()
{
  background("white");
  
  text("Score: "+ score, 500,50);
  fruits();
  bomb();
  console.log(frameCount);
  if(gamestate==PLAY)
    {
      knife.y=World.mouseY;
      knife.x=World.mouseX;
      
    }
  if(fruitGroup.isTouching(knife))
    {
      fruitGroup.destroyEach();
      score+=2;
      knifeSound.play();
    }
  if(bombGroup.isTouching(knife))
    {
      gamestate=END;
      overSound.play();
    }
  
  drawSprites();
}
function fruits()
{
  if(frameCount%5==0)
    {
      
      fruit=createSprite(Math.round(random(20,580)),400,10,10);
      fruit.scale=0.15;
      position=Math.round(random(1,2));
      if(position==1)
        {
          fruit.x=600;
          fruit.y=Math.round(random(10,390))
          fruit.velocityY=0;
          fruit.velocityX=-(7+(score/4));
        }
      else
        {
          if(position==2)
            {
              fruit.x=0;
              fruit.y=Math.round(random(0,400));
              fruit.velocityY=0;
              fruit.velocityX=(7+(score/4));
            }
        }
      var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(f1);
              break;
      case 2: fruit.addImage(f2);
              break;
      case 3: fruit.addImage(f3);
              break;
      case 4: fruit.addImage(f4);
              break;
    }
      
      
      fruit.lifetime=29;
      
      //adding fruit to the fruits group
      fruitGroup.add(fruit);
    }
}

function bomb()
{
  if(frameCount%150==0)
    {
      var bomb=createSprite(200,400,10,10);
      bomb.scale=1;
      b=Math.round(random(1,2));
      switch(b)
        {
          case 1: bomb.addImage(alien1);
          break;
          case 2: bomb.addImage(alien2);
          break;  
        }
      bomb.x=Math.round(random(50,350));
      bomb.velocityY=-(8+(score/10));
      bomb.lifetime=56;
      bombGroup.add(bomb);
    }
}
