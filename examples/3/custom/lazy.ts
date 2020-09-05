function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

(async () => { 
    console.log('start');

    const Rx = require('rxjs');
    const source$ = Rx.Observable.create(o => {
        let i = 1;
        setInterval(() => {
            if (o.destination._parent._subscriptions === null) {
                console.log('No more subscriber'); //wrong way
                o.complete();
            }
            else {
                console.log(`Generating sequence ${i++}`);
                o.next(i);
            }
        }, 500);
    }); 

    await delay(2000);

    const subscription = source$.subscribe(val => {
        console.log("Received: ", val);
    });

    await delay(4000);

    subscription.unsubscribe();

    await delay(2000);

    const subscription2 = source$.subscribe(val => {
        console.log("Received: ", val);
    });

    await delay(4000);

    subscription2.unsubscribe();

})();
