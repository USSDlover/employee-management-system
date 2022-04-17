import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div class="app-root">
    <router-outlet></router-outlet>
  </div>`,
  styles: [`
    .app-root {
      max-width: 1280px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent {}
