import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesPersonPage } from './sales-person';

@NgModule({
  declarations: [
    SalesPersonPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesPersonPage),
  ],
})
export class SalesPersonPageModule {}
