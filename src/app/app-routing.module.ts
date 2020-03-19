import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { SettingsComponent } from "./settings/settings.component";
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
import { FeaturedComponent } from "./featured/featured.component";
import { LoginComponent } from "./auth/login/login.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { AuthGuardGuard } from "./auth/auth-guard.guard";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent, canActivate: [AuthGuardGuard] },
    {
        path: "ns-login",
        component: LoginComponent
    },
    { path: "ns-signin", component: SigninComponent },
    {
        path: "search",
        component: SearchComponent,
        canActivate: [AuthGuardGuard]
    },
    {
        path: "featured",
        component: FeaturedComponent,
        canActivate: [AuthGuardGuard]
    },
    {
        path: "settings",
        component: SettingsComponent,
        canActivate: [AuthGuardGuard]
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
