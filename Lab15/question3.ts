function sum(...args: number[]): number {
  return args.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(1, 2, 3));
console.log(sum(10, 20, 30, 40));