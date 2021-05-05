var Diamond;
var DiamondRadius;
var Guard;
var Gun1, Gun2, Gun3;
var Bullet;
var Zombie;
var gunStage = 1;
var score = 0;
var gameState = "stage1";
var attached = 0;
var zombieGroup;
var bulletGroup;
var zombieGunGroup;
var zombieBulletGroup;
var blockGroup;
var wall, wallImage;
var diamondImage;
var zombieAnimation;
var Gun1Img, Gun2Img, Gun3Img;
var guardStanding, guardRunning;
var zombieGun, zombieGunImg;
var zombBullet;
var Block;
var floor;
var scoreText;

function preload() {

    guardRunning = loadAnimation("images/guard1.png", "images/guard2.png", "images/guard3.png", "images/guard2.png")
    zombieAnimation = loadAnimation("images/zomb1.png", "images/zomb2.png", "images/zomb3.png", "images/zomb2.png")
    wallImage = loadImage("images/wall.png")
    diamondImage = loadImage("images/diamond.png");
    Gun1Img = loadImage("images/gun1.png");
    Gun2Img = loadImage("images/gun2.png");
    Gun3Img = loadImage("images/gun3.png");
    zombieGunImg = loadImage("images/zombieGun.png");

}

function setup() {

    createCanvas(1200, 800);

    gameState = "stage1";

    Diamond = createSprite(240, 400, 15, 15);
    Diamond.addImage("diamondImg", diamondImage);
    Diamond.scale = 0.5;

    Guard = createSprite(200, 400, 30, 50);
    Guard.addAnimation("guard", guardRunning);

    Gun1 = createSprite(Guard.x, Guard.y, 15, 7);
    Gun1.scale = 0.5;
    Gun1.addImage("Gun1", Gun1Img);

    Gun2 = createSprite(Guard.x, Guard.y, 18,8);
    Gun2.scale = 0.5;
    Gun2.addImage("Gun2", Gun2Img);

    Gun3 = createSprite(Guard.x, Guard.y, 22, 12);
    Gun3.scale = 0.6;
    Gun3.addImage("Gun3", Gun3Img);

    DiamondRadius = createSprite(Diamond.x, Diamond.y, 50, 50);
    DiamondRadius.visible = false;

    wall = createSprite(0, 400, 15, 850);
    wall.addImage("wall", wallImage);

    zombieGroup = new Group();
    bulletGroup = new Group();
    zombieGunGroup = new Group();
    zombieBulletGroup = new Group();
    blockGroup = new Group();

}

