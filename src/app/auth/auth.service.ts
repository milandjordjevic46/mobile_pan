import { Injectable } from "@angular/core";
import {
    configureTnsOAuth,
    TnsOAuthClient,
    ITnsOAuthTokenResult
} from "nativescript-oauth2";

import {
    TnsOaProvider,
    TnsOaProviderOptionsFacebook,
    TnsOaProviderFacebook,
    TnsOaProviderOptionsGoogle,
    TnsOaProviderGoogle
} from "nativescript-oauth2/providers";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    client: TnsOAuthClient = null;

    constructor() {}

    configureOAuthProviders() {
        const googleProvider = this.configureOAuthProviderGoogle();
        const facebookProvider = this.configureOAuthProviderFacebook();
        configureTnsOAuth([googleProvider, facebookProvider]);
    }

    configureOAuthProviderGoogle() {
        const googleProviderOptions: TnsOaProviderOptionsGoogle = {
            openIdSupport: "oid-full",
            clientId:
                "822285105532-ecf0oqog2mpvf2ug67ncvtp85741tjmc.apps.googleusercontent.com",
            redirectUri:
                "com.googleusercontent.apps.822285105532-ecf0oqog2mpvf2ug67ncvtp85741tjmc:/home",
            urlScheme:
                "com.googleusercontent.apps.822285105532-ecf0oqog2mpvf2ug67ncvtp85741tjmc",
            scopes: ["email"]
        };

        const googleProvider = new TnsOaProviderGoogle(googleProviderOptions);
        return googleProvider;
    }

    configureOAuthProviderFacebook() {
        const facebookProviderOptions: TnsOaProviderOptionsFacebook = {
            openIdSupport: "oid-none",
            clientId:
                "679014456192534",
            clientSecret:
                "1ffb4575505d8b3f98932645b82c647c",
                redirectUri: "https://www.facebook.com/connect/login_success.html",
            scopes: ["email"]
        };

        const facebookProvider = new TnsOaProviderFacebook(facebookProviderOptions);
        return facebookProvider;
    }

    tnsOAuthLogin(providerType) {
        console.log(providerType, 'PROVIDER')
        this.client = new TnsOAuthClient(providerType);

        this.client.loginWithCompletion((tokenResult: ITnsOAuthTokenResult, err) => {
                if (err) {
                    console.log("ERROR GOOGLE LOGIN", err);
                } else {
                    console.log("LOGGED IN GOOGLE", tokenResult.accessToken);
                }
            }
        );
    }
}
