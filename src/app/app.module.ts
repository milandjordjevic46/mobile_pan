import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { FeaturedComponent } from "./featured/featured.component";
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
import { SettingsComponent } from "./settings/settings.component";
import { NavBarComponent } from "./shared/nav-bar/nav-bar.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ChooseLngComponent } from "./shared/choose-lng/choose-lng.component";
import { DropDownModule } from "nativescript-drop-down/angular";
import { SigninComponent } from "./auth/signin/signin.component";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "./auth/auth.service";

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
        FeaturedComponent,
        HomeComponent,
        SearchComponent,
        SettingsComponent,
        NavBarComponent,
        ChooseLngComponent,
        SigninComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
