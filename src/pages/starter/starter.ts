import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignUpPage } from '../sign-up/sign-up';

@IonicPage()
@Component({
  selector: 'page-starter',
  templateUrl: 'starter.html',
})
export class StarterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.navCtrl.setRoot(StarterPage);
  }
 Login(){
  this.navCtrl.push(LoginPage);
 }
 SignUp(){
  this.navCtrl.push(SignUpPage);
 }
}
