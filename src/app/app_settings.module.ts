import { NgModule } from '@angular/core';

@NgModule()
export class AppSettings {

    public static get API_ENDPOINT() : string { return 'http://10.99.2.247/api/'; }
}
