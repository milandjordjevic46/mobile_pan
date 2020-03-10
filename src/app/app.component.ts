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

interface userData {
    name: '',
    lastName: '',
    email: '',
    panelid: '',
    ime_vokativ: ''
}

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

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe(
                (event: NavigationEnd) =>
                    (this._activatedUrl = event.urlAfterRedirects)
            );
        this.auth_service.configureOAuthProviders();

        // na pocetku setujem jezik aplikaciji
        this.lng_service.getLng().subscribe(
            res => {
                this.lng_service.updateBroadCastMessage(res);
            },
            err => {}
        );

        this.auth_service.isLogged.subscribe(res => {
            this.logged = res;
            console.log("Logged", res)
        })
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
