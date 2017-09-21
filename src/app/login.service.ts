import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { User } from './user';
import { Login } from './login';
import { Http } from '@angular/http';



@Injectable()
export class LoginService {
  public readonly login: Subject<Login> = new Subject<Login>();
  public readonly user: Observable<User>;
  public readonly userError: Observable<any>;

  constructor(private http: Http) {
    const doLogin = this.login
    .flatMap(login => http.get('http://localhost:3001/login', {params: login}))
    .map(response => response.json())
    .share();

    this.user = doLogin
      .catch(err => Observable.never());

    this.userError = doLogin
      .catch(err => Observable.of(err));
  }
}
