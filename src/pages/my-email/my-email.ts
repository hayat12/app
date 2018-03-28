import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-my-email',
  templateUrl: 'my-email.html',
})
export class MyEmailPage {

  ReceverId           : any;
  ReceiverEmail       : any;
  SaderEmail          : any;
  loading             : any;


  constructor(
    public  navCtrl    : NavController, 
    private http       : Http,
    public emailComr   : EmailComposer,
    public laodCtrl    : LoadingController,
    private auth       : AuthProvider,
    public  navParams  : NavParams) {
  }
  ionViewDidLoad() {
   this.SaderEmail = this.auth.GetStorageData().then((username)=>{
     this.SaderEmail = username;
   }).catch((e)=>{
     console.log(e);
   });
   this.ReceverId       = this.navParams.get('contact_ID');
   this.ReceiverEmail   = this.navParams.get('email');
  }
  SendMail(value)
  {
    this.LoadingFUnction();
    // this.emailComr.isAvailable().then((available: boolean) =>{
    //   if(available) {
        let email = {
          from: value.sender_Email,
          to: this.ReceiverEmail,
          body: value.Mail,
          isHtml: true
        };
        // Send a text message using default options
        this.emailComr.open(email);
        this.navCtrl.pop();
        this.loading.dismiss();
    //   }
    //  });
    
//  let body  		:   string 	= "key=SendMail&receiver_id=" + this.ReceverId
//                                                         + "&receiver_Email="  +this.ReceiverEmail
//                                                         + "&Mail="            +value.Mail
//                                                         + "&sender_Email="	  +value.sender_Email
//                                                         + "&sender_id="				+this.ReceverId,
//    type       : 	string  = "application/x-www-form-urlencoded; charset=UTF-8",
//      headers  : 	any 	= new Headers({ 'Content-Type': type}),
//      options  : 	any 	= new RequestOptions({headers : headers}),
//      url 	    : 	any 	= this.auth.baseUrl+"Mails/ManageMails.php";
//    this.http.post(url,body,options)
//    .subscribe((data)=>{
//      if (data.status ==200) {
//        this.navCtrl.pop();
//        this.loading.dismiss();
//      }
//      else{
//        console.log("something is wrong");
//      }
//    })
}
LoadingFUnction(){
  this.loading = this.laodCtrl.create({
    content: 'Loading ...',
    duration: 12000
  });
  this.loading.present();
}
}
