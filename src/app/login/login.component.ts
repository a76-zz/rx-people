import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { LoginInfo, LoginQuery } from './login.interfaces';
import { Status, RemoteData } from '../remote-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  public Status = Status;

  login: string;
  password: string;

  @Input() state: RemoteData<LoginInfo>;
  @Output() queryHandler: EventEmitter<LoginQuery> = new EventEmitter<LoginQuery>();

  raiseQuery() {
    const { login, password } = this;
    this.queryHandler.emit({
      login,
      password
    });
  }
}
