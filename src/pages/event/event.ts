import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Events } from 'ionic-angular';
import { CustomencoderProvider } from '../../providers/customencoder/customencoder';
import { URLSearchParams } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

	CreatEvent							: boolean = true;
	CreatTask							: boolean = false;
	pTitle								: any = "Create Event";
	public oppo_id						: any;
	public stage_id						: any;
	ContactPerson						: any;
	public sessionID					: any;
	AccountName 						: any;
	OpportunityName 					: any;
	loading								: any;
	Response							: any;
	public contactPersonName			: any;
	public contactPersonid				: any;

	Subject  							: any;      
	Description 						: any;  
	StartEvent 							: any; 
	EndEvent 							: any;
	Location							: any;
	Eventid								: any;
	Taskid								: any;

	Subject_tsk							: any;
	DueDate_tsk							: any;

	// just save the data in the local storage until the process is complate 
	// once the proccess complese will be upload to the sever
	tampData							: any;
	ContactPerson_tsk					: any;
	currentStage						: any;

  constructor(
			  public navCtrl			: NavController,
			  private events      		: Events,
			  public alertCtrl			: AlertController,
			  private loadCtrl			: LoadingController,
			  private auth				: AuthProvider,
			  private cusencoder		: CustomencoderProvider,
			  public navParams			: NavParams) {
  }

ionViewDidLoad() {
	this.auth.GetStorageData().then((session)=>{
		if(session !=null){

			if (this.navParams.get('EntryType') ==='updateEvent') {
				this.pTitle		=	"Update Event";
				this.CreatEvent = true;
				this.CreatTask	= false;

				let oppoid 		= this.navParams.get('oppoid');
				let mydata 		= this.navParams.get('data');
				this.stage_id 	= this.navParams.get('stageid');
				this.sessionID 	= mydata.SaleP_username;
				this.Eventid 	= mydata.id;
				this.setEventCurrntValus(mydata,oppoid);
			}
			else if(this.navParams.get('Toevent')){
				this.sessionID 	= session;
				this.stage_id 	= this.navParams.get('stageid');
				this.oppo_id 	=  this.navParams.get('oppoid');
				this.pTitle		=	"Create Event";
				this.CreatEvent = true;
				this.CreatTask	= false;
				this.getOpportunity(this.oppo_id);
			}
			else if (this.navParams.get('EntryType') ==='updateTask') {
				this.CreatEvent = false;
				this.CreatTask	= true;
				this.pTitle		= "Update Task";
				let oppoid 		= this.navParams.get('oppoid');
				let mydata 		= this.navParams.get('data');
				this.sessionID 	= mydata.saleP_username;
				this.Taskid     = mydata.id;
				this.setTaskCurrntValus(mydata,oppoid);
			}
			else if(this.navParams.get('Totask')){
				this.CreatEvent = false;
				this.CreatTask	= true;
				this.sessionID 	= session;
				this.pTitle		= "Create Task";
				this.stage_id 	= this.navParams.get('stageid');
				this.oppo_id 	=  this.navParams.get('oppoid');
				this.getOpportunity(this.oppo_id);
			}else{
				console.log('Not Select');
			}
		}
	});
}
setEventCurrntValus(mydata,oppoid){
	this.Subject = mydata.subject;
	this.Description = mydata.event_disc;
	this.StartEvent = mydata.event_start;
	this.EndEvent = mydata.event_end;
	this.Location  = mydata.location;
	this.contactPersonid = mydata.contact_person;
	console.log(this.contactPersonid);
}
setTaskCurrntValus(mydata,oppoid){
	this.Subject_tsk = mydata.subject;
	this.DueDate_tsk = mydata.dueDate;
}
getOpportunity(oppoid){
	this.auth.setOpportunity(oppoid).then((res)=>{
	this. getContactPerson(res);
	}).catch((er)=>{
		console.log(er);
	});
}
  getContactPerson(e){
	this.ContactPerson 		= e[0].contact_person;
	this.contactPersonid 	= e[0].contact_person;
	this.AccountName 		= e[0].account_name;
	this.currentStage 		= e[0].opportunity_stage;
	this.oppo_id 			= e[0].oppor_id;

	this.auth.getRespectiveContactsp(this.ContactPerson)
	.then((resp)=>{
		this.contactPersonName = resp[0].name;
	})
	.catch((err)=>{
		console.log(err);
	});
  }
