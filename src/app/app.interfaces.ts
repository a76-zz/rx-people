export interface TokenAuthentication {
  token: string;
}

export interface PagingQuery {
  skip: number;
  take: number;
}

export enum Order {
  Asc,
  Desc
}

export interface OrderingQuery {
  orderBy: string;
  order: Order;
}

export interface Page<T> {
  total: number;
  data: T[];
}

