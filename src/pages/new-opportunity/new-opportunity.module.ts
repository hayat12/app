import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewOpportunityPage } from './new-opportunity';

@NgModule({
  declarations: [
    NewOpportunityPage,
  ],
  imports: [
    IonicPageModule.forChild(NewOpportunityPage),
  ],
})
export class NewOpportunityPageModule {}
