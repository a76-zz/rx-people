import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { LocalStorageService } from 'ngx-webstorage';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [
    LoginComponent
  ],
  declarations: [
    LoginComponent
  ],
  providers: [LoginService, LocalStorageService],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
