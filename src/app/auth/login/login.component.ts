import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Page } from "tns-core-modules/ui/page/page";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "ns-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    constructor(
        private auth_service: AuthService,
        private page: Page,
        private form_builder: FormBuilder
    ) {
        page.actionBarHidden = true;
        this.loginForm = this.form_builder.group({
            email: [null, Validators.required],
            password: [null, Validators.required]
        });
    }

    ngOnInit(): void {}

    onLoginTap() {
        this.auth_service.tnsOAuthLogin("google");
    }

    login(): void {
        if(this.loginForm.valid)
            console.log('login', this.loginForm.value)
    }
}
