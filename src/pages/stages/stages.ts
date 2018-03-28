import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { EventPage } from '../event/event';
import { ChangeStagePage } from '../change-stage/change-stage';
import { NewEventPage } from '../new-event/new-event';
import { NewTaskPage } from '../new-task/new-task';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-stages',
  templateUrl: 'stages.html',
})
export class StagesPage {
  public oppoid         : any;
  public sessionid      : any;
  public mystage        : any;
  public mystageid      : any;
  Response              : any;
  ExpectcloseDate       : any;
  ProbalityOfClosing    : number = 0;
  AmountDelivery        : number = 0;
  StageName             : any;
  EventDiv              : boolean = true;
  TaskDiv               : boolean = false;
  loading               : any;
  sts                   : any;
  EeventsResponse       : any;
  TaskResponse          : any;
  Stages                : any;

  checked1              : boolean = false;
  checked2              : boolean = false;
  checked3              : boolean = false;
  checked4              : boolean = false;
  checked5              : boolean = false;

  Qualification         : boolean = false;
  NeedAnalysis          : boolean = false;
  Proposal              : boolean = false;
  Negotiation           : boolean = false;
  Closed                : boolean = false;
  StageStatus           : any;
  opportunitystatus     : any;
  ClosedOpportunity     : any;
  constructor(
    public navCtrl      : NavController,
    private storage     : Storage,
    public loadCtrl     : LoadingController,
    private AlertCtrl   : AlertController,
    private auth        : AuthProvider,
    private events      : Events,
    public navParams    : NavParams) {

  }
  
  ionViewDidLoad(){
    if(this.navParams.get('stage')){
      this.StageStatus  = this.navParams.get('pr');
      this.oppoid     = this.navParams.get('st');
      this.mystage    = this.navParams.get('stage');
      this.sessionid  = this.navParams.get('slp');
      this.mystageid  = this.navParams.get('stageid');
      this.getOpportunity();
      this.getEvents();
      this.setAllStageOfOppor(this.oppoid);
      this.events.subscribe('EventsAndTaskDetails',() => {
        this.getOpportunity();
        this.getEvents();
      });
    }
  } 

