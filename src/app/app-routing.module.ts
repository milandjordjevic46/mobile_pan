import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { SettingsComponent } from "./settings/settings.component";
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
import { FeaturedComponent } from "./featured/featured.component";
import { LoginComponent } from "./auth/login/login.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "search", component: SearchComponent },
    { path: "featured", component: FeaturedComponent },
    { path: "settings", component: SettingsComponent },
    { path: "ns-login", component: LoginComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
