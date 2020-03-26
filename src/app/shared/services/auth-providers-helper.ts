import { configureTnsOAuth } from "nativescript-oauth2";
import {
    TnsOaProvider,
    TnsOaProviderOptionsGoogle,
    TnsOaProviderGoogle,
    TnsOaProviderOptionsFacebook,
    TnsOaProviderFacebook
} from "nativescript-oauth2/providers";

export function configureOAuthProviders() {
    const googleProvider = configureOAuthProviderGoogle();
    const facebookProvider = configureOAuthProviderFacebook();
    configureTnsOAuth([googleProvider, facebookProvider]);
}

export function configureOAuthProviderGoogle() {
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

export function configureOAuthProviderFacebook() {
    const facebookProviderOptions: TnsOaProviderOptionsFacebook = {
        openIdSupport: "oid-none",
        clientId: "302880763694141",
        clientSecret: "35ebb02cc8cb5473d9647e8f717d32b7",
        redirectUri: "https://www.facebook.com/connect/login_success.html",
        scopes: ["email"]
    };

    const facebookProvider = new TnsOaProviderFacebook(facebookProviderOptions);
    return facebookProvider;
}
