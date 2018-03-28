import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthProvider } from '../../providers/auth/auth';
import { NewAccountPage } from '../new-account/new-account';
import { AccountPage } from '../account/account';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { SetMyLocationPage } from '../set-my-location/set-my-location';
import { Events } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-respective-account',
  templateUrl: 'respective-account.html',
})
export class RespectiveAccountPage {
  viewAccount               : any;
  AccountName				        : any; // 1
  ContanctPerson		        : any; // 2
  ContanctNO				        : any; // 3
  Website					          : any; // 4
  Industry				          : any; // 5
  Description				        : any; // 6
  EmployeeNo				        : any; // 7
  Address					          : any; // 8
  PickUpAddress			        : any; // 9
  ListOfExistingSales		    : any; // 10
  AddressOfCompany		      : any; // 11
  AccountID				          : any; // 12
  opportunityStage		      : any; // 13
  CorporateAddress          : any;
  ResponsData				        : any;
  load                      : any;
  AccountData               : any;
  OpportunityName           : any;
  CorportRestult            : any;
  PickRestult               : any;


  pickmpName                : any;
  pickmpPostCode            : any;
  pickmpArea                : any;
  pickmpPlocality           : any;
  pickmpsubLocality         : any;
  pickmpfare                : any;
  pickmpsubfare             : any;
  pickmpsubArea             : any;

  cormpName                : any;
  cormpPostCode            : any;
  cormpArea                : any;
  cormpPlocality           : any;
  cormpsubLocality         : any;
  cormpfare                : any;
  cormpsubfare             : any;
  cormpsubArea             : any;

  constructor(
      public navCtrl        : NavController,
      private http          : Http,
      private events        : Events,
      public loadingCtrl    : ToastController,
      public alert          : AlertController,
      public loading        : LoadingController,
      private auth          : AuthProvider,
      private nativeGeocoder: NativeGeocoder,
      public navParams      : NavParams) {
  }
  ionViewDidLoad() {
    this.events.subscribe('reloadAccoundPage',() => {
      this.getAccount(this.navParams.get('a'));
      // this.VeiwAccountDetails(this.navParams.get('a'));
      });

      // this.VeiwAccountDetails(this.navParams.get('a'));
      this.AccountData = this.navParams.get('a');
      this.getAccount(this.navParams.get('a'));
  }


  getAccount(id){
    this.auth.getAccount(id.account_id).then((data)=>{
      console.log(data);
      this.VeiwAccountDetails(data);
    }).catch((er)=>{
      console.log(er);
    });
  }
  VeiwAccountDetails(value){
     this.AccountName         = value.accountName;
     this.ContanctPerson      = value.contact_person;
     this.ContanctNO          =  value.phone;
     this.AccountID           = value.account_id;
     this.Website             =  value.website;
     this.Industry            =  value.industry;
     this.Description         =  value.Description;
     this.EmployeeNo          =  value.no_employee;
     this.AddressOfCompany    =  value.corporatAddress;
     this.PickUpAddress       =  value.deliveryPick_up_address;
     this.ListOfExistingSales =  value.ListOfExistSale;
     this.opportunityStage    =  value.ListOf_oppo_stage;
     this.CorporateAddress    = value.CorporateAddress;
     this.getOpportunityForAccount(this.AccountID);
     this.getGeoCoderCorport(value);
     this.getGeoCoderPick(value);
 }

 manageAccountOptions(){
   let alert = this.alert.create({
     subTitle: 'Edit or Delete '+ this.AccountName,
     buttons : 
     [
        { text: 'Delete',
          handler: data=>{
            this.deleteConfirmations();
        }},
        {
          text:'Edit',
          handler: data=>{
          this.EditAccount();
          }
        },
        {
          text:'Cancel',
          handler: data=>{
          alert.dismiss;
          }
        }
     ]
   });
   alert.present();
 }
 getOpportunityForAccount(id){
  this.auth.GetOpportuniyForAccountDetails(id)
  .then((res)=>{
    this.OpportunityName = res[0].opportunity_name;
    this.opportunityStage = res[0].opportunity_stage;
  })
  .catch((err)=>{

  });
 }
 deleteConfirmations(){
  let alert = this.alert.create({
    title: 'Delete',
    subTitle: ' Are you sure you want to delete? '+ this.AccountName,
    buttons : 
    [
       {
         text:'Cancel',
         handler: data=>{
         alert.dismiss;
         }
       },
       { text: 'Delete',
       handler: data=>{
         this.DeleteAccount();
     }}
    ]
  });
  alert.present();
 }
 DeleteAccount(){
  this.Loader();
  return new Promise((resolve, reject) => {
    let body 		   : 	string 		=	"key=DeleteItem"+"&id=" +this.AccountID,
        type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
        headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
        options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
        url 		   : 	any 		  = 	this.auth.baseUrl+"account/manageAccount.php";
       this.http.post(url,body,options)
       .subscribe(res => {
          this.presentLoadingCustom();
          this.navCtrl.setRoot(AccountPage);
             this.load.dismiss();
          }, (err) => {
            reject(err);
          });
}); 
 }
 EditAccount(){
  this.navCtrl.push(NewAccountPage,{'a':this.AccountID});
 }

