import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { LanguageService } from "~/app/shared/services/language.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

@Component({
    selector: "ns-signin",
    templateUrl: "./signin.component.html",
    styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {
  @ViewChild("dd", {static: false}) izborZemlje: ElementRef;
  signInForm: FormGroup;
    lng: Object;
    privacy: boolean;
    items: Array<string> = ["<>", "milan", "milan2", "milan3"];

    constructor(
        private lang_service: LanguageService,
        private form_builder: FormBuilder
    ) {
        this.signInForm = this.form_builder.group({
            ime: [null, Validators.required],
            prezime: [null, Validators.required],
            email: [null, Validators.required],
            zemlja: [0, Validators.required],
            jezikZemlje: [0, Validators.required]
        });
        this.lang_service.broadCast.subscribe(
            res => {
                this.lng = res;
            },
            err => {}
        );
    }

    ngOnInit(): void {}

    signin() {
        console.log("signin radi");
    }

    checkCondition() {
        this.privacy = !this.privacy;
    }

    onchangeCountry(args: SelectedIndexChangedEventData) {
        console.log(
            `Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`
        );
    }

  onchangeLanguage(args: SelectedIndexChangedEventData) { }
  
}
