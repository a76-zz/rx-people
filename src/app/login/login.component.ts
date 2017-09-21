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
  @Input() user: RemoteData<LoginInfo>;
  @Output() loginAction: EventEmitter<LoginQuery> = new EventEmitter<LoginQuery>();

  public Status = Status;

  login: string;
  password: string;

  doLogin() {
    const { login, password } = this;
    this.loginAction.emit({
      login,
      password
    });
  }
}
