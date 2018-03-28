import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ContactPersonPage } from '../contact-person/contact-person';
import { Http } from '@angular/http';
import { NewContactPage } from '../new-contact/new-contact';
import 'rxjs/add/operator/map';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { SetMyLocationPage } from '../set-my-location/set-my-location';
import { Modal } from 'ionic-angular/components/modal/modal';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  managecon                     : boolean = true;
  contit                        : boolean = false;
  mycontact							        : any;
  contactsList                  : boolean = true;
  callList                      : boolean = false;
  mailList                      : boolean = false;
  btnValue                      : any;
  calledResponse                : any;
  mailedResponse                : any;
  Accounts                      : any;
  AccountsList                  : any;
  accountId                     : any;
  data = Array();

  searchQuery: string = '';
  items: string[];

  constructor(	
  		public navCtrl 					   : NavController, 
      public navParams 				   : NavParams,
      public modalCrtl           : ModalController,
      private auth               : AuthProvider,
  		public http 					     : Http) {
  }
  ionViewDidLoad() {
    this.auth.GetStorageData().then((data)=>{
      if(data!=null){
        this.DisPlayAccount(data);
      }else{
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }
  DisPlayAccount(ID){
    this.auth.getGroupedAccount(ID).then((res)=>{
        this.Accounts = res;
    }).catch((err)=>{
      console.log(err);
    });
  }
  // ValidateGroup(e){
  //   this.auth.displayListOfContactsForTesting(e).then((resp)=>{
  //   }).catch((err)=>{
  //     console.log(err);
  //   });
  // }
	displayContacts(v){
    this.auth.displayListOfContactsForGroups(v).then((resp)=>{
      this.mycontact = resp;
    }).catch((err)=>{
      console.log(err);
    });    
  }

  ToContactPerson(conP){
  let navevalue = {P:conP};
  this.navCtrl.push(ContactPersonPage,navevalue);
}
AddNewContact(){
  this.navCtrl.push(NewContactPage);
}
getdata(){
		const mymodal: Modal = this.modalCrtl.create(SetMyLocationPage);
		mymodal.present();
		 mymodal.onDidDismiss((data)=>{
			console.log(data);
		})
}
}
