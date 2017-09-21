import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { User, Login } from './login.interfaces';
import { Http } from '@angular/http';

@Injectable()
export class LoginService {
  public readonly input: Subject<Login> = new Subject<Login>();
  public readonly output: Observable<User>;

  constructor(private http: Http) {
    const sendQuery = (params) => http.get('/api/login', {params})
      .do(response => console.log(response))
      .map(response => response.json());

    this.output = this.input
      .switchMap(
        login => sendQuery(login)
        .catch(error => Observable.of({error}))
      )
      .share();
  }
}
