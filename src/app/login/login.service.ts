import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { LoginInfo, LoginQuery, CurrentUserKey } from './login.interfaces';
import { Http } from '@angular/http';

import { createRemoteStream, readify, RemoteData } from '../remote-data';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class LoginService {
  public readonly input: Subject<LoginQuery> = new Subject<LoginQuery>();
  public readonly output: Observable<RemoteData<LoginInfo>>;
  public readonly readyOutput: Observable<LoginInfo>;

  constructor(private http: Http, private localStorage: LocalStorageService) {
    const source = this.input;
    const query = (params: LoginQuery) => http.get('/api/login', {params});
    this.output = createRemoteStream<LoginQuery>(source, query).share();
    this.readyOutput = readify(this.output).share();

    // TODO: implement side effects via decorator
    this.readyOutput.subscribe(info => this.localStorage.store(CurrentUserKey, info));
  }
}
