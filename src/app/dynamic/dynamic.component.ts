import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css'],
})
export class DynamicComponent implements OnDestroy {
  @Output() push = new EventEmitter<string>();
  ngOnInit() {
    this.push.emit('push');
  }

  title = 'DynamicComponent';

  ngOnDestroy() {
    console.log('DynamicComponent destroyed');
  }
}
