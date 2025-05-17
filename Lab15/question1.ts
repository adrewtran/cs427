// Define the Person interface
interface Person {
  name: string;
  age: number;
  isStudent: boolean;
}

function describePerson(person: Person): string {
  const { name, age, isStudent } = person;
  const studentStatus = isStudent ? 'is a student' : 'is not a student';
  
  return `${name} is ${age} years old and ${studentStatus}.`;
}

// Example usage
const john: Person = {
  name: "John Doe",
  age: 25,
  isStudent: true
};

const mary: Person = {
  name: "Mary Smith",
  age: 30,
  isStudent: false
};

console.log(describePerson(john));
console.log(describePerson(mary));

export { Person, describePerson };
