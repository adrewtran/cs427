let student = {
    firstName: '',
    lastName: '',
    grades: [],
    inputNewGrade: function(newGrade) {
      this.grades.push(newGrade);
    },
    computeAverageGrade: function() {
      if (this.grades.length === 0) {
        return 0;
      }
      let sum = this.grades.reduce((total, grade) => total + grade, 0);
      return sum / this.grades.length;
    }
  };

let student1 = Object.create(student);
student1.firstName = 'John';
student1.lastName = 'Doe';
student1.grades = []; // Initialize grades array for the instance
student1.inputNewGrade(85);
student1.inputNewGrade(90);

let student2 = Object.create(student);
student2.firstName = 'Jane';
student2.lastName = 'Smith';
student2.grades = []; // Initialize grades array for the instance
student2.inputNewGrade(92);
student2.inputNewGrade(88);

let student3 = Object.create(student);
student3.firstName = 'Peter';
student3.lastName = 'Jones';
student3.grades = []; // Initialize grades array for the instance
student3.inputNewGrade(78);
student3.inputNewGrade(82);


let students = [student1, student2, student3];

function computeAverageOfAverages(studentArray) {
    if (studentArray.length === 0) {
      return 0;
    }
    let sumOfAverages = studentArray.reduce((sum, s) => sum + s.computeAverageGrade(), 0);
    return sumOfAverages / studentArray.length;
}
 let averageOfAverages = computeAverageOfAverages(students);
 console.log("Average of Student Averages:", averageOfAverages);