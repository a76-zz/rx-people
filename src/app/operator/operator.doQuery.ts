import { Observable, Subject } from 'rxjs/Rx';
import { Processing, Status } from './operator.interfaces';
import { Response } from '@angular/http';

function sendQuery<T>(params: T, request: (params: T) => Observable<Response>) {
    return request(params)
        .map(response => ({status: Status.Ready, value: response.json()}))
        .startWith({status: Status.Loading});
}

export function runQuery<T>(input: Subject<T>, request: (params: T) => Observable<Response>) {
    return input.switchMap(
        (params) => sendQuery(params, request)
        .catch(error => Observable.of({status: Status.Error, value: error}))
    );
}
