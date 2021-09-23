var trex,trexCorrendo;
var chao,chaoImg;
var chaoInvisivel;
var imagemNuvem,grupoDeNuvens;
var pontuacao = 0;
var cacto1,cacto2,cacto3,cacto4,cacto5,cacto6;
var estadoJogo = "inicio";
var grupoDeObstaculos;
var trexMorto;
var gameOver;
var reiniciar;
var reiniciarImage;
var gameOverImage
var som;
var pulo;
var checkPoint;

function reset(){
  pontuacao = 0;
  
  grupoDeObstaculos.destroyEach();
  grupoDeNuvens.destroyEach();
  reiniciar.visible = false;
  gameOver.visible = false;
  estadoJogo = "inicio";
  trex.changeAnimation("correndo",trexCorrendo);
}

function cactos() {
  if(frameCount%60 ===0){
    var cacto = createSprite(600,175,10,40);
    cacto.velocityX = -(6+pontuacao/60);
    cacto.scale = 0.6;
    cacto.lifetime = 130;
    
    var numeroObstaculo = Math.round(random(1,6))
    switch(numeroObstaculo){
      case 1: cacto.addImage(cacto1);
        break
      case 2: cacto.addImage(cacto2);
        break
      case 3: cacto.addImage(cacto3);
        break
      case 4: cacto.addImage(cacto4);
        break
      case 5: cacto.addImage(cacto5);
        break
      case 6: cacto.addImage(cacto6);
        break
        default:break;
    }

    grupoDeObstaculos.add(cacto);
  }
}
  
function nuvens() {
  if(frameCount%60 ===0){
    var nuvem = createSprite(600,50,50,10);
    nuvem.velocityX = -5
    nuvem.addImage(imagemNuvem);
    nuvem.y = Math.round(random(15,70))
    nuvem.lifetime = 115;
    nuvem.depth = trex.depth;
    
    trex.depth = nuvem.depth +1;
    
    grupoDeNuvens.add(nuvem);  
  }
}

function preload() {
  trexCorrendo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  
  chaoImg = loadImage("ground2.png");
  
  imagemNuvem = loadImage("cloud.png");
  
  cacto1 = loadImage("obstacle1.png");
  cacto2 = loadImage("obstacle2.png");
  cacto3 = loadImage("obstacle3.png");
  cacto4 = loadImage("obstacle4.png");
  cacto5 = loadImage("obstacle5.png");
  cacto6 = loadImage("obstacle6.png");
  
  trexMorto = loadAnimation("trex_collided.png");
  
  reiniciarImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
  
  pulo = loadSound("jump.mp3");
  som = loadSound("die.mp3");
  checkPoint = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600,200)
  
  trex = createSprite(50, 155, 20, 50);
  trex.addAnimation("correndo", trexCorrendo);
  trex.scale = 0.6;
  trex.setCollider("circle",0,0,40);
  trex.addAnimation("morreu", trexMorto);
  chao = createSprite (300,190,600,20);
  chao.addImage("chao",chaoImg);
  chao.x = chao.width/2;
  chaoInvisivel = createSprite(300,200,600,10);
  chaoInvisivel.visible = false;
  
  grupoDeObstaculos = new Group()
  grupoDeNuvens =  new Group()
  
  reiniciar = createSprite(300,120,40,40);
  reiniciar.addImage(reiniciarImage);
  reiniciar.visible = false;
  gameOver = createSprite(300,50,40,40);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  
  
  
}

function draw() {
  background("white");

  text("Pontuação: "+ pontuacao,20,50);

  trex.velocityY = trex.velocityY + 2;

  trex.collide(chaoInvisivel);
  
  if(estadoJogo ==="jogar"){
    pontuacao = pontuacao +Math.round(frameRate()/60);
    
    chao.velocityX = -(6+pontuacao/60);
    
    if (chao.x < 0){  
      chao.x = chao.width/2;         
    }
    
    if(pontuacao%100=== 0 && pontuacao > 0){
       checkPoint.play();
       }
    
    if (keyDown("space")&& trex.y > 100) {
      trex.velocityY = -5;
      pulo.play();
    }
    
    nuvens();
    cactos();

    if(grupoDeObstaculos.isTouching(trex)){
      estadoJogo = "fim"  
      som.play();
     }
    
  } else if(estadoJogo==="fim"){
    chao.velocityX = 0
    
    gameOver.visible = true;
    reiniciar.visible= true;

    grupoDeObstaculos.setVelocityXEach(0);
    grupoDeNuvens.setVelocityXEach(0);
    
    grupoDeObstaculos.setLifetimeEach(-1);
    grupoDeNuvens.setLifetimeEach(-1);
    
    trex.changeAnimation("morreu",trexMorto);
    if(mousePressedOver(reiniciar)){
    reset();
       }
  } else if(estadoJogo==="inicio"){
    if(keyDown("space")){
       estadoJogo="jogar";
       }        
            }

  drawSprites();
}