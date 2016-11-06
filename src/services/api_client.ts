import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { AppSettings } from '../app/app_settings.module';
import { Observable } from 'rxjs/Observable';
import { CurrentUser } from './current_user';

@Injectable()
export class ApiClient {

  constructor(private http : Http, private currentUser : CurrentUser) {}

  requestOptions() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let user = this.currentUser.get();
    if (user != null && user.oauth.access_token != null) {
        headers.append('Authorization', user.oauth.access_token);
    }

    return { headers: headers };
  }

  addLocation(url : string) : string {
      return AppSettings.API_ENDPOINT + url;
  }

  get(url : string ) : Observable<Response> {
    return this.http.get(this.addLocation(url), this.requestOptions());
  }

  post(url : string, data) : Observable<Response> {
    return this.http.post(this.addLocation(url), data, this.requestOptions());
  }
}
