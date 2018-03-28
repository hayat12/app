import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { IonicPage, NavController, NavParams,ToastController, LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {
  username : any;
  Requestusername           : any;
  Responseusername          : any;
   timers                   : number = 20;
   response                 : any;
   RequestPass              : boolean = true;
   ResetPass                : boolean = false;
   resetResponse            : any;
   Couter                   : any;
   loading                  : any;
  constructor(
    public navCtrl                    : NavController,
    public toastCtrl                  : ToastController,
    private storage                   : Storage,
    private loadCtrl                  : LoadingController,
    private auth                      : AuthProvider, 
    public navParams                  : NavParams) {
  }

  ionViewDidLoad() {
    this.CheckRequest();
  }
CheckRequest(){
  this.storage.get('restPass').then((res)=>{
    if(res != null){
      this.RequestPass = false;
      this.ResetPass = true;
      this.WatchMe();
    }else{
      this.ResetPass = false;
      this.RequestPass = true;
    }
  })
}
WatchMe(){
  setTimeout(() => {
        this.storage.remove('restPass').then((boolean)=>{
          if (true) {
            this.navCtrl.setRoot(LoginPage);
            this.Toasterfunction('Request has expired');
          }
        });
  },60000);
}
Forgot(val){
  this.LoadingFunction();
  let body = JSON.stringify({
    ExsitRequest: 'sendrestRquest',
    username: val.email
  });
  this.storage.set('restPass',body).then(()=>{
    this.auth.forgetPass(val).then((resp)=>{
      if(resp === "OK"){
        this.auth.ManageResetRequast(val.email,'ManagetResetPass').then((rr)=>{
            this.navCtrl.setRoot(ForgetPasswordPage);
            this.loading.dismiss();
        }).catch((err)=>{
          console.log(err);
        })
      }
      else{
        this.storage.remove('restPass').then((rm)=>{
        this.navCtrl.setRoot(LoginPage);
        this.loading.dismiss();
        this.Toasterfunction('This email does not exist');
        });
      }
    }).catch();
  })
}

ResetPassword(em){
  let mypass = em.newPass;
  let secrtNo = em.secrtKey;
  let confrimpass = em.confrimPass;
  if(mypass === confrimpass){
    let body = JSON.stringify({
        securKey  : secrtNo,
        myEmail    : mypass,
        Mycfmpass   : confrimpass
    });
    this.auth.ResetPasswords(body).then((res)=>{
      this.resetResponse = res;
      if(this.resetResponse ==="OK"){
        this.Toasterfunction("Your Password has successfully change");
        this.navCtrl.setRoot(LoginPage);
      }else if(this.resetResponse ==="NO"){
        this.Toasterfunction("Please try again with differnt code ");
      }else{
        this.Toasterfunction("Something is wrong");
      }
    }).catch((err)=>{
      console.log(err);
    });
  }else{
    this.Toasterfunction('Your password does not match please try again');
  }
  }
  Toasterfunction(texts){
    let toaster = this.toastCtrl.create({
      message: texts,
      duration: 3000
    });
    toaster.present();
  }

  LoadingFunction(){
    this.loading = this.loadCtrl.create({
      content: 'Loading...',
      duration: 6000
    });
    this.loading.present();
  }
  BackToLogin(){
    this.navCtrl.pop();
  }
  
}
