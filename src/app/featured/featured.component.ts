import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { LanguageService } from "../shared/services/language.service";

@Component({
    selector: "Featured",
    templateUrl: "./featured.component.html"
})
export class FeaturedComponent implements OnInit {
    lng: Object;
    constructor(private lng_service: LanguageService) {}

    ngOnInit(): void {
        this.lng_service.broadCast.subscribe(
            res => {
                this.lng = res;
            },
            err => {}
        );
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
