import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    NgZone
} from "@angular/core";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view/web-view";
import { AuthService } from "../auth/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import * as appSettings from "tns-core-modules/application-settings";
import { Page } from "tns-core-modules/ui/page/page";

import {
    AndroidApplication,
    AndroidActivityBackPressedEventData
} from "tns-core-modules/application";
import * as application from "tns-core-modules/application";
// import { exit } from "nativescript-exit";

@Component({
    selector: "home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    @ViewChild("webViewHome", { static: true }) WebViewRef: ElementRef;
    isp_data;
    webViewSrc: string;
    webview;
    constructor(
        private auth_service: AuthService,
        private router: Router,
        private page: Page
    ) {
        page.actionBarHidden = true;
        this.isp_data = JSON.parse(appSettings.getString("isp_data_login"));
        if (!this.isp_data) router.navigate(["ns-login"]);
    }

    ngOnInit(): void {
        // appSettings.remove('isp_data_login')
        const webview = <WebView>this.WebViewRef.nativeElement;

        this.webViewSrc =
            "https://ipsosanketa.com/set_session.php" +
            "?email=" +
            this.isp_data.email +
            "&pass=" +
            this.isp_data.pass +
            "&auth_type=" +
            this.isp_data.auth_type +
            "&mobile=true" +
            "&mobTel=true";
        webview.on(WebView.loadFinishedEvent, (arg: LoadEventData) => {
            console.log("LOADED URL" + arg.url);
            if (
                arg.url.includes("login_html.php") ||
                arg.url.includes("login.php")
            ) {
                this.auth_service.updateUserLogged(false);
                this.router.navigate(["ns-login"]);
                appSettings.remove("isp_data_login");
            }

            application.android.on(
                AndroidApplication.activityBackPressedEvent,
                (data: AndroidActivityBackPressedEventData) => {
                    if ((data.eventName = "activityBackPressed")) {
                        debugger;
                        data.cancel = true;
                        console.log("webview can go back " + webview.canGoBack);
                        if (webview.canGoBack) {
                            webview.goBack();
                        }
                        //  else exit();
                    }
                }
            );
        });
    }

    onLoadStarted(args) {
        const web = args.object;
        if (web.android) {
            web.android.getSettings().setDisplayZoomControls(false);
            web.android.getSettings().setBuiltInZoomControls(false);
        }
    }
}
