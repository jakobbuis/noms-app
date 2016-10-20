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
            (authorization_token) => { alert(authorization_token['code']) },
            (error) => { alert(error) }
        );
    }

    private nomslogin(): Promise<any> {
        let url = 'https://auth.debolk.nl/authenticate/?response_type=code&client_id=bolknoms-app&redirect_uri=http%3A%2F%2Flocalhost%2Fnoms-auth-callback&state=812887';
        let options = 'location=no,zoom=no,hardwareback=no';

        return new Promise((resolve, reject) => {
            let browser = window.cordova.InAppBrowser.open(url, '_self', options);

            let exit_callback = (event) => { alert('Login was cancelled') };

            browser.addEventListener('exit', exit_callback);

            browser.addEventListener('loadstart', (event) => {
                if ((event.url).indexOf('http://localhost/noms-auth-callback') === 0) {
                    browser.removeEventListener('exit', exit_callback);
                    browser.close();

                    let parameters = this.parseURLParameters(event.url);
                    console.log(JSON.stringify(parameters));

                    if (parameters['error'] === 'access_denied') {
                        reject('Toestemming geweigerd. Toestemming is nodig voor de app om te weten wie jij bent.');
                    }
                    else {
                        resolve(parameters);
                    }
                }
            });
        });
    }

    private parseURLParameters(url: string) {
        let query_string = url.split('?')[1];
        let elements = query_string.split('&');

        let result = {};
        elements.forEach((element) => {
            let [key, value] = element.split('=');
            result[key] = value;
        });
        return result;
    }
}
