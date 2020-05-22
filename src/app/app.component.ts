import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import {
    DrawerTransitionBase,
    RadSideDrawer,
    SlideInOnTopTransition
} from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import { AuthService } from "./auth/auth.service";
import { LanguageService } from "./shared/services/language.service";
import * as appSettings from "tns-core-modules/application-settings";
import * as firebase from "nativescript-plugin-firebase";
const dialogs = require("ui/dialogs");

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    logged: boolean;

    constructor(
        private router: Router,
        private routerExtensions: RouterExtensions,
        private auth_service: AuthService,
        private lng_service: LanguageService
    ) {
        // Use the component constructor to inject service
    }

    ngOnInit(): void {
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();
        // appSettings.remove("isp_data_login")
        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe(
                (event: NavigationEnd) =>
                    (this._activatedUrl = event.urlAfterRedirects)
            );
        // PUSH MESSAGESS
        firebase.init({
            showNotifications: true,
            showNotificationsWhenInForeground: false,
            onPushTokenReceivedCallback: token => {
                appSettings.setString("token_tok", token);
                console.log("[Firebase] onPushTokenReceivedCallback:", {
                    token
                });
            },
            onMessageReceivedCallback: (message: firebase.Message) => {
                console.log("[Firebase] onMessageReceivedCallback:", {
                    message
                });
                dialogs.alert({
                    title: message.title !== undefined ? message.title : "",
                    message: message.body,
                    okButtonText: "OK!"
                });
                console.log("radi");
            }
        });
        firebase.addOnDynamicLinkReceivedCallback(link => {
            let getParams = name => {
                const results = new RegExp("[\\?&]" + name + "=([^&#]*)").exec(
                    link.url
                );
                if (!results) return 0;
                return results[1] || 0;
            };

            console.log("CODE", getParams("code"));
            console.log("LNG", getParams("lng"));
            this.routerExtensions.navigate(["ns-verify"], {
                clearHistory: true,
                queryParams: {
                    code: getParams("code"),
                    lng: getParams("lng")
                }
            });
        });

        // na pocetku setujem jezik aplikaciji;
        this.lng_service.getLng().subscribe(
            res => {
                this.lng_service.updateBroadCastMessage(res);
            },
            err => {}
        );

        this.auth_service.isLogged.subscribe(res => {
            console.log("Logged", res);
        });
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
