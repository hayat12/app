import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  //Formdata : {name:string,email:string,username:string,password:string,conPassword:string}
  constructor(
    public navCtrl        : NavController,
    public auth           : AuthProvider,
    public navParams      : NavParams) {
  }
  SignUp(fm){
    console.log();
    
      if (fm.password === fm.conPassword) {
          this.auth.Register(fm).then((res)=>{
          });
      } else {
        console.log("stop!!!");
        
      }
  }

}