function draw() {
    
    background("white");

    Guard.scale = 1.3;

    textSize(20);
    fill("black");
    var text1 = text("Press w, a, s and d keys to move around, and space to shoot! You can pick up and move the diamond by pressing shift!", 50 ,50);
    var text2 = text("Don't let the Zombies touch you, the diamond or the wall of the room!", 50, 70)

    if(gameState === "stage1") {
        score = score+Math.round(getFrameRate()/50);
    }

    textSize(35);
    scoreText = text("Score: "+score, 50, 760);

    if(gameState === "stage1") {
        spawnZombie();
    }

    DiamondRadius.x = Diamond.x;
    DiamondRadius.y = Diamond.y;

    Gun1.x = Guard.x+14;
    Gun1.y = Guard.y-17;

    Gun2.x = Guard.x+15;
    Gun2.y = Guard.y-19;

    Gun3.x = Guard.x+13;
    Gun3.y = Guard.y-10;

    if(score < 120) {
        gunStage = 1;
    }

    if(score >= 120 && score < 200) {
        gunStage = 2;
    }

    if(score > 230) {
        gunStage = 3;
    }

    if(gunStage === 1 && gameState === "stage1") {
        Gun1.visible = true;
        Gun2.visible = false;
        Gun3.visible = false;
    }

    if(gunStage === 2 && gameState === "stage1") {
        Gun1.visible = false;
        Gun2.visible = true;
        Gun3.visible = false;
    }

    if(gunStage === 3 && gameState === "stage1") {
        Gun1.visible = false;
        Gun2.visible = false;
        Gun3.visible = true;
    }

    if(Guard.isTouching(DiamondRadius) && keyWentDown("shift")) {
        Diamond.held = true;
    } else{Diamond.held = false};

    if(keyWentDown("shift")) {
        attached = attached+1;
        Diamond.held = true;
    }

    if(keyWentUp("shift")) {
        attached = attached+1;
        Diamond.held = true;
    }

    if(attached/2 % 2 === 0 && Guard.isTouching(DiamondRadius)) {
        Diamond.x = Guard.x-10;
        Diamond.y = Guard.y;
    } 

    if(keyCode === 87 && gameState === "stage1" && Diamond.held === false) {
        Guard.velocityY = -4;
        Guard.velocityX = 0;
        Guard.addAnimation("running", guardRunning);
    } else if(gameState === "end") {
        Guard.velocityY = 0;
        Guard.velocityX = 0;
        Guard.addAnimation("standing", guardStanding);
    } else if(keyCode === 87 && gameState === "stage1" && Diamond.held === true) {
        Guard.velocityX = 0;
        Guard.velocityY = -2.5;
        Guard.addAnimation("running", guardRunning);
    }

    if(keyCode === 65 && gameState === "stage1" && Diamond.held === false) {
        Guard.velocityY = 0;
        Guard.velocityX = -4;
        Guard.addAnimation("running", guardRunning);
    } else if(gameState === "end") {
        Guard.velocityY = 0;
        Guard.velocityX = 0;
        Guard.addAnimation("standing", guardStanding);
    } else if(keyCode === 65 && gameState === "stage1" && Diamond.held === true) {
        Guard.velocityX = -2.5;
        Guard.velocityY = 0;
        Guard.addAnimation("running", guardRunning);
    }

    if(keyCode === 68 && gameState === "stage1" && Diamond.held === false) {
        Guard.velocityY = 0;
        Guard.velocityX = 4;
        Guard.addAnimation("running", guardRunning);
    } else if(gameState === "end") {
        Guard.velocityY = 0;
        Guard.velocityX = 0;
        Guard.addAnimation("standing", guardStanding);
    } else if(keyCode === 68 && gameState === "stage1" && Diamond.held === true) {
        Guard.velocityX = 2.5;
        Guard.velocityY = 0;
        Guard.addAnimation("running", guardRunning);
    }

    if(keyCode === 83 && gameState === "stage1" && Diamond.held === false) {
        Guard.velocityY = 4;
        Guard.velocityX = 0;
        Guard.addAnimation("running", guardRunning);
    } else if(gameState === "end") {
        Guard.velocityY = 0;
        Guard.velocityX = 0;
        Guard.addAnimation("standing", guardStanding);
    } else if(keyCode === 87 && gameState === "stage1" && Diamond.held === true) {
        Guard.velocityX = 0;
        Guard.velocityY = 2.5;
        Guard.addAnimation("running", guardRunning);
    }

    shoot();

    // if(keyWentDown("k")) {
    //     score = 300;
    // }

    if(bulletGroup.isTouching(zombieGroup)) {
        zombieGroup.destroyEach();
        bulletGroup.destroyEach();
        zombieGunGroup.destroyEach();
    }

    if(zombieGroup.isTouching(Diamond) || zombieGroup.isTouching(wall) || zombieGroup.isTouching(Guard) || zombieBulletGroup.isTouching(Guard)) {
        gameState = "end";
        zombieGroup.destroyEach();
        bulletGroup.destroyEach();
        zombieGunGroup.destroyEach();
        zombieBulletGroup.destroyEach();
        Gun1.visible = false;
        Gun2.visible = false;
        Gun3.visible = false;
        text1.visible = false;
        text2.visible = false;
    }

    if(gameState === "end") {
        bulletGroup.destroyEach;
        zombieGroup.destroyEach;
        Guard.visible = false;
        zombieBulletGroup.destroyEach();
        Diamond.visible = false;
        text1.visible = false;
        text2.visible = false;

        textSize(60);
        fill("red");
        text("TRY AGAIN (reload the page)", 200, 400);
    }

    // if(gameState === "stage1" && score >= 300) {
    //     gameState = "stage2";
    // }

    // if(gameState === "stage2") {

    //     // parkourBlocks();

    //     Guard.velocityY = Guard.velocityY+1.5;
    //     zombieGroup.destroyEach();
    //     bulletGroup.destroyEach();
    //     zombieGunGroup.destroyEach();
    //     zombieBulletGroup.destroyEach();
    //     Gun1.visible = false;
    //     Gun2.visible = false;
    //     Gun3.visible = false;
    //     Diamond.x = Guard.x;
    //     Diamond.attached = true;
    //     text1.visible = false;
    //     text2.visible = false;
    //     scoreText.visible = false;
    //     wall.visible = false;

        // Guard.collide(block1);
        // Guard.collide(block2);
        // Guard.collide(block3);
        // Guard.collide(block4);
        // Guard.collide(block5);
        // Guard.collide(block6);
        // Guard.collide(block7);
        // Guard.collide(block8);
        // Guard.collide(block9);
        // Guard.collide(block10);
        // Guard.collide(block11);
        // Guard.collide(block12);
        // Guard.collide(block13);
        // Guard.collide(block14);
        // Guard.collide(block15);
        // Guard.collide(block16);
        // Guard.collide(block17);
        // Guard.collide(block18);
        // Guard.collide(block19);
        // Guard.collide(block20);
    // }

//     if(gameState === "stage2" && keyWentDown("space")) {
//         //jump animation
//         Guard.velocityY = Guard.velocityY - 23;
//     }

//     if(gameState === "stage2") {

//         parkourBlocks();

//         Guard.velocityY = Guard.velocityY+0.75;
//         zombieGroup.destroyEach();
//         bulletGroup.destroyEach();
//         zombieGunGroup.destroyEach();
//         zombieBulletGroup.destroyEach();
//         Gun1.visible = false;
//         Gun2.visible = false;
//         Gun3.visible = false;
//         Diamond.x = Guard.x;
//         Diamond.attached = true;
//         text1.visible = false;
//         text2.visible = false;
//         scoreText.visible = false;
//         wall.visible = false;
//         floor = createSprite(600, 750, 1200, 20);

//         Guard.collide(block1);
//         Guard.collide(block2);
//         Guard.collide(block3);
//         Guard.collide(block4);
//         Guard.collide(block5);
//         Guard.collide(block6);
//         Guard.collide(block7);
//         Guard.collide(block8);
//         Guard.collide(block9);
//         Guard.collide(block10);
//         Guard.collide(block11);
//         Guard.collide(block12);
//         Guard.collide(block13);
//         Guard.collide(block14);
//         Guard.collide(block15);
//         Guard.collide(block16);
//         Guard.collide(block17);
//         Guard.collide(block18);
//         Guard.collide(block19);
//         Guard.collide(block20);
//         Guard.collide(floor);
//     }

//     if(gameState === "stage2" && keyCode === 83) {
//         //slide animation
//     }

    drawSprites();
}

