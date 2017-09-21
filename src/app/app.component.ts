import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { LoginQuery } from './login/login.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor (private login: LoginService) {
  }

  doLogin(login: LoginQuery) {
    this.login.input.next(login);
  }
}
