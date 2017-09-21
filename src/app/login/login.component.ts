import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User, Login } from './login.interfaces';
import { Status, Processing } from '../operator/operator.interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  @Input() user: Processing<User>;
  @Output() loginAction: EventEmitter<Login> = new EventEmitter<Login>();

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
