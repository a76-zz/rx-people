import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { Login } from './login/login.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor (private login: LoginService) {
  }

  doLogin(login: Login) {
    this.login.input.next(login);
  }
}
