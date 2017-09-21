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
    const sendQuery = (params) => http.get('http://localhost:3001/login', {params})
      .do(response => console.log(response))
      .map(response => response.json());

    const doLogin = this.login
      .switchMap(
        login => sendQuery(login)
        .catch(error => Observable.of({error}))
      )
      .share();

    this.user = doLogin
      .filter(result => !result.error);

    this.userError = doLogin
      .filter(result => result.error)
      .map(result => result.error);
  }
}
