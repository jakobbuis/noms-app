import { Component } from '@angular/core';
import { MealService } from '../../services/meal_service';
import { Meal } from '../../models/meal';
import { LoadingController } from 'ionic-angular';

@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class Register {

    public meals : Meal[];

    constructor(private mealService : MealService, private loadingController : LoadingController) {}

    ionViewDidLoad() {
        let loader = this.loadingController.create({content: "Zoeken naar maaltijden"});
        loader.present();

        this.mealService.availableMeals().subscribe(
            (meals) => { this.meals = meals; loader.dismiss(); },
            (errors) => { alert(errors) }
        );
    }

    register(meal: Meal) {
        alert('nope, haha');
    }
}
