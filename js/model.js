// check to see if game is loaded
var loaded = false;

// enables/disables player moves
var input = true;

//Base level for enemy
var enemyLV = 0;

//gameBoard
var area = [];

//Hero
var hero = {
  name: "Shawhien",
  level: 1,
  healthMax: 100,
  armor: 0,
  armorMod: 5,
  strength: 15,
  strengthMod: 0,
  staminaMax: 20,
  exp: 0,
  nextLv: 25,
  enemyDefeated: 0,
  health: 100,
  stamina: 20,
  // move handles status changes on hero + enemy in area [0]
  move: function move(moveName, strength, sCost, sCharge, heal, armorBoost, soundId) {
    if (input === true) {
      if (hero.health >= 1 && (sCost <= hero.stamina)) {
        
        //modify stats of player and enemy
        area[0].health -= strength;
        hero.armor += armorBoost;
        hero.stamina -= sCost;
        hero.stamina += sCharge;
        hero.health += heal;

        //check to see if health and stamina are above max values before using Cure/Charge
        if (hero.health > hero.healthMax) {
        hero.health = hero.healthMax};
        if (hero.stamina > hero.staminaMax) {
          hero.stamina = hero.staminaMax};

        //activate sounds, stats, trigger fades, and start enemy atack
        playMoveSound(soundId);
        displayHealth();
        displaySkill(moveName);
        displayStamina();
        spellFadein();
        area[0].attack(hero);
      }
    }
  }
};

//Enemy
var Enemy = function Enemy(name, level, health, strength, exp){
  this.name = name;
  this.level = level;
  this.health = health;
  this.strength = strength;
  this.exp = exp;
};

//Items
var item = {
  healthpotion: function healthpotion() {
    hero.healthMax += 15;
    hero.health = hero.healthMax;
    displayGetItem(item.healthpotion.name, "Max Health: + 15", "Health Potion");
  },
  staminapotion: function staminapotion() {
    hero.staminaMax += 5;
    hero.stamina = hero.staminaMax;
    displayGetItem(item.staminapotion.name, "Max Stamina: + 5", "Stamina Potion");
  },

};
