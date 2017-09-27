import { Observable } from 'rxjs/Rx';
import { TestBed, inject } from '@angular/core/testing';
import { LoginService } from './login.service';
import { Http, HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LocalStorageService } from 'ngx-webstorage';
import { CurrentUserKey } from './login.interfaces';

function testSequence<Result>(input: Observable<Result>, result: Result[]) {
    let step = 0;
    input.subscribe(value => {
        expect(value).toEqual(result[step]);
        step++;
    });
}

describe('Login Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpModule ],
            providers: [
                LoginService,
                LocalStorageService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        });
    });

    it('should return hot login state', inject([LoginService, XHRBackend], (service, mockbackend) => {
        const response = {
            firstName: 'a',
            lastName: 'b',
            token: 'c'
        };

        mockbackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(response)
            })));
        });

        testSequence(service.login, [
            {
                status: 0
            },
            {
                status: 1,
                value: response
            }
        ]);

        service.input.next();
    }));

    it('should return completed login state', inject([LoginService, XHRBackend], (service, mockbackend) => {

        const response = {
            firstName: 'a',
            lastName: 'b',
            token: 'c'
        };

        mockbackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(response)
            })));
        });

        testSequence(service.loginCompleted, [ response ]);
        service.input.next();
    }));

    it('should return undefined as initial user state', inject([LoginService, XHRBackend, LocalStorageService],
        (service, mockbackend, localStorageService) => {
        localStorageService.clear();
        service = new LoginService(TestBed.get(Http), TestBed.get(LocalStorageService));

        testSequence(service.user, [ undefined ]);
    }));

    it('should return not empty initial user state', inject([LoginService, XHRBackend, LocalStorageService],
        (service, mockbackend, localStorageService) => {
        const initialState = {
            firstName: 'a',
            lastName: 'b',
            token: 'c'
        };

        localStorageService.store(CurrentUserKey, initialState);
        service = new LoginService(TestBed.get(Http), TestBed.get(LocalStorageService));

        testSequence(service.user, [ initialState ]);
    }));

    it('should reflect login to the user', inject([LoginService, XHRBackend, LocalStorageService],
        (service, mockbackend, localStorageService) => {
        const initialState = {
            firstName: 'a',
            lastName: 'b',
            token: 'c'
        };

        const response = {
            firstName: 'c',
            lastName: 'e',
            token: 'd'
        };

        localStorageService.store(CurrentUserKey, initialState);
        service = new LoginService(TestBed.get(Http), TestBed.get(LocalStorageService));

        mockbackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(response)
            })));
        });

        testSequence(service.user, [ initialState, response ]);
        service.input.next();
    }));

    it('should process logout', inject([LoginService, XHRBackend, LocalStorageService],
        (service, mockbackend, localStorageService) => {
        const initialState = {
            firstName: 'a',
            lastName: 'b',
            token: 'c'
        };

        localStorageService.store(CurrentUserKey, initialState);
        service = new LoginService(TestBed.get(Http), TestBed.get(LocalStorageService));

        testSequence(service.user, [ initialState, undefined ]);
        service.logout.next();
    }));

    it('should clear local storage after logout', inject([LoginService, XHRBackend, LocalStorageService],
        (service, mockbackend, localStorageService) => {
        const initialState = {
            firstName: 'a',
            lastName: 'b',
            token: 'c'
        };

        localStorageService.store(CurrentUserKey, initialState);
        service = new LoginService(TestBed.get(Http), TestBed.get(LocalStorageService));
        service.logout.next();

        expect(localStorageService.retrieve(CurrentUserKey)).toEqual(null);
    }));
});
