function secondLargest(arr: number[]): number | null {
  if (arr.length < 2) {
    return null; // Not enough elements to find the second largest
  }

  let firstLargest = -Infinity;
  let secondLargest = -Infinity;

  for (const num of arr) {
    if (num > firstLargest) {
      secondLargest = firstLargest;
      firstLargest = num;
    } else if (num > secondLargest && num !== firstLargest) {
      secondLargest = num;
    }
  }

  return secondLargest === -Infinity ? null : secondLargest;
}

console.log(secondLargest([20 ,120 ,111 ,215 ,54 ,78]));