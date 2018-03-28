import { Component } from '@angular/core';
import { NavController , Platform, LoadingController,ModalController} from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthProvider } from '../../providers/auth/auth';
import { ContactPersonPage } from '../contact-person/contact-person';
import { LoginPage } from '../login/login';
import { NewEventPage } from '../new-event/new-event';
import { Events } from 'ionic-angular';
import { NotConnectionPage } from '../not-connection/not-connection';
import { EventDataProvider } from '../../providers/event-data/event-data';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
		Task_ResponsData 				: any;
		Even_ResponsData 				: any;
		currentdateTime					: any;
		totalNoOfOpportunities	: any;
		OpenNoOpportunity				: any;
		ClosedNoOfOpportunity		: any;
		total     							= Array;
		mylocations 						: any;
		loading									: any;
		myfinal 								: any;

  constructor(
  	public navCtrl 					: NavController,
		public modalCtrl				: ModalController,
		private loadCtrl 				: LoadingController,
		public platform 				: Platform,
		public eventsdata				: Events,
		private events					: EventDataProvider,
		private auth 						: AuthProvider,
  	public http 						: Http) {

  }

	ionViewDidLoad() {
		this.WatchInternetConnection();
		this.auth.GetStorageData().then((data)=>{
			this.LoadingFunction();
			if(data != null){
				this.ReadyPlatForm(data);
			}
			else{
				this.navCtrl.setRoot(LoginPage);
			}
		});
		}
		
		WatchInternetConnection(){
			this.events.ValidateConection().then((e)=>{
				if (e != true) {
					this.navCtrl.setRoot(NotConnectionPage);
				}
			}).catch((er)=>{
				alert(JSON.stringify(er));
			});
		}

	  ReadyPlatForm(data){
		  this.platform.ready().then((res)=>{
			this.getTask(data,{type:"upcoming"});
			this.GetEvent(data,{type:"upcoming"});
			this.CountOpportunity(data,{type:"CountOpportunity"});
			this.CountCloseOpportunity(data,{type:"CountCloseOpportunity"});
			this.CountOpenOpportunity(data,{type:"CountOpenOpportunity"});
		  });
	  }
	  ToContatcP(conp){
		let navevalue = {HomeP:conp.contact_person};
	  	this.navCtrl.push(ContactPersonPage,navevalue);
	  }
	  ToContatcP1(conp){
		let navevalue = {HomeP:conp.contactPerson};
	  	this.navCtrl.push(ContactPersonPage,navevalue);
	  }

	CountOpportunity(data,type){
		this.auth.CountOpportunity(data,type).then((res)=>{
			let count = Object.keys(res).length;
			this.totalNoOfOpportunities = count;
		});
	}
	CountCloseOpportunity(data,type){
		this.auth.CountOpportunity(data,type).then((res)=>{
			let count = Object.keys(res).length;
			this.ClosedNoOfOpportunity = count;
		});
	}
	CountOpenOpportunity(data,type){
		this.auth.CountOpportunity(data,type).then((res)=>{
			let count = Object.keys(res).length;
			this.OpenNoOpportunity = count;
		});
	}

  getTask(data,type){
	this.auth.GetTastForHome(data,type).then((res)=>{
		this.Task_ResponsData = res;
	});
  }
  GetEvent(data,type){
	this.auth.GetEventForHome(data,type).then((res)=>{
		 this.Even_ResponsData = res;
		 this.loading.dismiss();
	});	
	}
	
	LoadingFunction(){
		this.loading = this.loadCtrl.create({
			content: "Loading...",
			duration: 6000
		});
		this.loading.present();
	}

	ToNewEvent(){
		this.navCtrl.push(NewEventPage);
	}
}