 Loader(){
  this.load = this.loading.create({
     content: 'Loading...',
     duration: 6000
   });
   this.load.present();
 }
 
 presentLoadingCustom() {
  const toaster = this.loadingCtrl.create({
    message:'Successfully deleted',
    duration: 2000
  });

  toaster.onDidDismiss(() => {
    console.log('Dismissed loading');
  });
  toaster.present();
}
  getGeoCoderCorport(e){
		this.nativeGeocoder.reverseGeocode(e.CorporateLat,e.CorporateLng)
		.then((result: NativeGeocoderReverseResult) =>{
      if (result.countryName != undefined) {
        this.pickmpName = result.countryName+',';
        }
        if(result.postalCode != undefined) {
        this.pickmpPostCode = result.postalCode+',';
        }
        if(result.administrativeArea != undefined) {
        this.pickmpArea = result.administrativeArea+',';
        }
        if(result.locality != undefined) {
        this.pickmpPlocality = result.locality+',';
        }
        if(result.subLocality != undefined) {
        this.pickmpsubLocality = result.subLocality+',';
        }
        if(result.thoroughfare != undefined) {
        this.pickmpfare = result.thoroughfare+',';
        }
        if(result.subThoroughfare != undefined) {
        this.pickmpsubfare = result.subThoroughfare+',';
        }
        if (result.subAdministrativeArea != undefined) {
        this.pickmpsubArea = result.subAdministrativeArea;
        }


		}).catch((error: any) => console.log(error));
	  this.nativeGeocoder.forwardGeocode('Berlin')
		.then((coordinates: NativeGeocoderForwardResult) => console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude))
		.catch((error: any) => console.log(error));
    }
    

  getGeoCoderPick(e){
		this.nativeGeocoder.reverseGeocode(e.PickaddressLat,e.PickaddressLng)
		.then((result: NativeGeocoderReverseResult) =>{

      if (result.countryName != undefined) {
        this.cormpName = result.countryName+',';
        }
        if(result.postalCode != undefined) {
        this.cormpPostCode = result.postalCode+',';
        }
        if(result.administrativeArea != undefined) {
        this.cormpArea = result.administrativeArea+',';
        }
        if(result.locality != undefined) {
        this.cormpPlocality = result.locality+',';
        }
        if(result.subLocality != undefined) {
        this.cormpsubLocality = result.subLocality+',';
        }
        if(result.thoroughfare != undefined) {
        this.cormpfare = result.thoroughfare+',';
        }if(result.subThoroughfare != undefined) {
        this.cormpsubfare = result.subThoroughfare+',';
        }
        if (result.subAdministrativeArea != undefined) {
        this.cormpsubArea = result.subAdministrativeArea;
        }

		}).catch((error: any) => console.log(error));
	  this.nativeGeocoder.forwardGeocode('Berlin')
		.then((coordinates: NativeGeocoderForwardResult) => console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude))
		.catch((error: any) => console.log(error));
	  }
    MyCorLocation(){
        let lat = this.AccountData.CorporateLat;
        let lng = this.AccountData.CorporateLng;
        this.navCtrl.push(SetMyLocationPage,{'lat':lat,'lng':lng});
    }
    MyPickLocation(){
        let lat = this.AccountData.PickaddressLat;
        let lng = this.AccountData.PickaddressLng;
        this.navCtrl.push(SetMyLocationPage,{'lat':lat,'lng':lng});
      }
}
