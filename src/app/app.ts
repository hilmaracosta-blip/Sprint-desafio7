import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Mudamos de DashboardComponent para RouterOutlet
  template: '<router-outlet></router-outlet>' // O RouterOutlet gerencia a troca de telas
})
export class AppComponent {
  title = 'api_ford';
}