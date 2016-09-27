var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
require('rxjs/add/operator/map');
var http_2 = require("angular2/http");
var UserService = (function () {
    function UserService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
    }
    UserService.prototype.getUsers = function () {
        // add authorization header with jwt token
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new http_2.RequestOptions({ headers: headers });
        // get users from api
        return this.http.get('/api/users', options)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getUser = function () {
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new http_2.RequestOptions({ headers: headers });
        // get users from api
        return this.http.get('/profile', options)
            .map(function (response) { return response.json(); });
    };
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
})();
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map