                                   +--------------------+     +--------------------+
                                   | Function.prototype | <-- |  Object.prototype  | <-- null
                                   +--------------------+     +--------------------+
                                         ^                           ^
                                         | [[Prototype]]             | [[Prototype]]
+-------------------+                    |                    +-------------------+
| Student           |-------------------\|/------------------>| Student.prototype |
| (Constructor Func)|                    |                    |-------------------|
|-------------------| prototype property |                    | inputNewGrade: ƒ  |
|                   |                    |                    | computeAverage...:ƒ|
+-------------------+                    |                    +-------------------+
        ^                                | [[Prototype]]        ^     ^     ^
        \                                |                      |     |     | [[Prototype]]
         \ (Instances created            |                      |     |     | (Internal link)
          \   using 'new Student()')     |                      |     |     |
           \                             |              +----------+ +----------+ +----------+
            \----------------------------+------------->| studentA | | studentB | | studentC |
                                                        |----------| |----------| |----------|
                                                        | firstName| | firstName| | firstName| 
                                                        | lastName | | lastName | | lastName |
                                                        | grades   | | grades   | | grades   |
                                                        +----------+ +----------+ +----------+