function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

const myadd = (a: number, b: number) => a + b;
let intermediate = 0;
(async () => { 
    console.log('start');

    const Rx = require('rxjs');
    const source$ = Rx.Observable.create(o => {
        let i = 1;
        console.log("Started setinterval");
        setInterval(() => {
            if (i == 20 /*o.destination._parent._subscriptions === null*/) {  //wrong way
                o.complete();
            }
            else {
                console.log(`Generating sequence ${i++}`);
                o.next(i);
            }
        }, 500);
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

    subscription.unsubscribe(); 
})();
