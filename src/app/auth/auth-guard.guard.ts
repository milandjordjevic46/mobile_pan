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

@Injectable({
    providedIn: "root"
})
export class AuthGuardGuard implements CanActivate {
    constructor(
        private router: Router
    ) {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
      | UrlTree {
      // appSettings.setString('isp_data', "0");
      // let mi = appSettings.getString('isp_data');
      //   if ( 1 != 1) {
      //       this.router.navigate(["ns-login"]);
      //       return false; 
      // } else 
            this.router.navigate(["ns-login"]);
          return false
    }
}
