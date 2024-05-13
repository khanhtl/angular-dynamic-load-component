import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.css'],
})
export class LazyComponent implements OnDestroy {
  constructor() {}

  ngOnDestroy() {
    console.log('LazyComponent destroyed');
  }
}
