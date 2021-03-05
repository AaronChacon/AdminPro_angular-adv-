import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor( ) {

    /* this.returnObs().pipe(
      retry(1)
    ).subscribe(
      valor => console.log('Time:', valor),
      error => console.warn('Error: ', error),
      () => console.warn('End')
    ); */

    this.intervalSubs = this.returnInterval().subscribe(value => console.log(value));
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  

  returnInterval(): Observable<number> {

    return interval(100)
            .pipe(
              map(value => value + 1),
              filter(value => (value % 2 === 0) ? true: false),
            );
  }

  returnObs(): Observable<number> {

    let i = -1;
    
    const obs$ = new Observable<number>( observer => {

      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval)
          observer.complete();
        }

        if (i === 2) {
          observer.error('50%')
        }

      }, 1000 )

    });

    return obs$;

  }

}
