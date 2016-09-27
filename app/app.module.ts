import { NgModule } from 'angular2/core';
import { BrowserModule } from 'angular2/platform-browser';
import { FormsModule } from 'angular2/forms';
import { HttpModule } from 'angular2/http';

import  { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AuthGuard } from './guards/index'
import { AuthenticationService, UserService } from './services/index';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}