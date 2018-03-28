import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyEmailPage } from './my-email';

@NgModule({
  declarations: [
    MyEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(MyEmailPage),
  ],
})
export class MyEmailPageModule {}
