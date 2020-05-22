import { Component, OnInit, NgZone } from "@angular/core";
import { AuthService } from "../auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LanguageService } from "~/app/shared/services/language.service";
import * as appSettings from "tns-core-modules/application-settings";
import { Router } from "@angular/router";
import { ITnsOAuthTokenResult } from "nativescript-oauth2";
import { RouterExtensions } from "nativescript-angular/router";
import * as toast from "nativescript-toast";

@Component({
    selector: "ns-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    googleFacebook: boolean;
    logged: boolean;
    lng: any = {
        login: {
            l2: "nistaa"
        }
    };
    constructor(
        protected auth_service: AuthService,
        protected form_builder: FormBuilder,
        protected lang_service: LanguageService,
        protected router: Router,
        protected routerExtensions: RouterExtensions,
        protected ngZone: NgZone
    ) {
        // page.actionBarHidden = true;
        this.loginForm = this.form_builder.group({
            email: [null, Validators.required],
            pass: [null, Validators.required],
            mobile: true,
            token: appSettings.getString("token_tok"),
            auth_type: 1
        });
        this.lang_service.broadCast.subscribe(
            res => {
                this.lng = res;
            },
            err => {}
        );
    }

    ngOnInit(): void {}

    public onLoginTap(param, code?) {
        this.auth_service
            .tnsOauthLogin(param)
            .then((result: ITnsOAuthTokenResult) => {
                console.log(
                    "back to login component with token " + result.accessToken
                );
                let obj = {
                    token: appSettings.getString("token_tok"),
                    mobile: true
                };
                if (param == "google") {
                    obj["id_token"] = result.idToken;
                } else if (param == "facebook") {
                    obj["accessToken"] = result.accessToken;
                }

                // first login or change pass
                if (code) obj["code"] = code;

                this.auth_service.loginWithPass(obj).subscribe(
                    res => {
                        console.log("RES", res);
                        res["auth_type"] = param == "google" ? 2 : 3;
                        appSettings.setString(
                            "isp_data_login",
                            JSON.stringify(res)
                        );
                        if (param == "google")
                            toast
                                .makeText(this.lng["alerts"]["a2"], "long")
                                .show();

                        this.routerExtensions.navigate(["home"]);
                    },
                    err => {
                        console.log("ERR", err);
                    }
                );
                this.routerExtensions.navigate(["home"], {
                    clearHistory: true
                });
            })
            .catch(e => console.log("Error: " + e));
    }

    login(): any {
        console.log(this.loginForm.value);
        if (!this.loginForm.value.code) {
            if (!this.loginForm.value.email || !this.loginForm.value.pass)
                return toast.makeText(this.lng["alerts"]["a1"], "long").show();
        } else {
            if (this.loginForm.value.pass != this.loginForm.value.repeatedPass)
                return toast.makeText(this.lng["alerts"]["a3"], "long").show();
        }

        this.auth_service.loginWithPass(this.loginForm.value).subscribe(
            res => {
                if (!this.loginForm.value.email)
                    this.loginForm.value.email = res["email"];
                appSettings.setString(
                    "isp_data_login",
                    JSON.stringify(this.loginForm.value)
                );
                this.routerExtensions.navigate(["home"], {
                    clearHistory: true
                });
            },
            err => {
                console.log("errr", err);
                toast.makeText(err.error.msg, "long").show();
            }
        );
    }

    forgotPass() {
        if (!this.loginForm.value.email)
            toast.makeText(this.lng["alerts"]["a4"], "long").show();
        else {
            this.auth_service
                .forgotPassword(this.loginForm.value.email)
                .subscribe(
                    res => {
                        console.log("FORGOT PASS", res);
                        toast.makeText(this.lng["login"]["l9"], "long").show();
                        // if (res["data"]["code"] == 200)
                    },
                    err => {
                        console.log("FORGOT ERROR", err);
                    }
                );
        }
    }
}