function shoot () {

    if(keyWentDown("space") && gunStage === 1) {
        Bullet = createSprite(Gun1.x, Gun1.y, 6, 3);
        Bullet.shapeColor = color("black");
        Bullet.velocityX = 8;
        Bullet.velocityY = Math.round(random(-1, 2));
        bulletGroup.add(Bullet);
    }

    if(keyWentDown("space") && gunStage === 2) {
        Bullet = createSprite(Guard.x, Guard.y, 9, 6);
        Bullet.shapeColor = color("black");
        Bullet.velocityX = 10;
        Bullet.velocityY = Math.round(random(-2, 3));
        bulletGroup.add(Bullet);
    }

    if(keyWentDown("space") && gunStage === 3) {
        Bullet = createSprite(Guard.x, Guard.y, 13, 13);
        Bullet.shapeColor = color("black");
        Bullet.velocityX = 14;
        Bullet.velocityY = Math.round(random(-0.7, 0.7));
        bulletGroup.add(Bullet);
    }

}

function spawnZombie() {
  
    if(frameCount % 15 === 0) {
      var Zombie = createSprite(1220, 100, 10, 10);
      Zombie.addAnimation("zombie", zombieAnimation);
      Zombie.y = Math.round(random(100, 780));
      Zombie.scale = 1.1;
      Zombie.lifetime = 800;
      Zombie.velocityX = Math.round(random(-5, -8))
      Zombie.velocityY = Math.round(random(-1, 1))
      zombieGroup.add(Zombie);

      if(score >= 250 && gameState === "stage1") {
        zombieGun = createSprite(Zombie.x-10, Zombie.y -10, 15, 15);
        zombieGun.addImage("zombieGun", zombieGunImg);
        zombieGun.scale = 0.16;
        zombBullet = createSprite(zombieGun.x, zombieGun.y, 9, 3);
        zombieGun.x = Zombie.x-10;
        zombieGun.velocityX = Zombie.velocityX;
        zombieGun.y = Zombie.y-8;
        zombieGunGroup.add(zombieGun);
        if(frameCount % 7 === 0) {
            zombBullet = createSprite(zombieGun.x, zombieGun.y, 10, 3);
            zombBullet.velocityX = Math.round(random(-7, -8.1));
            zombBullet.velocityY = Math.round(random(-1, 1));
            zombieBulletGroup.add(zombBullet);
        }
    }
    }
    
  } 

