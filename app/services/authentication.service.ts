import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: String;

    constructor(private http: Http){
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(email, password): Observable<boolean>{
        return this.http.post('http://localhost:8080/login', JSON.stringify({ email: email, password: password }))
            .map((response: Response) => {
                let token = response.json() && response.json().token;
                if(token){
                    // set token property
                    this.token = token;

                    localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
        });

    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}