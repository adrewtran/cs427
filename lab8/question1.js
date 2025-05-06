class Meditation {
    constructor(duration) {
        this.duration = duration;
    }

    start() {
        let countdown = this.duration;
        const interval = setInterval(() => {
            if (countdown > 0) {
                console.log(countdown);
                countdown--;
            } else {
                clearInterval(interval);
                this.end();
            }
        }, 1000);
    }

    end() {
        console.log("Jay Guru Dev");
        console.log(`End meditation. Duration: ${this.duration} seconds`);
    }
}

const morning_meditation = new Meditation(5);
morning_meditation.start();
console.log(`Start meditation`);