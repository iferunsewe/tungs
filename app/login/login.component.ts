import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { AuthenticationService } from '../services/index';

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) {}

    ngOnInit(){
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password).subscribe(result => {
            if (result === true) {
                this.router.navigate(['/']);
            } else {
                this.error = 'Email or password is incorrect';
                this.loading = false;
            }
        });
    }
}