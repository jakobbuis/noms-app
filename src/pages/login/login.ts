import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CurrentUser } from '../../services/current_user';
import { Register } from '../register/register';

declare var window: any;

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class Login {

    constructor(public navCtrl: NavController) {}

    ngAfterViewInit() {
        let user = CurrentUser.get();
        if (user != null) {
            // WORKAROUND Ionic 2 RC0: navigating in ngAfterViewInit only works wrapped in setTimeout
            setTimeout(() => { this.navCtrl.pop(); this.navCtrl.push(Register) }, 1);
        }
    }

    public login() {
        this.nomslogin().then(
            (success) => { alert(success.access_token) },
            (error) => { alert(error) }
        );
    }

    public nomslogin(): Promise<any> {
        return new Promise((resolve, reject) => {
            let browser = window.cordova.InAppBrowser.open('https://auth.debolk.nl/authenticate/?response_type=code&client_id=bolknoms-app&redirect_uri=http%3A%2F%2Flocalhost%2Fnoms-auth-callback&state=812887')

            browser.addEventListener('exit', (event) => { alert('Login was cancelled') });

            browser.addEventListener('loadstart', (event) => {
                if ((event.url).indexOf('http://localhost/noms-auth-callback') === 0) {
                    browser.removeEventListener('exit', (event) => {});
                    browser.close();
                }
                var responseParameters = ((event.url).split("#")[1]).split("&");
                var parsedResponse = {};
                for (var i = 0; i < responseParameters.length; i++) {
                    parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                }
                if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
                    resolve(parsedResponse);
                } else {
                    reject("Problem authenticating with auth.debolk.nl");
                }
            });
        });
    }
}
