var LoginComponent = (function () {
    function LoginComponent(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.model = {};
        this.loading = false;
        this.error = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password).subscribe(function (result) {
            if (result === true) {
                _this.router.navigate(['/']);
            }
            else {
                _this.error = 'Email or password is incorrect';
                _this.loading = false;
            }
        });
    };
    return LoginComponent;
})();
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map