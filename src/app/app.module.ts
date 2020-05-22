import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./home/home.component";
import { NavBarComponent } from "./shared/nav-bar/nav-bar.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ChooseLngComponent } from "./shared/choose-lng/choose-lng.component";
import { DropDownModule } from "nativescript-drop-down/angular";
import { SigninComponent } from "./auth/signin/signin.component";
import { VerifyComponent } from './auth/verify/verify.component';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        DropDownModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        NavBarComponent,
        ChooseLngComponent,
        SigninComponent,
        VerifyComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
