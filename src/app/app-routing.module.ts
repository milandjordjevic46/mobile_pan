import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./auth/login/login.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { AuthGuardGuard } from "./auth/auth-guard.guard";
import { VerifyComponent } from "./auth/verify/verify.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent, canActivate: [AuthGuardGuard] },
    {
        path: "ns-login",
        component: LoginComponent
    },
    {
        path: "ns-signin",
        component: SigninComponent
    },
    {
        path: "ns-verify",
        component: VerifyComponent
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
