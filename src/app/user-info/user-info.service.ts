import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { LocalStorageService } from 'ngx-webstorage';
import { LoginService } from '../login/login.service';
import { LoginInfo, CurrentUserKey } from '../login/login.interfaces';


const getRootContext = () => window;

const getUserFromContext = (maxNesting: number = 5) => {
  let context: any = getRootContext();
  const isProxyMode = context.isProxyMode != null ? context.isProxyMode : true;

  if (isProxyMode) {
    let nesting = 0;
    let user = context.currentUser;

    while (!user && nesting < maxNesting) {
      context = context.parent;
      user = context.currentUser;
      nesting++;
    }

    if (user) {
      return Observable.of(user);
    }
  }

  return Observable.never();
};

@Injectable()
export class UserInfoService {
  public readonly output: Observable<LoginInfo>;

  constructor(private localStorage: LocalStorageService, private login: LoginService) {
    const persistentUser = localStorage.observe(CurrentUserKey) as Observable<LoginInfo>;
    const contextUser = getUserFromContext();

    this.output = Observable.race(persistentUser, contextUser, this.login.readyOutput);
  }

}
