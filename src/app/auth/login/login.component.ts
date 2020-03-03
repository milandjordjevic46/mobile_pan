import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Page } from "tns-core-modules/ui/page/page";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LanguageService } from "~/app/shared/services/language.service";

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
        private page: Page,
        private form_builder: FormBuilder,
        private lang_service: LanguageService
    ) {
        // page.actionBarHidden = true;
        this.loginForm = this.form_builder.group({
            email: [null, Validators.required],
            password: [null, Validators.required]
        });
        this.lang_service.broadCast.subscribe(
            res => {
                this.lng = res;
            },
            err => {}
        );
    }

    ngOnInit(): void {}

    onLoginTap(param) {
        this.auth_service.tnsOAuthLogin(param);
    }

    login(): void {
        if (this.loginForm.valid) console.log("login", this.loginForm.value);
    }
}
