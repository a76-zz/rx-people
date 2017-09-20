import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { User } from './user';
import { Login } from './login';
import { Http } from '@angular/http';



@Injectable()
export class LoginService {
  public readonly login: Subject<Login> = new Subject<Login>();
  public readonly user: Observable<User>;

  constructor(private http: Http) {
    this.user = this.login
      .flatMap(login => http.get('http://localhost:3001/login', {params: login}))
      .catch(error => Observable.throw(error.json().error))
      .map(response => response.json())
      .switchMap(response => response.error ? Observable.throw(response.error) : Observable.from(response));
  }
}
