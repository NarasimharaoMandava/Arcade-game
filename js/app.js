// Enemies our player must avoid
var Enemy = function(x, y, s) {
  this.x = x;
  this.y = y;
  this.s = s;
  this.sprite = 'images/enemy-bug.png';
};

var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.s * dt;
  if (this.x > 500) {
    this.x = -100;
  }
  if ((player.x >= this.x - 70) && (player.x <= this.x + 80)) {
    if ((player.y >= this.y - 40) && (player.y <= this.y + 40)) {
      player.x = 200;
      player.y = 400;
    }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.handleInput = function(moves) {
  switch (moves) {
    case 'left':
      this.x -= 101;
      if (this.x <= 0)
        this.x = 0;
      break;
    case 'right':
      this.x += 101;
      if (this.x >= 400)
        this.x = 400;
      break;
    case 'up':
      this.y -= 83;
      if (this.y < 0)
        this.y = -10;
      break;
    case 'down':
      this.y += 83;
      if (this.y > 404)
        this.y = 404;
      break;
    default:

  }
  if (this.y <= 10) {
    setTimeout(() => {
      alert("Game Over....!");
      this.x = 200;
      this.y = 400;
    }, 500);
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(200, 400);
//Setting enimies position
var p = 0,
  q = 65;
for (var i = 0; i < 3; i++) {
  allEnemies[i] = new Enemy(p, q, Math.floor(Math.random() * 600));
  q += 82;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
