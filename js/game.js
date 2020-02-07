//initilize game
function gameInit() {

//spawn first enemy:
  nextEnemy();

// display Enemy();
  displayEnemy();

// sets effects for faded out();
  $('#damageTaken').fadeOut(0).addClass('damageTaken');
  $('.gameover').fadeOut(0);
};

//Check to see if you have died
function deadCheck() {
  if (hero.health <= 0) fadeDeath();
};

//calculate player damage
function getStrength(xDamage) {
  if (input === true) {
    var damage = (Math.floor(Math.random() * (hero.strength + xDamage)));
    fadeStrength(damage);
    return damage;
  }
};
//calculate enemy damage
function enemyCalculation(attacker) {
  var damage = (parseInt(Math.random() * ((attacker.strength - hero.armor) + 1)));
  return damage;
};
// random item
function getItem() {
  var r = Math.floor(Math.random() * 10);
  item[Object.keys(item)];
};
//functionality for ALL enemy attacks
Enemy.prototype.attack = function(hero) {
  displayEHealth();
  if (this.health > 0) {
    setTimeout(function(){
      hero.health -= enemyCalculation(area[0]);
      attackedFade();
      displayHealth();
      deadCheck();
    }, 1000);

    //Move to next enemy
  } else {
      hero.exp += this.exp;
      area.shift();
      enemyLV += 1;
      hero.enemyDefeated += 1;
      hero.stamina += 1;
      enemyDie();
      if (this.name === "chest") getItem();
  };
};

//spawn new Enemy: (name, level, health, strength, exp){
function nextEnemy() {
  var r = Math.random();
  if (r >= 0.60) {
      area.push(new Enemy("dragon", (enemyLV), (10 + (enemyLV )), (15 + enemyLV), (15 + enemyLV)));
  } else if (r <= 0.50) {
      area.push(new Enemy("wyvern", (enemyLV), (15 + (enemyLV)), (25 + enemyLV), (20 + enemyLV)));
  } else {
      area.push(new Enemy("chest", "0", 1, 0, 0));
  };
};

//Levels up character stats if exp > nextLV and spawns next enemy
function levelUp() {
  if (hero.exp >= hero.nextLv) {
    hero.level += 1;
    hero.healthMax += 10;
    hero.health = hero.healthMax;
    hero.armor += 1;
    hero.strength += 1;
    hero.staminaMax += 2;
    hero.stamina = hero.staminaMax;
    hero.exp -= hero.nextLv;
    hero.nextLv = Math.floor(hero.nextLv * 1.9);
    displayLevelUp();
  };
  nextEnemy();
  displayEnemy();
};