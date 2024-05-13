import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnDestroy {
  constructor() {}

  ngOnDestroy() {
    console.log('OnDestroy destroyed');
  }
}
