import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewSalesPage } from './new-sales';

@NgModule({
  declarations: [
    NewSalesPage,
  ],
  imports: [
    IonicPageModule.forChild(NewSalesPage),
  ],
})
export class NewSalesPageModule {}
