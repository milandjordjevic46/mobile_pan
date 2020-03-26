import { Component, OnInit, NgZone } from "@angular/core";
import { AuthService } from "../auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LanguageService } from "~/app/shared/services/language.service";
import * as appSettings from "tns-core-modules/application-settings";
import { Router } from "@angular/router";
import { ITnsOAuthTokenResult } from "nativescript-oauth2";
import { RouterExtensions } from "nativescript-angular/router";

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
        private auth_service: AuthService,
        private form_builder: FormBuilder,
        private lang_service: LanguageService,
        private router: Router,
        private routerExtensions: RouterExtensions,
        private ngZone: NgZone
    ) {
        // page.actionBarHidden = true;
        this.loginForm = this.form_builder.group({
            email: [null, Validators.required],
            pass: [null, Validators.required],
            mobile: true,
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

    // public onLoginTap(param) {
    //     this.auth_service
    //         .tnsOAuthLogin(param)
    //         .then((result: ITnsOAuthTokenResult) => {
    //             let obj = {
    //                 mobile: true
    //             };
    //             if (param == "google") {
    //                 obj["id_token"] = result.idToken;
    //             } else if (param == "facebook") {
    //                 obj["accessToken"] = result.accessToken;
    //             }

    //             this.auth_service.loginWithPass(obj).subscribe(
    //                 res => {
    //                     console.log("RES", res);
    //                     res["auth_type"] = param == "google" ? 2 : 3;
    //                     appSettings.setString(
    //                         "isp_data_login",
    //                         JSON.stringify(res)
    //                     );
    //                     this.router.navigate(["home"]);
    //                 },
    //                 err => {
    //                     console.log("ERR", err);
    //                 }
    //             );
    //         })
    //         .catch(e => console.log("Error: " + e));
    // }

    public onLoginTap(param) {
        this.auth_service
            .tnsOauthLogin(param)
            .then((result: ITnsOAuthTokenResult) => {
                console.log(
                    "back to login component with token " + result.accessToken
                );
                let obj = {
                    mobile: true
                };
                if (param == "google") {
                    obj["id_token"] = result.idToken;
                } else if (param == "facebook") {
                    obj["accessToken"] = result.accessToken;
                }
                this.auth_service.loginWithPass(obj).subscribe(
                    res => {
                        console.log("RES", res);
                        res["auth_type"] = param == "google" ? 2 : 3;
                        appSettings.setString(
                            "isp_data_login",
                            JSON.stringify(res)
                        );
                        this.router.navigate(["home"]);
                    },
                    err => {
                        console.log("ERR", err);
                    }
                );
                this.router.navigate(["ns-signin"]);
            })
            .catch(e => console.log("Error: " + e));
    }

    login(): any {
        // this.router.navigate(["home"]);
        this.auth_service.loginWithPass(this.loginForm.value).subscribe(
            res => {
                appSettings.setString(
                    "isp_data_login",
                    JSON.stringify(this.loginForm.value)
                );
                this.router.navigate(["home"]);
            },
            err => {
                console.log("errr", err);
            }
        );
    }
}
