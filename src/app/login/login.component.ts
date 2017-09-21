import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Login } from '../login';
import { Observable } from 'rxjs/Rx';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements Login {
  login: string;
  password: string;

  constructor(private loginService: LoginService) {
    loginService.userError.subscribe(error => console.log(error));
  }

  doLogin() {
    const login = this.login;
    const password = this.password;

    this.loginService.login.next({
      login,
      password
    });
  }
}
