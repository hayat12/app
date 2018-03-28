import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { HomePage } from '../home/home';
@IonicPage()
@Component({
  selector: 'page-not-connection',
  templateUrl: 'not-connection.html',
})
export class NotConnectionPage {

  constructor(
    public navCtrl    : NavController,
    private eventdata : EventDataProvider,
    public navParams  : NavParams) {
  }

  ionViewDidLoad() {
    this.WatchInternetConnection();
  }

  WatchInternetConnection(){
    this.eventdata.Validatedisvonection().then((e)=>{
      if (e === true) {
        this.navCtrl.setRoot(HomePage);
      }
    }).catch((er)=>{
      alert(JSON.stringify(er));
    });
  }
}
