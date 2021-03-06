import { Injectable } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from "@angular/router";
import * as appSettings from "tns-core-modules/application-settings";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { RouterExtensions } from "nativescript-angular/router";

@Injectable({
    providedIn: "root"
})
export class AuthGuardGuard implements CanActivate {
    constructor(
        private router: Router,
        private auth_service: AuthService,
        private routerExtension: RouterExtensions
    ) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (!appSettings.getString("isp_data_login")) {
            this.auth_service.updateUserLogged(false);
            this.routerExtension.navigate(["ns-login"], { clearHistory: true });
            return false;
        } else {
            this.auth_service.updateUserLogged(true);
            return true;
        }
    }
}
