const {Item} = require("../class/item.js");
const {Room} = require("../class/room.js");

class Character {

  constructor(name, description, currentRoom) {
    this.name = name;
    this.description =  description;
    this.currentRoom = currentRoom;
    this.items = [];
    this.health = 100;
    this.strength = 10;

  }

  applyDamage(amount) {
    this.health -= amount
    if(this.health === 0){
      this.die()
    }
  }

  die() {
    
    this.items.map( (el) => {
    let index =  this.items.indexOf(el) 
    this.currentRoom.items.push(el);
    this.items.splice(index,1);      
   })
    
    this.currentRoom = null;
}
}
    
module.exports = {
  Character,
};
