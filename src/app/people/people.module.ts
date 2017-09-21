import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from '../login/login.module';
import { PeopleComponent } from './people.component';
import { PeopleService } from './people.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    HttpModule
  ],
  exports: [
    PeopleComponent
  ],
  declarations: [
    PeopleComponent
  ],
  providers: [PeopleService],
  bootstrap: [PeopleComponent]

})
export class PeopleModule { }
