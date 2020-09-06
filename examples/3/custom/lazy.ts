function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

let finished = false;
type Callback = (val: number) => void;

class SequenceGenerator {

    private current = 1;

    constructor (
        private callback: Callback, 
        private numberOfGeneration: number) {

        console.log("Created sequence generator")
    }

    private timeout: NodeJS.Timeout;
    public Start(interval: number): NodeJS.Timeout {
        this.timeout = setInterval(() => {
            if (--this.numberOfGeneration === 0)
            {
                this.Stop();
                return;
            }
            this.callback(this.current++);
            console.log('Callback called with value ' + this.current);
        }, interval);
        return this.timeout;
    } 
    public Stop() {
        clearTimeout(this.timeout);
    }
}

const myadd = (a: number, b: number) => a + b;
let intermediate = 0;

(async () => { 
    console.log('start');
    const Rx = require('rxjs');
    const source$ = Rx.Observable.create(o => {
        console.log('Creating sequence generator')
        const generator = new SequenceGenerator(
            val => o.next(val),
            15);
        const timeout = generator.Start(500);

        // Return will return the callback called when the subscriber
        // unsubscribe from the observable, you can clear the timeout
        return () => clearInterval(timeout);
    })
    .filter(val => val % 2 === 0)
    //.reduce(myadd, 0)
    //.scan(val => intermediate = intermediate + val)
    ;

    await delay(2000);

    //setInterval(() => console.log("intermediate is ", intermediate), 500);
    const subscription = source$.subscribe(val => {
        console.log("Received: ", val);
    });

    // const subscription2 = source$.subscribe(val => {
    //     console.log("Received 2: ", val);
    // });

    await delay(4000);

    console.log('Proceed to unsubscribe');
    subscription.unsubscribe(); 
    finished = true; 
})();
