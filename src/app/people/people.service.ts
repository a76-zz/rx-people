import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Observable, Subject } from 'rxjs/Rx';

import { LoginInfo } from '../login/login.interfaces';
import { Person, PeopleQuery } from './people.interfaces';
import { Http } from '@angular/http';

import { createRemoteStream, RemoteData, Status } from '../remote-data';
import { Page } from '../app.interfaces';


@Injectable()
export class PeopleService {
  public readonly input: Subject<PeopleQuery> = new Subject<PeopleQuery>();
  public readonly output: Observable<RemoteData<Page<Person>>>;

  constructor(private login: LoginService, private http: Http) {
    const source = Observable.combineLatest(
      login.output.filter(info => info.status === Status.Ready).map(info => info.value),
      this.input
    );

    const query = (params: [LoginInfo, PeopleQuery]) => http.get('/api/people', {params});

    this.output = createRemoteStream(source, query).share();
  }

}
