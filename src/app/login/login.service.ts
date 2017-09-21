import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { User, Login } from './login.interfaces';
import { Http } from '@angular/http';

import { runQuery } from '../operator/operator.doQuery';
import { Processing } from '../operator/operator.interfaces';

@Injectable()
export class LoginService {
  public readonly input: Subject<Login> = new Subject<Login>();
  public readonly output: Observable<Processing<User>>;

  constructor(private http: Http) {
    const query = (params: Login) => http.get('/api/login', {params});
    this.output = runQuery<Login>(this.input, query).share();
  }
}
