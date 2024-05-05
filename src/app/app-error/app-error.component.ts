import { Component } from '@angular/core';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-app-error',
  templateUrl: './app-error.component.html',
})
export class AppErrorComponent {
  constructor(public appState: AppStateService) {}
}
