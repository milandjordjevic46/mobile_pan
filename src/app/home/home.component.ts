import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view/web-view";
import { AuthService } from "../auth/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import * as appSettings from "tns-core-modules/application-settings";

@Component({
    selector: "ns-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    @ViewChild("webViewHome", { static: true }) WebViewRef: ElementRef;
    isp_data;
    webViewSrc: string;
    constructor(private auth_service: AuthService, private router: Router) {}

    ngOnInit(): void {
        // appSettings.remove('isp_data_login');
        this.isp_data = JSON.parse(appSettings.getString("isp_data_login"));
        this.webViewSrc =
            "https://ipsosanketa.com/set_session.php" +
            "?email=" +
            this.isp_data.email +
            "&pass=" +
            this.isp_data.pass +
            "&mobile=true";
        const webview = <WebView>this.WebViewRef.nativeElement;
        webview.on(WebView.loadFinishedEvent, (arg: LoadEventData) => {
            console.log("LOADED URL" + arg.url);
            if (
                arg.url.includes("login_html.php") ||
                arg.url.includes("login.php")
            ) {
                this.auth_service.updateUserLogged(true);
                this.router.navigate(["ns-login"]);
                appSettings.remove('isp_data_login');
            }
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
