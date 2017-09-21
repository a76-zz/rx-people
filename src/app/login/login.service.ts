import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { LoginInfo, LoginQuery } from './login.interfaces';
import { Http } from '@angular/http';

import { createRemoteStream, RemoteData } from '../remote-data';

@Injectable()
export class LoginService {
  public readonly input: Subject<LoginQuery> = new Subject<LoginQuery>();
  public readonly output: Observable<RemoteData<LoginInfo>>;

  constructor(private http: Http) {
    const source = this.input;
    const query = (params: LoginQuery) => http.get('/api/login', {params});
    this.output = createRemoteStream<LoginQuery>(source, query).share();
  }
}
