import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-my-stage',
  templateUrl: 'my-stage.html',
})
export class MyStagePage {
  Title                     : any;
  public myStage            : any;
  NumberOfDelivery          : any;
  opportunity_stage         : any;
  opportunity_name          : any;
  expected_close_date       : any;
  probality_close_sale      : any;
  CloseOppoResponse         : any;
  losestatus                : boolean = false;
  
  constructor(
    public navCtrl      : NavController,
    public alertCtrl    : AlertController,
    private auth        : AuthProvider,
    public navParams    : NavParams) {
  }

  ionViewDidLoad() 
  {
    this.validateStage();

  }

  validateStage(){
    if(this.navParams.get('mypreviousStage')){
      this.myStage = this.navParams.get('mypreviousStage');
      this.expected_close_date    = this.myStage.expected_close_date;
      this.NumberOfDelivery       = this.myStage.no_of_deliviry;
      this.opportunity_stage      = this.myStage.StageType;
      this.probality_close_sale   = this.myStage.probality_close_sale;
      this.Title                  =this.myStage.StageType;
    }else if(this.navParams.get('mycurrentStage')){
      this.myStage = this.navParams.get('mycurrentStage');
      this.expected_close_date = this.myStage.expected_close_date;
      this.NumberOfDelivery = this.myStage.No_of_delivery;
      this.opportunity_stage = this.myStage.opportunity_stage;
      this.probality_close_sale  = this.myStage.probality_close_sale;
      this.Title                  =this.myStage.opportunity_stage;
    }
    // oppo_id
    if(this.opportunity_stage === 'Close'){
      this.getCloseOpportunity(this.myStage.oppo_id);
      this.losestatus = true;
    }
  }
getCloseOpportunity(e){
  this.auth.getLoseOpportuniy(e).then((ss)=>{
    this.CloseOppoResponse = ss;
  }).catch()
}
 ManageStage(){
   let alert = this.alertCtrl.create({
     title: "Manage Stage",
     subTitle : 'Delete or Edit Stage',
     buttons: 
     [
       {
       text : 'Edit',
       handler: data=>{
         this.EditStage();
       }
     },
     {
       text: 'Delete',
       handler: data=>{
         this.DeleteStage();
       }
     },
     {
      text: 'Cancel',
      handler: data=>{
      }
    }
    ]
   });
   alert.present();
 }
 EditStage(){
  alert('edit');
 }
 DeleteStage(){
  alert('delete');
 }
  
  

}
