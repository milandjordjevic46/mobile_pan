import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    EventEmitter,
} from "@angular/core";
import { LanguageService } from "~/app/shared/services/language.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import {
    SelectedIndexChangedEventData,
    ValueList,
} from "nativescript-drop-down";
import * as toast from "nativescript-toast";
import * as utils from "tns-core-modules/utils/utils";

@Component({
    selector: "ns-signin",
    templateUrl: "./signin.component.html",
    styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
    lng: Object;
    privacy: boolean;
    signinForm: FormGroup;
    selectedIndex = 1;
    lngs;
    GEO;
    showMultiLngs;

    constructor(
        private lang_service: LanguageService,
        private auth_service: AuthService,
        private form_builder: FormBuilder
    ) {
        // this.lngs = [];
        this.signinForm = this.form_builder.group({
            ime: [null, Validators.required],
            prezime: [null, Validators.required],
            email: [null, Validators.required],
            zemlja: [null, Validators.required],
            lng: [null, Validators.required],
            panelid: [null, Validators.required],
            mobile: true,
            privacy: false,
        });

        this.auth_service.getGEO().subscribe(
            (res) => {
                let array = [];
                for (let i in res["panels"]) {
                    array.push({
                        value: i,
                        display: res["panels"][i]["name"],
                    });
                }
                this.GEO = res;
                this.lngs = new ValueList<string>(array);
            },
            (err) => {}
        );

        this.lang_service.broadCast.subscribe(
            // ovo je prevod
            (res) => {
                this.lng = res;
            },
            (err) => {}
        );
        // this.lang_service.currentLNG.subscribe(
        //     // subscribe-ovao sam se da bih na svaku promenu jezika ponovo pozivao webview
        //     res => {
        //         this.webViewSrc =
        //             "https://online.ipsos-adria.com/ipsos_mobile_pan/#!/registracija?jezik=" +
        //             res +
        //             "&v=4";
        //     },
        //     err => {}
        // )
    }

    ngOnInit(): void {}

    onchange(args: SelectedIndexChangedEventData) {
        console.log(
            "dropdown is " +
                this.GEO["panels"][this.lngs.getValue(args.newIndex)][
                    "name_lng"
                ]
        );
        this.signinForm.value.zemlja = this.lngs.getValue(args.newIndex);
        this.signinForm.value.panelid = this.GEO["panels"][
            this.signinForm.value.zemlja
        ]["panel_id"];
        if (
            this.GEO["panels"][this.lngs.getValue(args.newIndex)]["lng"]
                .length == 1
        ) {
            this.signinForm.value.lng = this.GEO["panels"][
                this.lngs.getValue(args.newIndex)
            ]["lng"][0];
            this.showMultiLngs = false;
        } else {
            let array = [];
            let jezici = this.GEO["panels"][this.signinForm.value.zemlja][
                "lng"
            ];
            for (let i in jezici) {
                for (let j in this.GEO["panels"]) {
                    if (this.GEO["panels"][j].short_lng == jezici[i])
                        array.push({
                            value: jezici[i],
                            display: this.GEO["panels"][j]["name_lng"],
                        });
                }
            }
            this.showMultiLngs = new ValueList<string>(array);
        }
    }

    // Langunage inside country(if more than one);
    onchangeLng(args: SelectedIndexChangedEventData) {
        this.signinForm.value.lng = this.showMultiLngs.getValue(args.newIndex);
    }

    checkPrivacy() {
        this.signinForm.value.privacy = !this.signinForm.value.privacy;
    }

    seePolicy() {
        return utils.openUrl("https://ipsosanketa.com/#!/EN/EN/faq");
    }

    openCountry(event) {
        event.object.style.backgroundColor = "#333";
    }

    closeCountry(event) {
        event.object.style.backgroundColor = "transparent";
    }

    goSignin() {
        if (
            !this.signinForm.value.ime ||
            !this.signinForm.value.prezime ||
            !this.signinForm.value.email ||
            !this.signinForm.value.zemlja ||
            !this.signinForm.value.lng ||
            !this.signinForm.value.privacy ||
            !this.signinForm.value.panelid
        ) {
            return toast.makeText(this.lng["alerts"]["a1"], "long").show();
        } else {
            this.auth_service.signin(this.signinForm.value).subscribe(
                (res) => {
                    if (res["res"] == 0)
                        // successfully registrated
                        toast.makeText(this.lng["reg"]["r16"], "long").show();
                    // if (res["res"] == 10)
                    //     // already registrated
                },
                (err) => {
                    toast.makeText(this.lng["alerts"]["a5"], "long").show();
                }
            );
        }
    }
}
