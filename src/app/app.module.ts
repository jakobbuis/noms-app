import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Register } from '../pages/register/register';
import { Login } from '../pages/login/login';
import { OAuth } from '../services/oauth';
import { CurrentUser } from '../services/current_user';
import { MealService } from '../services/meal_service';
import { ApiClient } from '../services/api_client';

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
    ApiClient,
    MealService
  ]
})
export class AppModule {}
