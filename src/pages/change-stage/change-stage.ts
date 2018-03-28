import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-change-stage',
  templateUrl: 'change-stage.html',
})
export class ChangeStagePage {

  public sessionid        : any;
  public opportuniyid     : any;
  public opportunityStage : any;
  public stageid          : any;
  NextStage               : boolean = true;
  CloseOpportunity        : boolean = false;
  comment                 : boolean = false;
  public Result           : any;
  Response                : any;
  loading                 : any;
  Items                   = Array();
  sts                     : any;
  constructor
  (
    public navCtrl    : NavController,
    private auth      : AuthProvider,
    private events     : Events,
    public loadCtrl   : LoadingController,
    public alertCtrl  : AlertController,
    public navParams  : NavParams
  ){

  }
  ionViewDidLoad()
  {
    if (this.navParams.get('closeoppos') ==='closeoppos') {
      this.CloseOpportunity = true;
      this.NextStage = false;
    } else {
      this.CloseOpportunity = false;
      this.NextStage = true;
    }
    this.sessionid        = this.navParams.get('sessionid');
    this.opportuniyid     = this.navParams.get('oppoid');
    this.opportunityStage = this.navParams.get("stage");
    this.stageid          = this.navParams.get('stageid');
    this.getOpportunity(this.stageid,this.opportunityStage);
  }

  getOpportunity(user,id)
    {
      this.auth.DisplayOpportunityForStages(id,user)
          .then((res)=>{
            this.Result = res;
          })
        .catch((err)=>{
          console.log(err);
      });
    }
  MoveNextStage(newStage)
    {
      let mystage = newStage.nextStages
      let oppoid                       = this.Result[0].oppo_id;
      this.auth.ValidateStage(oppoid,mystage)
      .then((res)=>{
        this.Response = res;
        })
      .catch((err)=>{
        console.log(err);
      });
    }
InsertIntoStage(newStage)
  {
    this.auth.InsertDatainToStage(this.Result,newStage)
    .then((res)=>{
        this.PopMe();
        this.loading.dismiss();
      })
    .catch((err)=>{
        console.log(err);
      });
  }

  Winbtn(){
    this.comment = false;
  }
  Losebtn(){
      this.comment =true;
  }

  CloseOppo(v){
    this.CloseConfrimation(v);
  }

  CloseConfrimation(v){
    let alert = this.alertCtrl.create({
      title : v.OpportunityName,
      subTitle : v.OpportunityName+" this Opportunity and close",
      buttons : 
      [
        {
        text    : 'Close',
        handler : data=>{
          this.CloseNowtheOpportunity(v);
          this.Loadingfuncation();
        }
      },
      {
        text    : 'Cancel',
        handler : data=>{
          console.log('Cancel');
        }
      }
    ]
    });
    alert.present();
  }
  CloseNowtheOpportunity(v){
    this.auth.CloseTheOpportunity(v,this.opportuniyid,this.opportunityStage)
    .then((res)=>{
      this.PopMe();
      this.loading.dismiss();
    }).catch((rr)=>{
      console.log(rr);
    });
  }
  // Tabs ... 
  MoveToNextStage(){
    this.NextStage = true;
    this.CloseOpportunity = false;
  }

  CloseThisOppo(){
    this.CloseOpportunity = true;
    this.NextStage = false;
  }

  PopMe(){
    this.events.publish('backToopportunitylist');
    this.navCtrl.pop();
  }

  Loadingfuncation(){
    this.loading = this.loadCtrl.create({
      content: 'Loading ...',
      duration: 6000
    });
    this.loading.present();
  }
}
