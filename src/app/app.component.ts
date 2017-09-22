import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { PeopleService } from './people/people.service';

import { LoginQuery } from './login/login.interfaces';
import { PeopleQuery } from './people/people.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor (private login: LoginService, private people: PeopleService) {
  }

  queryLogin(query: LoginQuery) {
    this.login.input.next(query);
  }

  queryPeople(query: PeopleQuery) {
    this.people.input.next(query);
  }
}
