import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
@IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {
  contact_person    : any;
  event_disc        : any;
  event_end         : any;
  event_start       : any;
  event_status      : any;
  location          : any;
  subject           : any;
  id                : any;
  @ViewChild('search') public searchElement: ElementRef;

  constructor(
    public navCtrl          : NavController,
    private auth            : AuthProvider,
    public alertCtrl        : AlertController,
    public navParams        : NavParams) {
  }
  ionViewDidLoad() {
    this.getRecoreds(this.navParams.get('ev'));
  }
  getRecoreds(record){

    this.contact_person   = record.contact_person;
    this.event_disc       = record.event_disc;
    this.event_start      = record.event_start;
    this.event_end        = record.event_end;
    this.event_status     = record.event_status;
    this.location         = record.location;
    this.subject          = record.subject;
    this.id               = record.id;
  }
  ManageEvent(){
    let alert = this.alertCtrl.create({
      title: 'Delete',
      subTitle: "delete "+ this.subject,
      buttons: 
      [
        {
        text : 'Delete',
        handler : data=>{
          this.DeleteEvent();
        }
      },
      {
        text : 'Eidt',
        handler : data=>{
        this.EditEvent();
        }
      },
      {
        text : 'Cancel',
        handler : data=>{

        }
      }
    ]
    });
    alert.present();
  }
  DeleteEvent(){
      this.auth.DeleteEvent(this.id).then((res)=>{
        this.navCtrl.pop();
      }).catch();
  }
  EditEvent(){

  }

}
