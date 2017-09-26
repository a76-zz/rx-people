import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { LoginInfo, LoginQuery, CurrentUserKey } from './login.interfaces';
import { Http } from '@angular/http';
import { toQuery, toCompleted, toBehavior, toRemoteData, RemoteData } from '../remote-data';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class LoginService {
  public readonly input: Subject<LoginQuery> = new Subject<LoginQuery>();
  public readonly login: Observable<RemoteData<LoginInfo>>;
  public readonly loginCompleted: Observable<LoginInfo>;
  public readonly user: Observable<LoginInfo>;

  constructor(private http: Http, private localStorage: LocalStorageService) {
    const query = (params: LoginQuery) => http.get('/api/login', {params});
    const login = toQuery(this.input, query);

    const loginCompleted = toCompleted(login);
    const user = loginCompleted.startWith(window['currentUser'] || this.localStorage.retrieve(CurrentUserKey));

    this.login = toBehavior(login);
    this.loginCompleted = toBehavior(loginCompleted);
    this.user = toBehavior(user);

    loginCompleted.subscribe(info => this.localStorage.store(CurrentUserKey, info));
  }
}
