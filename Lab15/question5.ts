class Student {
    private studentId: number;
    private answers: Array<{ questionId: number; answer: string }>;

    constructor(studentId: number, answers: Array<{ questionId: number; answer: string }> = []) {
        this.studentId = studentId;
        this.answers = answers;
    }

    getStudentId(): number {
        return this.studentId;
    }

    getAnswers(): Array<{ questionId: number; answer: string }> {
        return this.answers;
    }

    addAnswer(question: { qid: number; answer: string }) {
        this.answers.push({ questionId: question.qid, answer: question.answer });
    }
}

class Question {
    private qid: number;
    private answer: string;

    constructor(qid: number, answer: string) {
        this.qid = qid;
        this.answer = answer;
    }

    getAnswer(): string {
        return this.answer;
    }
    
    getQid(): number {
        return this.qid;
    }

    checkAnswer(answer: string): boolean {
        return this.answer === answer;
    }
}

class Quiz {
    private questions: Map<number, string>;
    private students: Array<Student>;

    constructor(questionsArray: Array<{ qid: number; answer: string }>, studentsArray: Array<Student>) {
        this.questions = new Map(questionsArray.map(q => [q.qid, q.answer]));
        this.students = studentsArray;
    }

    scoreStudentBySid(sid: number): number {
        const student = this.students.find(s => s.getStudentId() === sid);
        if (!student) {
            console.log(`Student with ID ${sid} not found.`);
            return 0;
        }
        let score = 0;
        for (const answer of student.getAnswers()) {
            if (this.questions.has(answer.questionId) && this.questions.get(answer.questionId) === answer.answer) {
                score++;
            }
        }
        return score;
    }
    getAverageScore(): number {
        if (this.students.length === 0) {
            return 0;
        }
        let totalScore = 0;
        for (const student of this.students) {
            totalScore += this.scoreStudentBySid(student.getStudentId());
        }
        return totalScore / this.students.length;
    }
}

// Example usage
const questionsArray = [
    { qid: 1, answer: "A" },
    { qid: 2, answer: "B" },
    { qid: 3, answer: "C" }
];

const studentsArray = [
    new Student(1, [{ questionId: 1, answer: "A" }, { questionId: 2, answer: "B" }]),
    new Student(2, [{ questionId: 1, answer: "A" }, { questionId: 3, answer: "C" }]),
    new Student(3, [{ questionId: 2, answer: "B" }, { questionId: 3, answer: "C" }])
];
const quiz = new Quiz(questionsArray, studentsArray);
console.log(quiz.scoreStudentBySid(1));
console.log(quiz.getAverageScore());
