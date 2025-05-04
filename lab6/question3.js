
function Animal(name, speed) {
    this.name = name;
    this.speed = speed;
}
  
Animal.prototype.run = function(increment) {
    this.speed += increment;
    console.log(`${this.name} runs with speed ${this.speed}.`);
};
  
Animal.compareBySpeed = function(a1, a2) {
    return a1.speed - a2.speed;
};
  
function Rabbit(name, speed) {
    Animal.call(this, name, speed);
}
  
Rabbit.prototype = Object.create(Animal.prototype);
  
Rabbit.prototype.constructor = Rabbit;
  
Rabbit.prototype.hide = function() {
    console.log(`${this.name} hides`);
};

// --- Example Usage ---
let rabbit1 = new Rabbit('Floppy', 5);
let rabbit2 = new Rabbit('Peter', 8);
let animal1 = new Animal('Leo', 15);

rabbit1.run(3);
rabbit1.hide();
animal1.run(5);

let animals = [rabbit1, animal1, rabbit2];
console.log("Animals before sorting:", animals.map(a => `${a.name}: ${a.speed}`));

animals.sort(Animal.compareBySpeed);

console.log("Animals after sorting by speed:", animals.map(a => `${a.name}: ${a.speed}`));