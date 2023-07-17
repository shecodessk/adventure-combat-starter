const {Character} = require('./character');
const { Room } = require('./room');
const { Item } = require('./item');
const { Player } = require('./player');
const { Food } = require('./food');


class Enemy extends Character {
  constructor(name, description, currentRoom, cooldown = 3000) {
    super(name, description, currentRoom)
    this.cooldown = cooldown;
    this.items= [];
    this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
        //Object.keys(this.currentRoom.exits)
        let exitArray = Object.keys(this.currentRoom.exits);

        function randomInt (max){
           return Math.floor(Math.random() * max);
        }
        let randomExit = exitArray[randomInt(exitArray.length)];

        let nextRoom = this.currentRoom.getRoomInDirection(randomExit);

        this.currentRoom = nextRoom;
        
        this.cooldown += 1000;
        this.act();
        }

  

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = () => {
      this.cooldown = 0;
      this.act();
    };

    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    this.attackTarget.health -= 10;
    
  }

  applyDamage(amount) {
       this.health -= amount;
          if (this.health <= 0) {
            this.die();
          } else {
            this.attackTarget = this.player;
            this.act();
          }
  }



  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

    // Fill this in
  }


  scratchNose() {
    this.cooldown += 1000;
    this.alert(`${this.name} scratches its nose`);
  }
}


module.exports = {
  Enemy,
};
