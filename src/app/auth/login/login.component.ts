import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Page } from "tns-core-modules/ui/page/page";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LanguageService } from "~/app/shared/services/language.service";
import * as appSettings from "tns-core-modules/application-settings";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
    selector: "ns-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
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
            mobile: true
        });
        this.lang_service.broadCast.subscribe(
            res => {
                this.lng = res;
            },
            err => {}
        );
    }

    ngOnInit(): void {
        console.log("LOGIN");
    }

    onLoginTap(param) {
        this.auth_service.tnsOAuthLogin(param);
    }

    login(): any {
        // alert(JSON.parse(this.loginForm.value));
        // if (!this.loginForm.value.email || !this.loginForm.value.pass)
        //     return false;
        this.auth_service.loginWithPass(this.loginForm.value).subscribe(
            res => {
                if (res['ok'] == true) {
                    appSettings.setString(
                        "isp_data_login",
                        JSON.stringify(this.loginForm.value)
                    );
                    this.router.navigate(["home"]);
                } else
                    alert('greska se desila sa sifrom');
            },
            err => {
                console.log("errr", err);
            }
        );
    }
}
