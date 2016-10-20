import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class CurrentUser {

    public static get() : User {
        return <User> JSON.parse(window.localStorage.getItem("current_user"));
    }

    public static set(user: User) {
        window.localStorage.setItem('current_user', JSON.stringify(user));
    }
}
