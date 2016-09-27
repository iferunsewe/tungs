import { Injectable } from 'angular2/core';
import { Http, Headers, Response } from 'angular2/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from 'index'
import { User } from '../models/index'
import {RequestOptions} from "angular2/http";

@Injectable()
export class UserService {
    private token: string;

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService
    ){}

    getUsers(): Observable<User []> {
        // add authorization header with jwt token
        let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get('/api/users', options)
            .map((response: Response) => response.json());
    }

    getUser(){
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get('/profile', options)
            .map((response: Response) => response.json());
    }
}
