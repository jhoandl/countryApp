import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private dbouncer: Subject<string> = new Subject<string>();

  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder : string = '';


  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  @Input()
  public initialValue: string = '';


  ngOnInit(): void {
    this.debouncerSubscription = this.dbouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( value => {
      this.onDebounce.emit(value);

    } )
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  emitValue( value: string ): void {
      this.onValue.emit(value)
  }

  onKeyPress( seacrhTerm: string ) {
      this.dbouncer.next( seacrhTerm );
  }
}
