import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AccessToken } from '../models/oauth/access_token';
import { UserDetails } from '../models/oauth/user_details';

@Injectable()
export class OAuth {

    constructor(private http: Http) {}

    requestOptions() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return { headers: headers };
    }

    public getAccessToken(code: string): Observable<AccessToken> {
        let data = JSON.stringify({
            'grant_type':'authorization_code',
            'redirect_uri':'http://localhost/noms-auth-callback',
            'code':code,
            'client_id': 'bolknoms-app',
            'client_secret': 'iknAdilVkD66lBzhBKsD'
        });
        return this.http.post('https://auth.debolk.nl/token', data, this.requestOptions())
                    .map((response) => <AccessToken> response.json())
                    .catch(this.parseError);
    }

    public getUserDetails(access_token: string): Observable<UserDetails> {
        return this.http.get(`https://auth.debolk.nl/resource?access_token=${access_token}`, this.requestOptions())
                            .map((response) => <UserDetails> response.json())
                            .catch(this.parseError);
    }

    private parseError(response: any) {
        let error = response.json();
        console.log(`OAuth error: ${error.error} (${error.message})`);
        return Observable.throw(error.message);
    }
}
