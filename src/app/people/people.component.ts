import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Person, PeopleQuery } from './people.interfaces';
import { Status, RemoteData } from '../remote-data';

import { Page } from '../app.interfaces';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleComponent {
  public Status = Status;

  @Input() state: RemoteData<Page<Person>>;
  @Output() queryHandler: EventEmitter<PeopleQuery> = new EventEmitter<PeopleQuery>();

  raiseQuery() {
    this.queryHandler.emit();
  }
}
