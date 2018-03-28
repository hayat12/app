import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController ,NavParams, ModalController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ContactPage } from '../contact/contact';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { MapPikerPage } from '../map-piker/map-piker';
import { Events } from 'ionic-angular';
import { CustomencoderProvider } from '../../providers/customencoder/customencoder';
import {URLSearchParams, QueryEncoder} from '@angular/http';
@IonicPage()
@Component({
  selector: 'page-new-contact',
  templateUrl: 'new-contact.html',
})
export class NewContactPage {
		EnrtyOptions						: boolean = true;
		mgdl								: boolean = false;
		Name								: any;
		AccountName							: any;
		ContactID							: any;
		Title								: any;
		Department							: any;
		PhoneNo								: any;
		MobileNo							: any;
		Email								: any;
		Address								: any;
		AccountID 							: any;
		ResponsData							: any;
		SaleP_username 						: any;
		btnTitle 							: any = 'Save';
		ContactData 						: any;
		loading 							: any;
		mapElement            				: any;
		map									: any;
		MapAdress							: any;
		
		lat									: number;
		lng									: number;
  constructor(
  	public navCtrl 							: NavController, 
		private http 						: Http,
		private events      				: Events,
		private storage						: Storage,
		public modalCtrl					: ModalController,
		public loadCtrl						: LoadingController,
		private auth 						: AuthProvider,
		private cusencoder					: CustomencoderProvider,
  	public navParams 				: NavParams) {
			setInterval(()=>{
				this.getLocation();
			},500);
  }

  ionViewDidLoad() {
	this.auth.GetStorageData().then((res)=>{
		this.SaleP_username = res;
	});
		this.RetriveData();
  	if (this.navParams.get('E')) {
		  this.SelectProms(this.navParams.get('E'));
		  this.btnTitle = "Update";
  	}else{
		  console.log("error");
	  }
  }

  SelectProms(value){
	  this.ContactData 			 	 	 = value;
		this.Name					 	 = value.name;
		this.SaleP_username		 	 	 = value.saleP_username,
		this.AccountName			 	 = value.accountName;
		this.AccountID				 	 = value.account_id;
		this.ContactID				 	 = value.contact_ID;
		this.Title						 = value.title;
		this.Department				 	 = value.department;
		this.PhoneNo					 = value.phone;
		this.Email						 = value.email,
		this.MobileNo					 = value.mobile;
		this.Address					 = value.address;
		this.lat						 = value.MapAddressLat;
		this.lng 						 = value.MapAddressLng;
	  }
	  
  	AddNewEntry(value){
			this.loadFunction();

				let params = new URLSearchParams('', new CustomencoderProvider());
				params.append('Name', this.Name);
				params.append('AccountName', this.AccountID);

				params.append('SaleP_username', this.SaleP_username);
				params.append('Title', this.Title);

				params.append('Department', this.Department);
				params.append('PhoneNo', this.PhoneNo);

				params.append('MobileNo', this.MobileNo);
				params.append('Email', this.Email);
				// params.append('MapAdressLat', this.Name);	// lat 
				// params.append('AccountName', this.AccountID); // lng 
				params.append('Address', this.Address);

  		let body				: 	string = "key=NewEntry&"+params.toString()
												+ "&MapAdressLat="+this.lat
												+ "&MapAdressLng="+this.lng,
			type        		: 	string  	= "application/x-www-form-urlencoded; charset=UTF-8",
			headers 			: 	any 		= new Headers({ 'Content-Type': type}),
			options 			: 	any 		= new RequestOptions({headers : headers}),
			url 				: 	any 		= this.auth.baseUrl+"contacts/manageContact.php";

	  	this.http.post(url,body,options)
	  	.subscribe((data)=>{
				this.navCtrl.setRoot(ContactPage);
				// REMOVE THE MAP STORAGE 
				this.storage.get('contactLocation').then((data)=>{
					if (data != null){
						this.storage.remove('contactLocation');
					}
				});
				this.loading.dismiss();
	  	},err=>{
	  	})
	  }
	UpdateContact(value){
		this.loadFunction();

		let params = new URLSearchParams('', new CustomencoderProvider());
		params.append('Name', this.Name);
		params.append('AccountName', this.AccountID);
		params.append('SaleP_username', this.SaleP_username);
		params.append('Title', this.Title);
		params.append('Department', this.Department);
		params.append('PhoneNo', this.PhoneNo);
		params.append('MobileNo', this.MobileNo);
		params.append('Email', this.Email);
		params.append('Address', this.Address);
		let body				: 	string = "key=Updatecontacts&id="+this.ContactID
												+ '&'+params.toString()
												+ "&MapAdressLat="+this.lat
												+ "&MapAdressLng="+this.lng,
			type        		: 	string  	= "application/x-www-form-urlencoded; charset=UTF-8",
			headers 			: 	any 		= new Headers({ 'Content-Type': type}),
			options 			: 	any 		= new RequestOptions({headers : headers}),
			url 				: 	any 		= this.auth.baseUrl+"contacts/manageContact.php";

		this.http.post(url,body,options)
		.subscribe((data)=>{
				this.storage.get('contactLocation').then((data)=>{
					if (data != null){
						this.storage.remove('contactLocation');
					}
				});
				this.PopMe();
			this.loading.dismiss();
		},err=>{
		})
	}

	AddNewContact(value){
		if(this.btnTitle ==='Update'){
			this.UpdateContact(value);
		}else{
			this.AddNewEntry(value);
		}
	}
	  RetriveData(){
		this.auth.GetStorageData().then((res)=>{
			this.auth.DisplayListOfAccounts(res).then((res)=>{
				this.ResponsData = res;
			}).catch((err)=>{
				console.log(err);
			});
		})
	}
	loadFunction(){
		this.loading = this.loadCtrl.create({
			content: 'Loading ...',
			duration: 6000
		})
		this.loading.present();
	}

	SetMyLocation(){
		this.storage.get('contactLocation').then((data)=>{
			if (data != null){
				this.storage.remove('contactLocation').then(()=>{
					this.navCtrl.push(MapPikerPage,{clt:'contactLocation',entry:'Update',lat:this.lat,lng:this.lng});
				});
			}else{
				this.navCtrl.push(MapPikerPage,{lct:'contactLocation',entry:'NewEntery',lat:this.lat,lng:this.lng});
			}
		})	
	}
	getLocation(){
		this.storage.get('contactLocation').then((data)=>{
			if (data != null){
				this.lat = data.lat;
				this.lng = data.lng;
			}
	});
	}

  PopMe(){
    this.events.publish('reloadDetails');
      this.navCtrl.pop();
  }

}
