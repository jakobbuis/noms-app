import { ApiClient } from './api_client';
import { Observable } from 'rxjs/Observable';
import { Meal } from '../models/meal';
import { Injectable } from '@angular/core';

@Injectable()
export class MealService {

    constructor(private api: ApiClient) {}

    public availableMeals(): Observable<Meal[]> {
        return this.api.get('meals/available').map((response) => response.json()['meals']);
    }
}
