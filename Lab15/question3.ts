// Create a TypeScript function that takes any number of arguments and returns their sum (use the
// rest operator).
function sum(...args: number[]): number {
  return args.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(1, 2, 3)); // Output: 6
console.log(sum(10, 20, 30, 40)); // Output: 100