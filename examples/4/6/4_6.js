const { toNamespacedPath } = require('path');
/**
 *  RxJS in Action
 *  Listing 4.6
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
const Rx = require('rxjs');
Rx.Observable.interval(1000)
   .timeInterval()
   .do(int => console.log(`generated ${int.interval} seconds`))
   .delay(2000)

   //.map(int => Math.floor(int.interval / 1000))
   .subscribe(int => console.log(`received ${int.interval} seconds`));
