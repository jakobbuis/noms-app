import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Register } from '../pages/register/register';
import { Login } from '../pages/login/login';
import { OAuth } from '../services/oauth';
import { MealService } from '../services/meal';
import { CurrentUser } from '../services/current_user';

@NgModule({
    declarations: [
        MyApp,
        Register,
        Login
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Register,
        Login
    ],
    providers: [
        OAuth,
        CurrentUser,
        MealService,
    ]
})
export class AppModule {}
