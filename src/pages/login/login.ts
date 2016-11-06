import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CurrentUser } from '../../services/current_user';
import { Register } from '../register/register';
import { OAuth } from '../../services/oauth';

declare var window: any;

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class Login {

    constructor(public navCtrl: NavController, private oAuth: OAuth, private currentUser : CurrentUser) {}

    ionViewDidLoad() {
        let user = this.currentUser.get();
        if (user != null) {
            // WORKAROUND Ionic 2 RC0: navigating in ngAfterViewInit only works wrapped in setTimeout
            setTimeout(() => { this.navCtrl.setRoot(Register) }, 1);
        }
    }

    public login() {
        this.nomslogin().then(
            (authentication_token) => {
                this.oAuth.getAccessToken(authentication_token.code).subscribe(
                    (token) => {
                        this.oAuth.getUserDetails(token.access_token).subscribe(
                            (user_details) => {
                                console.log(`User details: ${JSON.stringify(user_details)}`);
                                this.currentUser.set({ id: user_details.user_id, oauth: token});
                                this.navCtrl.pop();
                                this.navCtrl.push(Register);
                            },
                            (error) => { alert(`Kan de gegevens van jouw account (gebruikersnaam, etc) niet ophalen\n\nTechnische details: ${error}`) }
                        );
                    },
                    (error) => { alert(`Er ging iets verkeerd bij het valideren van je token. Probeer opnieuw.\n\nTechnische details: ${error}`) }
                );
            },
            (error) => { alert(error) }
        );
    }

    private nomslogin(): Promise<any> {
        let url = 'https://auth.debolk.nl/authenticate/?response_type=code&client_id=bolknoms-app&redirect_uri=http%3A%2F%2Flocalhost%2Fnoms-auth-callback&state=812887';
        let options = 'location=no,zoom=no,hardwareback=no';

        return new Promise((resolve, reject) => {
            let browser = window.cordova.InAppBrowser.open(url, '_self', options);

            browser.addEventListener('loadstart', (event) => {
                if ((event.url).indexOf('http://localhost/noms-auth-callback') === 0) {
                    browser.close();

                    let parameters = this.parseURLParameters(event.url);

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
