import { Observable, Subject } from 'rxjs/Rx';
import { Response } from '@angular/http';

function sendQuery<T>(params: T, request: (params: T) => Observable<Response>) {
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


export function createRemoteStream<T>(input: Observable<T>, request: (params: T) => Observable<Response>) {
    return input.switchMap(
        (params) => sendQuery(params, request)
        .catch(error => Observable.of({status: Status.Error, value: error}))
    );
}
