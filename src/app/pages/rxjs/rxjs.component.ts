import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription

  constructor() {

    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('Subs:', valor),
    //   error => console.warn('Error', error),
    //   () => console.info('Obs terminado')
    // );
    this.intervalSubs = this.retornaIntervalo().subscribe( console.log )

  }

  retornaIntervalo() {

    return interval(500)
                        .pipe(
                          // Genera 10 emisiones
                          take(10),
                          // al valor anterior, súmale 1
                          map( valor => valor + 1 ),
                          // Si 'valor' es truthy entonces lo imprime en consola
                          filter( valor => ( valor % 2 === 0 ) ? true : false ),
                        );

  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaObservable(): Observable<number> {

    let i = -1;

    return new Observable<number>( observer => {

      const interval = setInterval( () => {

        i++;
        observer.next(i);

        if( i === 5 ) {
          clearInterval(interval);
          observer.complete()
        }

        if ( i === 2 ) {
          observer.error('i llegó al valor 2')
        }

      }, 1000);

    });

  }

}
