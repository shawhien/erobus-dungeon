//display gameboard from title screen
function displayGame() {
  $('#area').addClass('background').removeClass('noDisplay');
  $('#splashPg').addClass('noDisplay').removeClass('background');
  $('#music')[0].play();
};

// displays splash
function displaySplash() {
  $('#splashPg').addClass('background').removeClass('noDisplay');
};

//Abilities
// (moveName, getStrength(damage), sCost, sCharge, heal, armorBoost, soundId)

$('#attack').click(function() {
  hero.move("attack", getStrength(0), 1, 0, 0, 0, "#iced");
});
$('#defend').click(function() {
  hero.move("defend", 0, 0, 1, 0, hero.armorMod, "#miscd");
});
$('#fire').click(function() {
  hero.move("fire", getStrength(5), 5, 0, 0, 0, "#fired");
});
$('#heal').click(function() {
  hero.move("heal", 0, 10, 0, 50, 0, "#miscd");
});
$('#wait').click(function() {
  hero.move("wait", 0, 0, 10, 0, 0, "#waitd");
});
$('#charge').click(function() {
  hero.move("charge", 0, 0, hero.staminaMax, 0, 0, "#heald");
});

//Status
var health = document.getElementById('health');
var stamina = document.getElementById('stamina');

//update Health indicator on top right
function displayHealth() {
  $('#health').text("Health: " + hero.health);
};
//update stamina indicator on top right
function displayStamina() {
  $('#stamina').text("Stamina: " + hero.stamina);
};

//Enemy Object
var enemyAvatar = document.getElementById('enemy');
var enemydamage = document.getElementById('damage');
var enemyAttack = document.getElementById('damageTaken');

// display enemy
function displayEnemy() {
  $('#enemy').fadeIn('fast');
  enemyAvatar.style.backgroundImage = getAvatarBgImg();
  displayEHealth();
};

//url assignment based on current enemy
function getAvatarBgImg() {
  if (area[0].name === "dragon") {
    return "url('art/dragon04.png')"};
  if (area[0].name === "wyvern") {
    return "url('art/wyvern01.png')"};
  if (area[0].name === "chest") {
    return "url('art/chest.png')"};
};

//display skill used
function displaySkill(skill) {enemydamage.style.backgroundImage = 'url("art/' + skill + '.png")';};
//display enemy health 
function displayEHealth() {$('#eHealth').text("Health: " + area[0].health);};

//display menu when level up
function displayLevelUp() {
  var lvUp = ["LEVEL UP!", "level: " + hero.level, "health + 10", "stamina + 2", "armor + 1", "strength + 1", "next lv: " + hero.nextLv]
  $('#lvu')[0].play();
  var $newDiv = $('<div>').attr("id","playerLvUp").appendTo('div#area.background');
  var $newUL = $('<ul>').appendTo($newDiv);
// display all stats of hero 
  for (var i = 0; i < lvUp.length; i++) {
    var $newLI = $('<li>').appendTo($newUL).text(lvUp[i]);
  }
  // make the created menu clickable to remove it
  $('#playerLvUp').click(function(){$('#playerLvUp').remove();});
  displayHealth();
  displayStamina();
};

//display menu if item collected
function displayGetItem(item) {
  $('#lvu')[0].play();
  var $newDiv = $('<div>').attr('id','event').appendTo('div#area.background');
  var $newUL = $('<ul>').appendTo($newDiv);
  var $newLI = $('<li>').text('NEW ITEM!').appendTo($newUL);


  // make the created menu clickable to remove it
  $('#event').click(function() {$('#event').remove();});

  // display item
  $('#event').css("background-image", 'url("art/' + item + '.png")');
};

//fade out effect when enemy dies
function enemyDie() {
  $("#enemy").fadeOut(2000, function() {
    levelUp();
    displayEnemy();
    input = true;
  }
)};
// fade effect for when hero gets damaged
function attackedFade(damage) {
  $("#hurt")[0].play();
  $('#area').addClass('animated bounce');
  $('#dmg').text("Damage");
  $('#damageTaken').fadeIn('fast', function() {
    $('#damageTaken').fadeOut('fast', function() {
      $('#dmg').text(" ");
      $('#area').removeClass('animated bounce');
      input = true;
    })
  })
};
// Make spell effect disappear by fading out
function spellFadeOut() {
  $('#damage').fadeOut('slow', function() {
  });
};

//Make Spell effect appear by fading in
function spellFadein() {
    $('#damage').fadeIn('fast', function(){
      spellFadeOut()
    })};

//fade the damage on enemy
function fadeStrength(damage) {
  $('#str').text(damage);
  setTimeout(function(){$('#str').text(" ");}, 600);
};

// Plays sound when players uses abilities
function playMoveSound(soundId) {
  $(soundId)[0].play();
};

//Click to start! If game is "loaded"
$('#start').click(function() {
  if (loaded === true){
    displayGame();
    gameInit();
  }
});

setTimeout(function(){
    displaySplash();
  loaded = true;
}, 1000);