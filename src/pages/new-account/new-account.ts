import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AccountPage } from '../account/account';
import { AuthProvider } from '../../providers/auth/auth';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { Storage } from '@ionic/storage';
import { MapPikerPage } from '../map-piker/map-piker';
import { Events } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomencoderProvider } from '../../providers/customencoder/customencoder';
import { URLSearchParams } from '@angular/http';
@IonicPage()
@Component({
  selector: 'page-new-account',
  templateUrl: 'new-account.html',
})

export class NewAccountPage {
				ApiType 				: any;
			   	EnrtyOptions 			: boolean 	= false;
			   	responsData				: any;
			   	sms						: any;
				AccountName				: any; // 1
				ContanctPerson			: any; // 2
				ContanctNO				: any; // 3
				Website					: any; // 4
				Industry				: any; // 5
				Description				: any; // 6
				EmployeeNo				: any; // 7
				PickUpAddress			: any; // 9
				AccountID				: any; // 12
				SalePID					: any; // 13
				CorporateAddress		: any; // 14
				btnTitle				: any;
				pgTitle 				: any;
				ResponsData				: any;
				loading					: any;
				PickUpMapAdress			: any;
				CorportMapAddress  		: any;
				Restult1				: any;
				Restult2				: any;
				picklat					: number = 0;
				picklng					: number = 0;
				corlat					: number = 0;
				corlng					: number = 0;

				CorResponse				: any;
				PickResponse			: any;
				html					: any;

  constructor(
  				public 	navCtrl 		: NavController, 
				public 	navParams 		: NavParams,
				private storage			: Storage,
				private events			: Events,
				private sanitizer		: DomSanitizer,
				public 	alertCtrl		: AlertController,
				private auth 			: AuthProvider,  
				private cusencoder		: CustomencoderProvider,
				private eventdata		: EventDataProvider,
				public 	loadCtrl		: LoadingController,
  				public 	http 			: Http) {

  }

  ionViewDidLoad(){
	this.html = this.sanitizer.bypassSecurityTrustHtml('html code with css styling');
	this.events.subscribe('corport',() => {
		this.getMapLocationCorp();
	})
	this.events.subscribe('pickAdress',() => {
		this.getMapLocationPick();
	})
	  this.auth.GetStorageData().then((res)=>{
		  this.SalePID = res;
	  }).catch((err)=>{
		  console.log(err);
	  });
		  this.resetFields();

    if(this.navParams.get('a')){
    	this.EnrtyOptions				= false;
    	this.btnTitle 					= "Update";
		this.pgTitle 					= "Edit Account";
		let id = this.navParams.get('a');
		this.auth.getAccount(id).then((res)=>{
			this.newRecords(res);
			this.RetriveData();
		}).catch((err)=>{
			console.log(err);
		});
    } 
    else{
    	this.EnrtyOptions				= true;
      	this.btnTitle					= "Save";
		this.pgTitle 					= "New Account";
		this.RetriveData();
	}
  }
  
  getMapLocationCorp(){
			this.eventdata.getCurrentCorporatLocation('corport').then((res)=>{
				this.CorResponse = res;
				this.corlat = this.CorResponse.lat;
				this.corlng = this.CorResponse.lng;
			}).catch((er)=>{
				console.log(er);
			});
  }
  getMapLocationPick(){
			this.eventdata.getCurrentPickUplocation('pickAdress').then((res)=>{
				this.PickResponse = res;
				this.picklat = this.PickResponse.lat;
				this.picklng = this.PickResponse.lng;
			}).catch((er)=>{
				console.log(er);
			});
  }

