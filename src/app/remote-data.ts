import { Observable, Subject } from 'rxjs/Rx';
import { Response } from '@angular/http';

function sendQuery<Request, Result>(params: Request, request: (params: Request) => Observable<Response>)
: Observable<RemoteData<Result>> {
    return request(params)
        .map(response => ({status: Status.Ready, value: response.json()}))
        .startWith({status: Status.Loading});
}

export enum Status {
    Loading,
    Ready,
    Error
}

export interface RemoteData<Result> {
    status: Status;
    value?: Result | any;
}

export function toRemoteData<Result>(value: Result): RemoteData<Result> {
    return {
        status: Status.Ready,
        value
    };
}

export function toQuery<Request, Result>(input: Observable<Request>, request: (params: Request) => Observable<Response>)
: Observable<RemoteData<Result>> {
    return input.switchMap(
        (params) => sendQuery(params, request)
        .catch(error => Observable.of({status: Status.Error, value: error}))
    );
}

export function toCompleted<Result>(input: Observable<RemoteData<Result>>): Observable<Result> {
    return input.filter(result => result.status === Status.Ready).map(result => result.value);
}

export function toBehavior<Result>(input: Observable<Result>): Observable<Result> {
    const result = input.shareReplay(1);
    result.subscribe();
    return result;
}
