import { PagingQuery, OrderingQuery } from '../app.interfaces';

export interface Person {
  firstName: string;
  lastName: string;
  email: string;
}

export interface PeopleQuery extends PagingQuery, OrderingQuery {
  filter?: Person;
}


