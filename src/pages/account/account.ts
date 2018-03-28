import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NewAccountPage } from '../new-account/new-account';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { Events } from 'ionic-angular';
import { RespectiveAccountPage } from '../respective-account/respective-account';


@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

      viewAccount 						   : any;
      public myaccountDetails		 : boolean = false;
      public FooterBtn					 : boolean = false;
      public accountList				 : boolean = true;
      ContactP                   : any;

  constructor(
  		public navCtrl 					   : NavController, 
      public NP 						     : NavParams,
      private event              : Events,
      private auth               : AuthProvider,
  		public http 					     : Http) {
  }

  ionViewDidLoad(){
    this.auth.GetStorageData().then((data)=>{
      if(data!=null){
          this.displayAccount(data);   
          this.event.subscribe('reloadAccoundPage',()=>{
            console.log('loaded account page');
            this.displayAccount(data); 
          });
      }else{
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

  displayAccount(v){
    this.auth.DisplayListOfAccounts(v).then((data)=>{
      this.viewAccount 		    = data;
    }).catch((err)=>{
      console.log(err);
    });
  }
  VeiwAccountDetails(act){  	
   this.navCtrl.push(RespectiveAccountPage, act);
}

DeleteItem(prams){
   let id = prams.deleteItem.account_id;

    let body         :   string      = "key=DeleteItem&id=" +id,
        type         :   string      =   "application/x-www-form-urlencoded; charset=UTF-8",
        headers      :   any         =   new Headers({ 'Content-Type': type}),
        options      :   any         =   new RequestOptions({headers : headers}),
        url          :   any         =   this.auth.baseUrl+"account/manageAccount.php";
         this.http.post(url,body,options)
         .subscribe((data)=>{
          if (data.status == 200) {
              this.navCtrl.setRoot(AccountPage);
          }else{
            console.log("Please retry");
          }
         },err=>{
          console.log("erorr");
         });
}

EidtItem(editItem){
    this.navCtrl.push(NewAccountPage, editItem);
  }

AddnewAcount(){
  this.navCtrl.push(NewAccountPage);
}
SetAccount(){
  this.navCtrl.setRoot(AccountPage);
}
}