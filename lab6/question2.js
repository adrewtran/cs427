function Student(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.grades = [];
}
  
Student.prototype.inputNewGrade = function(newGrade) {
    this.grades.push(newGrade);
};

Student.prototype.computeAverageGrade = function() {
    if (this.grades.length === 0) {
      return 0;
    }
    let sum = this.grades.reduce((total, grade) => total + grade, 0);
    return sum / this.grades.length;
};
  
// Create student instances
let studentA = new Student('Alice', 'Wonder');
studentA.inputNewGrade(95);
studentA.inputNewGrade(91);

let studentB = new Student('Bob', 'Builder');
studentB.inputNewGrade(80);
studentB.inputNewGrade(86);

let studentC = new Student('Charlie', 'Chaplin');
studentC.inputNewGrade(75);
studentC.inputNewGrade(79);

let studentsArray = [studentA, studentB, studentC];

let avgOfAvgsConstructor = computeAverageOfAverages(studentsArray);
console.log("Average of Student Averages (Constructor):", avgOfAvgsConstructor);