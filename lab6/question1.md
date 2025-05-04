       +-----------------+
       | Object.prototype| 
       +-----------------+
              ^
              | [[Prototype]]
       +-----------------+
       |    student      |  
       | (Object Literal)|
       |-----------------|
       | firstName: ''   |
       | lastName: ''    |
       | grades: []      |
       | inputNewGrade:ƒ |
       | computeAvg...:ƒ |
       +-----------------+
        ^     ^     ^
        |     |     | [[Prototype]]
        |     |     |
+----------+ +----------+ +----------+
| student1 | | student2 | | student3 |  
|----------| |----------| |----------|
| firstName| | firstName| | firstName| 
| lastName | | lastName | | lastName |
| grades   | | grades   | | grades   |
+----------+ +----------+ +----------+