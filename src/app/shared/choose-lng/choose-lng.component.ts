import { Component, OnInit } from "@angular/core";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { LanguageService } from "../services/language.service";

@Component({
    selector: "ns-choose-lng",
    templateUrl: "./choose-lng.component.html",
    styleUrls: ["./choose-lng.component.scss"]
})
export class ChooseLngComponent implements OnInit {
    selectedIndex = 1;
    items: Array<string> = [
        "SRPSKI",
        "ENGLISH",
        "CRNOGORSKI",
        "МАКЕДОНСКИ",
        "SHQIPE"
    ];
    countries: Object = {
        0: "RS",
        1: "EN",
        2: "MNE",
        3: "MK",
        4: "AL"
    };

    constructor(private lng_service: LanguageService) {}

    onchange(args: SelectedIndexChangedEventData) {
        this.lng_service.getLng(this.countries[args.newIndex]).subscribe(
          res => {
            console.log('usao u onchange',this.countries[args.newIndex])
                if (!res["login"]) {
                    this.lng_service.updateBroadCastMessage({
                        login: {
                            l2: "nistaaa"
                        }
                    });
                } else this.lng_service.updateBroadCastMessage(res);
            },
            err => {}
        );
        console.log(
            `Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`
        );
    }

    onopen() {
        console.log("Drop Down opened.");
    }

    onclose() {
        console.log("Drop Down closed.");
    }
    ngOnInit(): void {}
}