  newRecords(items){
			this.AccountName			= items.accountName;
			this.AccountID				= items.account_id;
			this.ContanctPerson			= items.contact_person;
			this.ContanctNO				= items.phone;
			this.Website				= items.website;
			this.Industry				= items.industry;
			this.Description			= items.Description;
			this.EmployeeNo				= items.no_employee;
			this.CorporateAddress		= items.CorporateAddress;
			this.corlat					= items.CorporateLat;
			this.corlng					= items.CorporateLng;
			this.PickUpAddress			= items.deliveryPick_up_address;
			this.picklat				= items.PickaddressLat;
			this.picklng				= items.PickaddressLng;
  }
  	createNewEntry(
	  		AccountName,
	  		AccountID,
			ContanctPerson,
			ContanctNO,
			Website,
			Industry,
			Description,
			EmployeeNo,
			CorporateAddress,
			corlat,
			corlng,
			PickUpAddress,
			picklat,
			picklng
			)
	{
		this.LoadFunction();
		let params = new URLSearchParams('', new CustomencoderProvider());
			params.append('AccountName',AccountName);
			params.append('salep', this.SalePID);
			params.append('ContanctPerson',ContanctPerson);
			params.append('ContanctNO',ContanctNO);
			params.append('Website',Website);
			params.append('Industry',Industry);
			params.append('Description',Description);
			params.append('EmployeeNo', EmployeeNo);
			params.append('Corprateaddress',CorporateAddress);
			params.append('CorpratLat', corlat);
			params.append('CorpratLng',corlng);
			params.append('PickUpAddress', PickUpAddress);
			params.append('PickUpLat',picklat);
			params.append('PickUpLng',picklng);
	  	let body 		: 	string 		=	"key=NewEntry&"+params.toString(),
	  		 type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
	  		 headers 	: 	any 		= 	new Headers({ 'Content-Type': type}),
	  		 options 	: 	any 		= 	new RequestOptions({headers : headers}),
	  		 url 		: 	any 		= 	this.auth.baseUrl+"account/manageAccount.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe((data)=>{
	  		 	if (data.status == 200) {
					   this.navCtrl.setRoot(AccountPage);
					   this.loading.dismiss();
	  		 	}else{
	  		 		console.log("Please retry");
	  		 	}
	  		 },err=>{
	  		 	console.log("erorr");
	  		 })
	}
	UpdateEntery(
	  		AccountName,
	  		AccountID,
			ContanctPerson,
			ContanctNO,
			Website,
			Industry,
			Description,
			EmployeeNo,
			CorporateAddress,
			corlat,
			corlng,
			PickUpAddress,
			picklat,
			picklng
			)
		{
			this.LoadFunction();

			let params = new URLSearchParams('', new CustomencoderProvider());
			params.append('AccountName',AccountName);
			params.append('SalePserson', this.SalePID);
			params.append('id',AccountID)
			params.append('ContanctPerson',ContanctPerson);
			params.append('ContanctNO',ContanctNO);
			params.append('Website',Website);
			params.append('Industry',Industry);
			params.append('Description',Description);
			params.append('EmployeeNo', EmployeeNo);
			params.append('Corprateaddress',CorporateAddress);
			params.append('CorpratLat', corlat);
			params.append('CorpratLng',corlng);
			params.append('PickUpAddress', PickUpAddress);
			params.append('PickUpLat',picklat);
			params.append('PickUpLng',picklng);
			
			let body 		: 	string 		="key=update&"+params.toString(),
	  		 type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
	  		 headers 	: 	any 		= 	new Headers({ 'Content-Type': type}),
	  		 options 	: 	any 		= 	new RequestOptions({headers : headers}),
	  		 url 		: 	any 		= 	this.auth.baseUrl+"account/manageAccount.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe((data)=>{
	  		 	if (data.status == 200) {
					   this.events.publish('reloadAccoundPage');
						this.navCtrl.pop()
					   this.loading.dismiss();
	  		 	}else{
	  		 		console.log("Please retry");
	  		 	}
	  		 },err=>{
	  		 	console.log("erorr");
	  		 })
	  	}

	AddNewAccount()
		{
			let isAccountName				= this.AccountName;
			let isAccountID					= this.AccountID;
			let isContanctPerson			= this.ContanctPerson;
			let isContanctNO				= this.ContanctNO
			let isWebsite					= this.Website;
			let isIndustry					= this.Industry;
			let isDescription				= this.Description;
			let isEmployeeNo				= this.EmployeeNo;
			let iscorprateaddress			= this.CorporateAddress;
			let iscorlat					= this.corlat;
			let iscorlng					= this.corlng;
			let isPickUpAddress				= this.PickUpAddress;
			let ispicklat					= this.picklat;
			let ispicklng					= this.picklng
			if (this.EnrtyOptions){
				this.createNewEntry(
						isAccountName,
						isAccountID,
						isContanctPerson,
						isContanctNO,
						isWebsite,
						isIndustry,
						isDescription,
						isEmployeeNo,
						iscorprateaddress,
						iscorlat,
						iscorlng,
						isPickUpAddress,
						ispicklat,
						ispicklng
					);
			}else{
				this.UpdateEntery(
						isAccountName,
						isAccountID,
						isContanctPerson,
						isContanctNO,
						isWebsite,
						isIndustry,
						isDescription,
						isEmployeeNo,
						iscorprateaddress,
						iscorlat,
						iscorlng,
						isPickUpAddress,
						ispicklat,
						ispicklng
					);
			}
	   }
	RetriveData(){
		this.auth.GetStorageData().then((res)=>{
		this.http.get(this.auth.baseUrl+"contacts/retriveContact.php")
		.map(res => res.json())
		.subscribe(data => {
		this.ResponsData = JSON.parse(JSON.stringify(data));
		this.ResponsData = this.ResponsData.filter((users)=>{
				return users.saleP_username === res;
			});	
			});
		})
	}
   resetFields() : void
   {
		this.AccountName				= "";
		this.AccountID				    = "";
		this.ContanctPerson				= "";
		this.ContanctNO					= "";
		this.Website					= "";
		this.Industry					= "";
		this.Description				= "";
		this.EmployeeNo					= "";
		this.PickUpAddress				= "";
   }
LoadFunction(){
	this.loading = this.loadCtrl.create({
		content: 'Loading...',
		duration: 6000
	});
	this.loading.present();
	}

	SetMyLocation(){
		if (this.btnTitle ==='Save') {
			this.navCtrl.push(MapPikerPage,{lct:'corport',entry:'NewEntery'});
		} else {
				this.storage.get('corport').then((data)=>{
				if (data != null){
						this.storage.remove('corport').then(()=>{
							this.navCtrl.push(MapPikerPage,{lct:'corport',entry:'Update',lat:this.corlat,lng:this.corlng});
						});
					}else{
						this.navCtrl.push(MapPikerPage,{lct:'corport',entry:'Update',lat:this.corlat,lng:this.corlng});
					}
				})
		}
	}
	SetPickUpLocation(){
		if (this.btnTitle ==='Save') {
			this.navCtrl.push(MapPikerPage,{lct:'pickAdress',entry:'NewEntery'});
		} 
		else {
			this.storage.get('pickAdress').then((data)=>{
				if (data != null){
						this.storage.remove('pickAdress').then(()=>{
						this.navCtrl.push(MapPikerPage,{lct:'pickAdress',entry:'Update',lat:this.picklat,lng:this.picklng});
					});
				}else{
					this.navCtrl.push(MapPikerPage,{lct:'pickAdress',entry:'Update',lat:this.picklat,lng:this.picklng});
				}
			})
		}
	}
	  PopMe(){
		this.events.publish('reloadAccountdetails');
		this.navCtrl.pop();
	  }
}

