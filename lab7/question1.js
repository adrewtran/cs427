
function Student(studentId) {
    this.studentId = studentId;
    this.answers = [];
}

Student.prototype.addAnswer = function(question) {
    this.answers.push({ questionId: question.qid, answer: question.answer });
};

function Question(qid, answer) {
    this.qid = qid;
    this.answer = answer;
}
Question.prototype.checkAnswer = function(answer) {
    return this.answer === answer;
};


function Quiz(questionsArray, studentsArray) {
    this.questions = new Map(questionsArray.map(q => [q.qid, q.answer]));
    this.students = studentsArray;
}

Quiz.prototype.scoreStudentBySid = function(sid) {
    const student = this.students.find(s => s.studentId === sid);
    if (!student) {
        console.log(`Student with ID ${sid} not found.`);
        return 0;
    }
    let score = 0;
    for (const answer of student.answers) {
        if (this.questions.has(answer.questionId) && this.questions.get(answer.questionId) === answer.answer) {
            score++;
        }
    }
    return score;
};

Quiz.prototype.getAverageScore = function() {
    if (this.students.length === 0) {
        return 0;
    }
    let totalScore = 0;
    for (const student of this.students) {
        totalScore += this.scoreStudentBySid(student.studentId);
    }
    return totalScore / this.students.length;
};

const student1 = new Student(10);
student1.addAnswer(new Question(2, 'a'));
student1.addAnswer(new Question(3, 'b'));
student1.addAnswer(new Question(1, 'b'));
const student2 = new Student(11);
student2.addAnswer(new Question(3, 'b'));
student2.addAnswer(new Question(2, 'a'));
student2.addAnswer(new Question(1, 'd'));
const students = [student1, student2];
const questions =[new Question(1, 'b'), new Question(2, 'a'), new
Question(3, 'b')];
const quiz = new Quiz(questions, students);
let scoreforStudent10 = quiz.scoreStudentBySid(10);
console.log(scoreforStudent10); //Expected Result: 3
let scoreforStudent11 = quiz.scoreStudentBySid(11);
console.log(scoreforStudent11); //Expected Result: 2
let average = quiz.getAverageScore();
console.log(average); //Expected Reuslt: 2.5
