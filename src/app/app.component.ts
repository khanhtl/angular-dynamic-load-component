import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DynamicComponent } from './dynamic/dynamic.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-advanced';
  @ViewChild('entry', { read: ViewContainerRef }) entry!: ViewContainerRef;

  @ViewChild('entryLazy', { read: ViewContainerRef })
  entryLazy!: ViewContainerRef;

  lazyComponent!: ComponentRef<any>;
  newComponent!: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver) {}

  load() {
    this.removeDynamicComponent();
    const componentFactory =
      this.resolver.resolveComponentFactory(DynamicComponent);
    const component = this.entry.createComponent(componentFactory);
    setTimeout(() => {
      component.instance.title =
        component.instance.title + ' Has Changed from dynamic load component';
    }, 500);
    component.instance.push.subscribe((value) => {
      component.instance.title =
        component.instance.title + ' Has subscribe from dynamic load component';
    });
  }

  async loadMore() {
    this.removeNewComponent();
    const newComponent = await import('./new/new.component').then(
      (m) => m.NewComponent
    );
    const componentFactory =
      this.resolver.resolveComponentFactory(newComponent);
    this.newComponent = this.entryLazy.createComponent(componentFactory);
  }

  move() {
    this.entryLazy.move(this.lazyComponent.hostView, 1);
  }

  async lazyLoad() {
    this.removeLazyComponent();
    const lazy = await import('./lazy/lazy.component').then(
      (m) => m.LazyComponent
    );
    const componentFactory = this.resolver.resolveComponentFactory(lazy);
    this.lazyComponent = this.entryLazy.createComponent(componentFactory);
  }

  removeDynamicComponent() {
    this.entry?.clear();
  }
  removeLazyComponent() {
    this.lazyComponent?.destroy();
  }
  removeNewComponent() {
    this.newComponent?.destroy();
  }
  removeAllLazyEntry() {
    this.entryLazy?.clear();
  }
}
