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
import {
    borderTopRightRadiusProperty,
    Observable
} from "tns-core-modules/ui/page/page";
import { LanguageService } from "../shared/services/language.service";
import { timeout } from "rxjs/operators";

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
        return this.http.post("https://ipsosanketa.com/loginz.php", data, {
            responseType: "json"
        });
    }

    configureOAuthProviders() {
        const googleProvider = this.configureOAuthProviderGoogle();
        const facebookProvider = this.configureOAuthProviderFacebook();
        configureTnsOAuth([googleProvider, facebookProvider]);
    }

    configureOAuthProviderGoogle() {
        const googleProviderOptions: TnsOaProviderOptionsGoogle = {
            openIdSupport: "oid-full",
            clientId:
                "308014954641-k1mofnd02vadqhofcmus6guguke1hamp.apps.googleusercontent.com",
            redirectUri:
                "com.googleusercontent.apps.308014954641-k1mofnd02vadqhofcmus6guguke1hamp:/auth",
            urlScheme:
                "com.googleusercontent.apps.308014954641-k1mofnd02vadqhofcmus6guguke1hamp",
            scopes: ["email"]
        };

        const googleProvider = new TnsOaProviderGoogle(googleProviderOptions);
        return googleProvider;
    }

    configureOAuthProviderFacebook() {
        const facebookProviderOptions: TnsOaProviderOptionsFacebook = {
            openIdSupport: "oid-none",
            clientId: "302880763694141",
            clientSecret: "35ebb02cc8cb5473d9647e8f717d32b7",
            redirectUri: "https://www.facebook.com/connect/login_success.html",
            scopes: ["email"]
        };

        const facebookProvider = new TnsOaProviderFacebook(
            facebookProviderOptions
        );
        return facebookProvider;
    }

    tnsOAuthLogin(providerType) {
        console.log(providerType, "PROVIDER");
        this.client = new TnsOAuthClient(providerType);
        var that = this;
        this.client.loginWithCompletion(
            (tokenResult: ITnsOAuthTokenResult, err) => {
                if (!tokenResult) {
                    console.log("ERROR GOOGLE LOGIN", err);
                } else {
                    let obj = {
                        mobile: true
                    };
                    if (providerType == "google") {
                        obj["id_token"] = tokenResult.idToken;
                    } else if (providerType == "facebook") {
                        obj["accessToken"] = tokenResult.accessToken;
                    }
                    console.log("izaslo", tokenResult);
                    this.ngZone.run(() => {
                        this.loginWithPass(obj).subscribe(
                            res => {
                                // debugger;
                                console.log("RES", res);
                                res["auth_type"] =
                                    providerType == "google" ? 2 : 3;
                                appSettings.setString(
                                    "isp_data_login",
                                    JSON.stringify(res)
                                );
                                that.router.navigate(["home"]);
                            },
                            err => {
                                console.log("ERR", err);
                            }
                        );
                    });
                }
            }
        );
    }

    navigate(commands?: any[]): void {
        console.log("ODE U NAVIGACIJU");
        this.router.navigate(["home"]);
    }

    redi() {}
}