getStage(id,stage){
	this.auth.ValidateStage(id,stage).then((resp)=>{
		this.stage_id = resp[0].id;
	}).catch((err)=>{
		console.log(err);
	});
}
CreatNewEvent(val){
	if (this.navParams.get('EntryType') ==='updateEvent') {
		this.UpdateEvent(val);

	} else if (this.navParams.get('Toevent')){
		this.CreatEventEnrty(val)
	}
	else{
		alert('None ');
	}
	}

	CreatEventEnrty(val){
	this.Loadar();
	// this.tampData = JSON.stringify({
	// 	Description		: ,
	// 	stage_id		: ,
	// 	EndEvent		: val.EndEvent,
	// 	location		: val.Location,
	// 	StartEvent		: val.StartEvent,
	// 	Subject			:val.Subject,
	// 	contact_person	: this.contactPersonid
	// 	});

	let params = new URLSearchParams('', new CustomencoderProvider());
		params.append('username',this.sessionID);
		params.append('Description',val.Description);
		params.append('stage',this.stage_id);
		params.append('EndEvent',val.EndEvent);
		params.append('location',val.Location);
		params.append('StartEvent',val.StartEvent);
		params.append('Subject',val.Subject);
		params.append('ContactPerson',this.contactPersonid);

		this.auth.CreateEvent(params.toString(),'NewEntry')
		.then((complate)=>{
			this.PopMe()
			this.loading.dismiss();
		});
	}
	UpdateEvent(val){
		this.Loadar();
	this.tampData = JSON.stringify({
		Description		: val.Description,
		stage_id		: this.Eventid,
		EndEvent		: val.EndEvent,
		location		: val.Location,
		StartEvent		: val.StartEvent,
		Subject			: val.Subject,
		contact_person	: this.contactPersonid
		});

	let params = new URLSearchParams('', new CustomencoderProvider());
		params.append('username',this.sessionID);
		params.append('Description',val.Description);
		params.append('stage',this.Eventid);
		params.append('EndEvent',val.EndEvent);
		params.append('location',val.Location);
		params.append('StartEvent',val.StartEvent);
		params.append('Subject',val.Subject);
		params.append('contact_person',this.contactPersonid);

		
		this.auth.CreateEvent(params.toString(),'UpdateTask')
		.then((complate)=>{
			this.PopMe()
			this.loading.dismiss();
		});
	}

CreatNewTask(la){	
	if (this.navParams.get('EntryType') ==='updateTask'){
		this.UpdateTask(la);
	}
	else if (this.navParams.get('Totask')){
		this.CreateTaskEntry(la);
	}
	else{
		alert('None ');
	}
}
	CreateTaskEntry(la){
	this.Loadar();
	let params = new URLSearchParams('', new CustomencoderProvider());
		params.append('username',this.sessionID);
		params.append('Subject_tsk',la.Subject_tsk);
		params.append('stage',this.stage_id);
		params.append('DueDate_tsk',la.DueDate_tsk);
		params.append('ContactPerson_tsk',this.contactPersonid);


		this.auth.CreateTask(params.toString(),'NewEntry').then((complated)=>{
			this.PopMe()	
			this.loading.dismiss();			
		});
	}
	UpdateTask(la){
		this.Loadar();
		// this.tampData = JSON.stringify({
		// 		stage_id		: this.Taskid,
		// 		Subject_tsk		: la.Subject_tsk,
		// 		DueDate_tsk		: la.DueDate_tsk,
		// 		contact_person	: this.contactPersonid
		// 	});
			let params = new URLSearchParams('', new CustomencoderProvider());
			params.append('username',this.sessionID);
			params.append('Subject_tsk',la.Subject_tsk);
			params.append('stage',this.Taskid);
			params.append('DueDate_tsk',la.DueDate_tsk);
			this.auth.CreateTask(params.toString(),'UpdateTask').then((complated)=>{
				this.PopMe()	
				this.loading.dismiss();			
			});
	}

	Loadar(){
		this.loading = this.loadCtrl.create({
			content: "Loading ...",
			duration: 6000
		});
		this.loading.present();
	}

	PopMe(){
		this.events.publish('EventsAndTaskDetails');
		  this.navCtrl.pop();
	  }
}
