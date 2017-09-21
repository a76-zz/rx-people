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
    const sendQuery = (params) => http.get('/api/login', {params})
      .do(response => console.log(response))
      .map(response => response.json());

    this.user = this.login
      .switchMap(
        login => sendQuery(login)
        .catch(error => Observable.of({error}))
      )
      .share();
  }
}
