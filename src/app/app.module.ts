import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { PeopleModule } from './people/people.module';
import { UserInfoModule } from './user-info/user-info.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    PeopleModule,
    UserInfoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
