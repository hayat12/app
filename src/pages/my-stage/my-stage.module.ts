import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyStagePage } from './my-stage';

@NgModule({
  declarations: [
    MyStagePage,
  ],
  imports: [
    IonicPageModule.forChild(MyStagePage),
  ],
})
export class MyStagePageModule {}