  setAllStageOfOppor(id){
    this.auth.getAllStageOfOppo(id).then((resp)=>{
      this.sts = resp;
      this.Stages = this.sts[0].StageType;
      // this.ValidateDtages();
    }).catch((er)=>{
      console.log(er);
    });
  }
  getOpportunity(){
    this.auth.DisplayOpportunityForStages(this.mystage,this.mystageid).then((resp)=>{
      this.Response           = resp;
      this.StageName          = this.Response[0].opportunity_stage;
      this.AmountDelivery     = this.Response[0].no_of_deliviry;
      this.ExpectcloseDate    = this.Response[0].expected_close_date;
      this.ProbalityOfClosing = this.Response[0].probality_close_sale;
    }).catch((err)=>{
      console.log(err);
    });
  }
getEvents(){
  this.LoadingFunction();
  this.EventDiv = true;
  this.TaskDiv  = false;
  let username  = this.sessionid;
  let type      = 'SelectMyEvent';
  this.auth.getEventAndTakForStages(username,this.mystageid,type).then((even_res)=>{
    this.EeventsResponse = even_res;
    this.loading.dismiss();
  }).catch((err)=>{
    console.log(err);
  })
}
getTask(){
  this.LoadingFunction();
  this.EventDiv   = false;
  this.TaskDiv    = true;
  let username    = this.sessionid;
  let type        = 'SelectMyTask';
  this.auth.getEventAndTakForStages(username,this.mystageid,type).then((task_res)=>{
    this.TaskResponse = task_res;
    this.loading.dismiss();
  }).catch((err)=>{
    console.log(err);
  })
}

ManageOpportunityStage(){
  if (this.StageStatus === 'previousStage') {
    let alert = this.AlertCtrl.create({
      title : 'Previous Stage',
      subTitle: 'Can not create Eevent or Task for Previous stage',
      buttons: [
        {
          text: 'Cancel',
          handler: data=>{

          }
        }
      ]
      });
      alert.present();
  } else {
    // this.OpenOpportunity();
  
    this.storage.get('OppoStatus').then((res)=>{
      if (res === 'close') {
        let alert = this.AlertCtrl.create({
          title : 'Previous Stage',
          subTitle: 'Can not create Eevent or Task for closed opportunity',
          buttons: [
            {
              text: 'Cancel',
              handler: data=>{
    
              }
            }
          ]
          });
          alert.present();
       
      } else {
        this.OpenOpportunity();
      }
    }).catch((x)=>{
      console.log(x);
    });
  }
}
  // CloseOpportunity(){
  //   let alert = this.AlertCtrl.create({
  //     title: 'Manage Stage',
  //     subTitle :'Oops! You Can not create new event or task for close Opportunity',
  //     buttons: 
  //     [
  //       {
  //         text: 'Cancel',
  //         handler: data=>{
  //           console.log('Cancel');
  //           }
  //         }
  //   ]
  //   });
  //   alert.present();
  // }
  OpenOpportunity(){
    let alert = this.AlertCtrl.create({
      title: 'Manage Stage',
      subTitle :'Create new event and task or close the Opportunity',
      buttons: 
      [
        {
          text: 'Create Event',
          handler: data=>{
            this.navCtrl.push(EventPage,{oppoid:this.oppoid,stageid:this.mystageid,Toevent:'toEventsPage'});
          }
        },
        {
          text: 'Create Task',
          handler: data=>{
            this.navCtrl.push(EventPage,{oppoid:this.oppoid,stageid:this.mystageid,Totask:'toTasksPage'});
          }
        },
        {
          text: 'Next Stage ',
          handler: data=>{
            this.CloseOrChangeStage();
            // this.navCtrl.push(ChangeStagePage,{oppoid:this.oppoid,stage:this.mystage,stageid:this.mystageid});
          }
        },
        {
          text: 'Cancel',
          handler: data=>{
            console.log('Cancel');
            }
          }
    ]
    });
    alert.present();
  }

  ValidateDtages(StageName){
    if (this.StageStatus ==='previousStage') {
      this.Qualification  = true;
      this.NeedAnalysis   = true;
      this.Proposal       = true;
      this.Negotiation    = true;
      this.Closed         = true;
    } else {
      if(StageName ==='Qualification'){
        this.Qualification  = true;
        this.checked1 = true;
      }else if(StageName === 'NeedAnalysis'){
        this.Qualification  = true;
        this.NeedAnalysis   = true;
        this.checked2 = true;
      }else if(StageName === 'Proposal'){
        this.Qualification  = true;
        this.NeedAnalysis   = true;
        this.Proposal       = true;
        this.checked3 = true;
      }else if(StageName === 'Negotiation'){
        this.Qualification  = true;
        this.NeedAnalysis   = true;
        this.Proposal       = true;
        this.Negotiation    = true;
        this.checked4 = true;
      }else if(StageName === 'Close'){
        this.Qualification  = true;
        this.NeedAnalysis   = true;
        this.Proposal       = true;
        this.Negotiation    = true;
        this.Closed         = true;
        this.checked5 = true;
      }
    }
  }

