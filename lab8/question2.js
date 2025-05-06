const isPrime = (n) => {
    return new Promise((resolve, reject) => {
        for (let i = 2, s = Math.sqrt(n); i <= s; i++) {
            if (n % i === 0) {
                reject({ prime: false });
                return;
            }
        }
        if (n > 1) {
            resolve({ prime: true });
        } else {
            reject({ prime: false });
        }
    });
};

// console.log('start');
// isPrime(7)
//  .then(console.log)
//  .catch(console.error);
// console.log('end');
//Make changes to provided test and use async/await instead of .then() and .catch()
console.log('start');
(async () => {
    try {
        const result = await isPrime(7);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
})();
console.log('end');