// function parkourBlocks() {

//     block1 = createSprite(1220, 200, 15, 7);
//     block1.velocityX = -7;
//     block1.lifetime = 800;
//     blockGroup.add(block1);
//     delayTime(1);
//     block2 = createSprite(1220, 230, 15, 7);
//     block2.velocityX = -7;
//     block2.lifetime = 800
//     blockGroup.add(block2);
//     delayTime(2);
//     block3 = createSprite(1220, 180, 15, 7);
//     block3.velocityX = -7;
//     block3.lifetime = 800
//     blockGroup.add(block3);
//     delayTime(1);
//     block4 = createSprite(1220, 200, 15, 7);
//     block4.velocityX = -7;
//     block4.lifetime = 800
//     blockGroup.add(block4);
//     delayTime(1);
//     block5 = createSprite(1220, 210, 8, 7);
//     block5.velocityX = -7;
//     block5.lifetime = 800
//     blockGroup.add(block5);
//     delayTime(1);
//     block6 = createSprite(1220, 200, 8, 7);
//     block6.velocityX = -7;
//     block6.lifetime = 800
//     blockGroup.add(block6);
//     delayTime(1);
//     block7 = createSprite(1220, 200, 15, 7);
//     block7.velocityX = -7;
//     block7.lifetime = 800
//     blockGroup.add(block7);
//     delayTime(1);
//     block8 = createSprite(1220, 200, 15, 7);
//     block8.velocityX = -7;
//     block8.lifetime = 800
//     blockGroup.add(block8);
//     delayTime(1);
//     block9 = createSprite(1220, 200, 15, 7);
//     block9.velocityX = -7;
//     block9.lifetime = 800
//     blockGroup.add(block9);
//     delayTime(1);
//     block10 = createSprite(1220, 200, 15, 7);
//     block10.velocityX = -7;
//     block10.lifetime = 800
//     blockGroup.add(block10);
//     delayTime(1);
//     block11 = createSprite(1220, 200, 15, 7);
//     block11.velocityX = -7;
//     block11.lifetime = 800
//     blockGroup.add(block11);
//     delayTime(1);
//     block12 = createSprite(1220, 200, 15, 7);
//     block12.velocityX = -7;
//     block12.lifetime = 800
//     blockGroup.add(block12);
//     delayTime(1);
//     block13 = createSprite(1220, 200, 15, 7);
//     block13.velocityX = -7;
//     block13.lifetime = 800
//     blockGroup.add(block13);
//     delayTime(1);
//     block14 = createSprite(1220, 200, 15, 7);
//     block14.velocityX = -7;
//     block14.lifetime = 800
//     blockGroup.add(block14);
//     delayTime(1);
//     block15 = createSprite(1220, 200, 15, 7);
//     block15.velocityX = -7;
//     block15.lifetime = 800
//     blockGroup.add(block15);
//     delayTime(1);
//     block16 = createSprite(1220, 200, 15, 7);
//     block16.velocityX = -7;
//     block16.lifetime = 800
//     blockGroup.add(block16);
//     delayTime(1);
//     block17 = createSprite(1220, 200, 15, 7);
//     block17.velocityX = -7;
//     block17.lifetime = 800
//     blockGroup.add(block17);
//     delayTime(1);
//     block18 = createSprite(1220, 200, 15, 7);
//     block18.velocityX = -7;
//     block18.lifetime = 800
//     blockGroup.add(block18);
//     delayTime(1);
//     block19 = createSprite(1220, 200, 15, 7);
//     block19.velocityX = -7;
//     block19.lifetime = 800
//     blockGroup.add(block19);
//     delayTime(1);
//     block20 = createSprite(1220, 200, 15, 7);
//     block20.velocityX = -7;
//     block20.lifetime = 800
//     blockGroup.add(block20);
//     delayTime(1);
// }