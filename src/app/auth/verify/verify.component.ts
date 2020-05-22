import { Component, OnInit, NgZone } from "@angular/core";
import { LoginComponent } from "../login/login.component";
import { AuthService } from "../auth.service";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { LanguageService } from "~/app/shared/services/language.service";
import { Router, ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
// ss
@Component({
    selector: "ns-verify",
    templateUrl: "./verify.component.html",
    styleUrls: ["./verify.component.scss"]
})
export class VerifyComponent extends LoginComponent implements OnInit {
    repeatedPass: string;
    constructor(
        auth_service: AuthService,
        formBuilder: FormBuilder,
        lang_service: LanguageService,
        router: Router,
        routerExtensions: RouterExtensions,
        ngZone: NgZone,
        private route: ActivatedRoute
    ) {
        super(
            auth_service,
            formBuilder,
            lang_service,
            router,
            routerExtensions,
            ngZone
        );
    }

    ngOnInit(): void {
        this.loginForm.addControl(
            "repeatedPass",
            new FormControl("", Validators.required)
        );
        this.loginForm.removeControl("email");
        this.route.queryParams.subscribe(params => {
            console.log("PARAMETERS", params.code);
            if (params.code) {
                this.loginForm.addControl(
                    "code",
                    new FormControl(params.code, Validators.required)
                );
            }
        });
    }
}
