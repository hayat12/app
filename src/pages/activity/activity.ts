import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {
		currentDate                  : any;
    currentdateTime              : any;
    StatusOption                 : any;
    Status                       : any = "Open";
    Task_ResponsData             : any;
    Call_ResponsData             : any;
    Mail_ResponsData             : any;
    EventResponsData             : any;
    userdata1                    : any;
    UserSession                  : any;
    ClosedEvent                  : any;
    ClosedTask                   : any;
    loading                      : any;
    
  constructor(
      private auth               : AuthProvider,
      public navCtrl 					   : NavController, 
      public platform            : Platform,
      public loadCtrl           : LoadingController,
  		public navParams 				   : NavParams,
  		public http 					     : Http) {
  }

  ionViewDidLoad() {
    this.auth.GetStorageData().then((data)=>{
      if(data != null){
        this.ReadyPlatForm(data);
        this.CloseedEvent(data);
        this.CloseedTask(data);
        return this.UserSession = data;
      }else{
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }
  ReadyPlatForm(data){
    this.platform.ready().then((re)=>{
        this.DispalyUpcoming(data);
        this.getMail(data);
        this.getCall(data);
    });
  }
  getEvent(val,type){
    this.auth.GetEventForActivity(val,type).then((res)=>{
      return this.EventResponsData = res;
    });
  }
  getTask(val,type){
    this.auth.GetTaskForActivity(val,type).then((res)=>{
      this.loading.dismiss();
      return this.Task_ResponsData = res;
    });
  }

  getCall(val){
    this.auth.GetCallForActivity(val).then((res)=>{
      this.Call_ResponsData = res;
    });
  }
  getMail(val){
    this.auth.GetMailForActivity(val).then((res)=>{
        this.Mail_ResponsData = res;
          });
  }
DispalyToday(data){
  this.LoadingFunction();
    this.getEvent(data,{type:"today"});
    this.getTask(data,{type:"today"});
}
DispalyUpcoming(data){
  this.LoadingFunction();
    this.getEvent(data,{type:"upcoming"});
    this.getTask(data,{type:"upcoming"});
}
CloseedEvent(val){
  this.auth.GetEventForActivity(val,{type:'ClosedEventForActivity'}).then((res)=>{
    this.ClosedEvent = res;
  });
}
CloseedTask(val){
  this.auth.GetTaskForActivity(val,{type:'ClosedTaskForActivity'}).then((res)=>{
    this.ClosedTask = res;
  });
}

LoadingFunction(){
  this.loading = this.loadCtrl.create({
    content: 'Loading ...',
    duration: 60000
  });
  this.loading.present();
  
  
}

}