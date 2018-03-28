import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NewContactPage } from '../new-contact/new-contact';
import { ContactPage } from '../contact/contact';
import { AuthProvider } from '../../providers/auth/auth';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { SetMyLocationPage } from '../set-my-location/set-my-location';
import { Events } from 'ionic-angular';
import { MyEmailPage } from '../my-email/my-email';
@IonicPage()
@Component({
  selector: 'page-contact-person',
  templateUrl: 'contact-person.html',
})
export class ContactPersonPage {
				ContactDetails				: boolean = true;
				Calls									: boolean = false;
				Mails									: boolean = false;
				mycontact							: any;
				receiver_id 					: any;
				receiver_Email 				: any;
				Mail									: any;
				sender_Email					: any;
				sender_id							: any;
				ContactPerson					: any;
				loading								: any;
				Restult								: any;
		
				mpName    						: any;
				mpPostCode    				: any;
				mpArea    						: any;
				mpPlocality    				: any;
				mpsubLocality					: any;
				mpfare    						: any;
				mpsubfare  						: any;
				mpsubArea							: any;
				// reloadDetails
  constructor(
  			public navCtrl 					: NavController, 
				private http 						: Http,
				private events      		: Events,
				private nativeGeocoder  : NativeGeocoder,
				public loadCtrl					: LoadingController,
				public alertCtrl				: AlertController,
				private auth						: AuthProvider,  
  				public navParams  		: NavParams) {
  }
 
  ionViewDidLoad() {
		this.events.subscribe('reloadDetails',() => {

		});
  	// this.ContactDetailsFc();
    if (this.navParams.get('P')) {
		this.LoadingFunction();
		let id = this.navParams.get('P');
		this.getGeoCoderCorport(id);
			this.selectData(id.contact_ID);
			
			this.events.subscribe('reloadDetails',() => {
				// IF THE PAGE HAS POPPED THE FUNCTION IS GOING TO RELAOD THE PAGE 
				this.LoadingFunction();
				let id = this.navParams.get('P');
				this.getGeoCoderCorport(id);
					this.selectData(id.contact_ID);
			});

    }else if(this.navParams.get('HomeP')){
		this.LoadingFunction();
		this.selectData(this.navParams.get('HomeP'));
    }
    else{
    	console.log("No");
    }
  }
	selectData(val){
		this.ContactPerson 		= val.contact_person;
		this.receiver_Email 			= val.email;
		this.receiver_id				= val.contact_ID;
		this.GetContactPData(val);
	}
	GetContactPData(v){
		this.auth.getRespectiveContactspDetails(v).then((resp)=>{
			this.mycontact = resp;
			this.loading.dismiss();
		}).catch((err)=>{
			console.log(err);
		});
	}
	MailsFc(e){
		this.navCtrl.push(MyEmailPage,e);
		console.log(e);
		// this.Mails  				= true;
		// this.ContactDetails			= false;
	}
	PhoneCall(value)
	{
		let sender_id = value.saleP_username;
		let receiver_id = value.contact_ID;
		let receiver_no = value.phone;
		let recivername = value.name;
		let calltype = "PhoneNo";

		let body 	: string 	="key=PhoneCall&sender_id="+sender_id
								+"&receiver_id="+receiver_id
								+"&reciverName="+recivername
								+"&receiver_no="+receiver_no
								+"&calltype="+calltype,
		type       : 	string  = "application/x-www-form-urlencoded; charset=UTF-8",
		headers    : 	any 	= new Headers({ 'Content-Type': type}),
		options    : 	any 	= new RequestOptions({headers : headers}),
		url 	   : 	any 	= this.auth.baseUrl+"Calls/ManageCalls.php";
		this.http.post(url,body,options).subscribe((res)=>{
			if(res.status ==200){
				console.log(res);
			}
		});
	}
	MobileCall(value)
	{
		let sender_id = value.saleP_username;
		let receiver_id = value.contact_ID;
		let receiver_no = value.phone;
		let recivername = value.name;
		let calltype = "MobileNo";

		let body 	: string 	="key=MobileCall&sender_id="+sender_id
								+"&receiver_id="+receiver_id
								+"&reciverName="+recivername
								+"&receiver_no="+receiver_no
								+"&calltype="+calltype,
		type       : 	string  = "application/x-www-form-urlencoded; charset=UTF-8",
		headers    : 	any 	= new Headers({ 'Content-Type': type}),
		options    : 	any 	= new RequestOptions({headers : headers}),
		url 	   : 	any 	= this.auth.baseUrl+"Calls/ManageCalls.php";
		this.http.post(url,body,options).subscribe((res)=>{
			if(res.status ==200){
				console.log(res);
			}
		});
	}

	ManageContactP(id){
		let alert = this.alertCtrl.create({
			title: 'Manage your Account',
			buttons: 
			[ 
				{
					text: 'Edit',
					handler: data=>{
						this.EidtPerson(id);
					}
				},
				{
					text: 'Delete',
					handler: data=>{
						this.DeletePerson(id);
					}
				},
				{
					text: 'Cancel',
					handler: data=>{
						
					}
				}
			]
		});
		alert.present();
	}
 
	DeletePerson(val){
		let personId = val.contact_ID;
		let body       :   string 	= "key=DeletePerson&personId="+personId,
			type       : 	string  = "application/x-www-form-urlencoded; charset=UTF-8",
	  		headers    : 	any 	= new Headers({ 'Content-Type': type}),
	  		options    : 	any 	= new RequestOptions({headers : headers}),
	  		url 	   : 	any 	= this.auth.baseUrl+"contacts/manageContact.php";
	  	this.http.post(url,body,options)
	  	.subscribe((data)=>{
	  		if (data.status ==200) {
	  			this.navCtrl.setRoot(ContactPage);
	  		}
	  		else{
	  			console.log("something is wrong");
	  		}
	  	})
	}
	EidtPerson(editP){
		this.navCtrl.push(NewContactPage,{'E':editP});
	}

	LoadingFunction(){
		this.loading = this.loadCtrl.create({
			content: 'Loading ...',
			duration: 6000
		});
		this.loading.present();
	}

	getGeoCoderCorport(e){
		this.nativeGeocoder.reverseGeocode(e.MapAddressLat,e.MapAddressLng)
		.then((result: NativeGeocoderReverseResult) =>{

		  if (result.countryName != undefined) {
			this.mpName = result.countryName;
		  }
		  if(result.postalCode != undefined) {
			this.mpPostCode = result.postalCode;
		  }
		  if(result.administrativeArea != undefined) {
			this.mpArea = result.administrativeArea;
		  }
		  if(result.locality != undefined) {
			this.mpPlocality = result.locality;
		  }
		  if(result.subLocality != undefined) {
			this.mpsubLocality = result.subLocality;
		  }
		  if(result.thoroughfare != undefined) {
			this.mpfare = result.thoroughfare;
		  }if(result.subThoroughfare != undefined) {
			this.mpsubfare = result.subThoroughfare;
		  }
		  if (result.subAdministrativeArea != undefined) {
			this.mpsubArea = result.subAdministrativeArea;
		  }
		
		  this.loading.dismiss();
		}).catch((error: any) => console.log(error));
	  this.nativeGeocoder.forwardGeocode('Berlin')
		.then((coordinates: NativeGeocoderForwardResult) => console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude))
		.catch((error: any) => console.log(error));
	  }
	  
	  OpenMyLocation(e){
		  let lat = e.MapAddressLat;
		  let lng = e.MapAddressLng;
		  this.navCtrl.push(SetMyLocationPage,{'lat':lat,'lng':lng});
	  }
}
