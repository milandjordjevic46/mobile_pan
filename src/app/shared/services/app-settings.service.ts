import { Injectable } from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";

@Injectable({
    providedIn: "root"
})
export class AppSettingsService {
    constructor() {}

    getString(what: any): string {
        let result;
        switch (what) {
            case 1:
                result = appSettings.getString("isp_data");
                break;
            case 2:
                result = appSettings.getString("isp_token");
                break;
        }
        return result;
    }
}
