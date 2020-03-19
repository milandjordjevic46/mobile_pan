import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Page } from "tns-core-modules/ui/page/page";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LanguageService } from "~/app/shared/services/language.service";
import * as appSettings from "tns-core-modules/application-settings";
import { Router } from "@angular/router";
const dialogs = require("ui/dialogs");

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
        private router: Router
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

    ngOnInit(): void {
        console.log("LOGINN");
        // let data = JSON.parse(appSettings.getString("isp_data_login"));
        console.log("DATATATA", appSettings.getString("isp_data_login"));
        // if (data && data.auth_type) {
        // data.mobile = true;
        // this.login(data);
        // }
    }

    onLoginTap(param) {
        this.auth_service.tnsOAuthLogin(param);
    }

    login(): any {
        this.router.navigate(["home"]);
        // this.auth_service.loginWithPass(this.loginForm.value).subscribe(
        //     res => {
        //         appSettings.setString(
        //             "isp_data_login",
        //             JSON.stringify(this.loginForm.value)
        //         );
        //         this.router.navigate(["home"]);
        //     },
        //     err => {
        //         console.log("errr", err);
        //     }
        // );
    }
}
