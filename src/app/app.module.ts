import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Register } from '../pages/register/register';
import { Login } from '../pages/login/login';

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
  providers: []
})
export class AppModule {}
