   +-----------------+
   | Object.prototype|
   +-----------------+
          ^
          | [[Prototype]]
   +-----------------+
   | Animal.prototype| <------- Animal.prototype points here
   +-----------------+          (contains 'run' method)
          ^
          | [[Prototype]]
   +-----------------+
   | Rabbit.prototype| <------- Rabbit.prototype points here
   +-----------------+          (contains 'hide' method)

   Instances:

   myAnimal ---> Animal.prototype ---> Object.prototype ---> null
   myRabbit ---> Rabbit.prototype ---> Animal.prototype ---> Object.prototype ---> null

   Constructors:

   Animal (Function Object) ----> Function.prototype
     - prototype property points to Animal.prototype
     - contains static 'compareBySpeed' method

   Rabbit (Function Object) ----> Function.prototype
     - prototype property points to Rabbit.prototype