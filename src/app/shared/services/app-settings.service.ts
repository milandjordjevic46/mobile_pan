import { Injectable } from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";
import { Environment } from "./environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AppSettingsService extends Environment {
    result: string;
    constructor() {
        super();
    }

    getString(what: any): Observable<any> {
        const studentsObservable = new Observable(observer => {
            if (what === 1)
                this.result = appSettings.getString("isp_data");
            else if (what === 2)
                this.result = appSettings.getString("isp_token");
            observer.next(this.result);
        });
        return studentsObservable;
    }
}
