import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { LanguageService } from "~/app/shared/services/language.service";

@Component({
    selector: "ns-signin",
    templateUrl: "./signin.component.html",
    styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {
    @ViewChild("dd", { static: false }) izborZemlje: ElementRef;
    lng: Object;
    privacy: boolean;
    webViewSrc: string;

    constructor(
        private lang_service: LanguageService
    ) {
      this.lang_service.broadCast.subscribe(
            // ovo je prevod
            res => {
                this.lng = res;
            },
            err => {}
        );
        this.lang_service.currentLNG.subscribe(
            // subscribe-ovao sam se da bih na svaku promenu jezika ponovo pozivao webvieww
            res => {
                this.webViewSrc =
                    "https://online.ipsos-adria.com/ipsos_mobile_pan/#!/registracija?jezik=" +
                    res + "&v=4";
            },
            err => {}
        );
    }

    ngOnInit(): void {}

    // onLoadStarted(args: LoadEventData) {
    //     const webView = args.object as WebView;

    //     if (!args.error) {
    //         console.log("Load Start");
    //         console.log(`EventName: ${args.eventName}`);
    //         console.log(`NavigationType: ${args.navigationType}`);
    //         console.log(`Url: ${args.url}`);
    //     } else {
    //         console.log(`EventName: ${args.eventName}`);
    //         console.log(`Error: ${args.error}`);
    //     }
    // }

    // onLoadFinished(args: LoadEventData) {
    //     const webView = args.object as WebView;

    //     if (!args.error) {
    //         console.log("Load Finished");
    //         console.log(`EventName: ${args.eventName}`);
    //         console.log(`NavigationType: ${args.navigationType}`);
    //         console.log(`Url: ${args.url}`);
    //     } else {
    //         console.log(`EventName: ${args.eventName}`);
    //         console.log(`Error: ${args.error}`);
    //     }
    // }
}
