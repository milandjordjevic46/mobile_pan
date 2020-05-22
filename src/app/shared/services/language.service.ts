import { Injectable } from "@angular/core";
import { device } from "tns-core-modules/platform/platform";
import { HttpClient } from "@angular/common/http";
import { Environment } from "~/app/shared/services/environment.ts";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class LanguageService extends Environment {
    private broadCastMessage = new BehaviorSubject<string>("{}");
    broadCast = this.broadCastMessage.asObservable();
    private currentLng = new BehaviorSubject<string>("");
    currentLNG = this.currentLng.asObservable();

    constructor(private http: HttpClient) {
        super();
    }
    updateBroadCastMessage(newMessage) {
        this.broadCastMessage.next(newMessage);
    }

    updateCurrentLng(newLng) {
        this.currentLng.next(newLng);
    }

    getLng(param?) {
        let lng;
        let devLng;
        if (device.language == "en") devLng = "EN";
        else if (device.language == "sr") devLng = "RS";
        else if (device.language == "al") devLng = "AL";
        else if (device.language == "mkd") devLng = "MK";
        else if (device.language == "me") devLng = "ME";
        else devLng = "EN";

        if (!param) {
            lng = devLng;
        } else {
            lng = param.toUpperCase();
        }

        this.updateCurrentLng(lng);
        let link = this.apiLink + "languages/" + lng + "-" + lng + ".json?v=1";
        return this.http.get(link);
    }
}
