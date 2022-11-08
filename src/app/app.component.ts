import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ingresoegresoapp';
  constructor( private authS : AuthService) { }

  ngOnInit(): void {
    this.authS.initAuthListener()
  }
}