  CloseOrChangeStage(){
    this.ValidateDtages(this.Stages);
    let alert = this.AlertCtrl.create({
      title: 'Manage Stage',
      subTitle :'Move to Next Stage or Close the Opportunity',
      buttons: 
      [
        {
          text: 'Close Opportunity',
          handler: data=>{
            this.navCtrl.push(ChangeStagePage,{oppoid:this.oppoid,stage:this.mystage,stageid:this.mystageid,closeoppos:'closeoppos'});
          }
        },
    ]
    });
    alert.addInput({
      disabled: this.Qualification,
      type    : 'radio',
      label   : 'Qualification',
      value   : 'Qualification',
      checked : this.checked1
    });
    alert.addInput({
      disabled : this.NeedAnalysis,
      type    : 'radio',
      label   : 'Need Analysis',
      value   : 'NeedAnalysis',
      checked : this.checked2
    });
    alert.addInput({
      disabled: this.Proposal,
      type    : 'radio',
      label   : 'Proposal',
      value   : 'Proposal',
      checked : this.checked3
    });
    alert.addInput({
      disabled : this.Negotiation,
      type    : 'radio',
      label   : 'Negotiation',
      value   : 'Negotiation',
      checked : this.checked4
    });
    alert.addInput({
      disabled: this.Closed,
      id      : 'koos',
      type    : 'radio',
      label   : 'Closed',
      value   : 'Close',
      checked : this.checked5
    });
    alert.addButton({
      text: 'Move to Next Stage',
      handler: data=>{
        // Move the stage from here
        if (this.StageStatus ==='previousStage') {
          this.DefualthAlert('You can not move the current stage, prevouse stage or close opportunity to next stage');
        } else{
          this.InsertIntoStage(data);
        }
      }
    });
    alert.addButton({
      text: 'Cancel',
      handler: data=>{
      }
    });
    alert.present();
  }

  InsertIntoStage(newStage)
    {
      this.auth.myNewStage(this.oppoid).then((s)=>{
        // StageType
        if (newStage === s[0].StageType) {
          this.DefualthAlert(s[0].StageType+' is curent stage please select next stage');
      } else {
          this.auth.InsertDatainToStage(this.Response,newStage)
          .then((res)=>{
              this.PopMe();
            })
          .catch((err)=>{
              console.log(err);
            });
        }
      }).catch(()=>{
        
      });
    }
  DefualthAlert(x){
    let alert = this.AlertCtrl.create({
      title: 'Stage',
      subTitle: x,
      buttons: [{
        text: 'Close',
        handler : data=>{
          this.PopMe();
        }
      }]
    });
    alert.present();
  }

  toMyEvent(e){
    this.navCtrl.push(NewEventPage,e);
  }
  toMyTask(e){
    this.navCtrl.push(NewTaskPage,e);
  }
  ManageMyEvent(e){
    let alert = this.AlertCtrl.create({
      title: 'Manage Event',
      subTitle: 'Delete or Edit the Event',
      buttons: [
        {
        text: 'Edit',
        handler: data=>{
          this.navCtrl.push(EventPage,{data:e, oppoid:this.oppoid, stageid:this.mystageid,EntryType:'updateEvent'});
        }
      },
      {
        text: 'Delete',
        handler: data=>{
          this.LoadingFunction();
          this.DeleteEvent(e.id);
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

  DeleteEvent(id){
    this.auth.DeleteEvent(id).then((res)=>{
      this.PopMe();
      this.loading.dismiss();
    }).catch();
}

  ManageMyTastk(e){
    let alert = this.AlertCtrl.create({
      title: 'Manage Task',
      subTitle: 'Delete or Edit the task',
      buttons: [
        {
        text: 'Edit',
        handler: data=>{
          this.navCtrl.push(EventPage,{data:e,oppoid:this.oppoid,stageid:this.mystageid,EntryType:'updateTask'});
        }
      },
      {
        text: 'Delete',
        handler: data=>{
          this.LoadingFunction();
          this.DeleteTask(e.id);
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

  DeleteTask(id){
    this.auth.DeleteTask(id).then((res)=>{
      this.PopMe();
      this.loading.dismiss();
    }).catch();
  }

  LoadingFunction(){
    this.loading = this.loadCtrl.create({
      content: 'Loading ...',
      duration: 12000
      });
      this.loading.present();
  }
  PopMe(){
    this.events.publish('reloadDetails');
      this.navCtrl.pop();
  }
}
