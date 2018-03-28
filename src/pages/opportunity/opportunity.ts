import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { NewOpportunityPage } from '../new-opportunity/new-opportunity';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-opportunity',
  templateUrl: 'opportunity.html',
})
export class OpportunityPage {
    nom                              : number = 20;
    orgData                          : any;
		viewOppo 						             : any;
    smg                              : any;
    opportunityId                    : any;
    ClosedResponsData                : any;
    manageoppo                       : boolean = false;
    oppoTop                          : boolean = true;
    sessionid                        : any;
    a: any;

  constructor(
      public navCtrl 					       : NavController, 
      private auth                   : AuthProvider,
      public navParams 				       : NavParams,
      private storage                : Storage,
      private events                 : Events,
  		public http 					         : Http) {

  }
  ionViewDidLoad() {
    this.auth.GetStorageData().then((data)=>{
      if(data!=null){
        this.sessionid = data;
        let id = '';
        this.displayOpportunity(data,{type:"DisplayOpenOpportunity"},id);
        this.displayClosedOpportunity(data,{type:"DisplayClosedOpportunity"},id);

        // IF THE PAGE HAS POPPED THE FUNCTION WILL RELOAD IT
        this.events.subscribe('backToopportunitylist',() => {
          console.log("yes loaded");
          
          this.displayOpportunity(data,{type:"DisplayOpenOpportunity"},id);
          this.displayClosedOpportunity(data,{type:"DisplayClosedOpportunity"},id);
        });
      }else{
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

  displayOpportunity(data,type,id){
    this.auth.DisplayListOfOpportunity(data,type,id).then((res)=>{
      this.orgData = res;
    });
  }
  displayClosedOpportunity(data,type,id){
    this.auth.DisplayListOfOpportunity(data,type,id).then((res)=>{
      this.ClosedResponsData = res;
    });
  }

  VeiwOppoDetails(viewoppo,status){
    if (status.oppoStatus === 'close') {
      this.storage.set('OppoStatus','close').then(()=>{
          this.navCtrl.push(NewOpportunityPage,viewoppo);
      }).catch();
    } else {
      this.storage.set('OppoStatus','open').then(()=>{
          this.navCtrl.push(NewOpportunityPage,viewoppo);
      }).catch();
    }
  }

  NewOpportunity(newoppo){
    this.navCtrl.push(NewOpportunityPage,newoppo);
  }
}
