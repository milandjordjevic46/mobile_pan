import { Injectable, NgZone } from "@angular/core";
import {
    configureTnsOAuth,
    TnsOAuthClient,
    ITnsOAuthTokenResult
} from "nativescript-oauth2";

import {
    TnsOaProviderOptionsFacebook,
    TnsOaProviderFacebook,
    TnsOaProviderOptionsGoogle,
    TnsOaProviderGoogle
} from "nativescript-oauth2/providers";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Environment } from "../shared/services/environment";
import * as appSettings from "tns-core-modules/application-settings";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AuthService extends Environment {
    client: TnsOAuthClient = null;

    private logged = new BehaviorSubject<boolean>(false);
    isLogged = this.logged.asObservable();

    constructor(
        private http: HttpClient,
        private ngZone: NgZone,
        private router: Router
    ) {
        super();
    }

    updateUserLogged(logged: boolean) {
        this.logged.next(logged);
    }

    loginWithPass(data) {
        return this.http.post("https://ipsosanketa.com/login.php", data, {
            responseType: "json"
        });
    }

    signin(params) {
        let link =
            "prijava.php" +
            "?panelid=" +
            params.panelid +
            "&ime=" +
            params.ime +
            "&prezime=" +
            params.prezime +
            "&email=" +
            params.email +
            "&country=" +
            params.zemlja +
            "&lng=" +
            params.lng;

        return this.http.get(this.apiLink + "php/" + link);
    }

    getGEO() {
        return this.http.get(this.apiLink + "php/geo.php");
    }

    public tnsOauthLogin(providerType): Promise<ITnsOAuthTokenResult> {
        this.client = new TnsOAuthClient(providerType);

        return new Promise<ITnsOAuthTokenResult>((resolve, reject) => {
            this.client.loginWithCompletion(
                (tokenResult: ITnsOAuthTokenResult, error) => {
                    if (error) {
                        console.error("back to main page with error: ");
                        console.error(error);
                        reject(error);
                    } else {
                        console.log("back to main page with access token: ");
                        console.log(tokenResult);
                        resolve(tokenResult);
                    }
                }
            );
        });
    }

    forgotPassword(email: string) {
        return this.http.get(
            this.apiLink + "php/forgot_password.php?email=" + email
        );
    }
}
