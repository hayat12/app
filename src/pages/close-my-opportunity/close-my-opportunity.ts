import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-close-my-opportunity',
  templateUrl: 'close-my-opportunity.html',
})
export class CloseMyOpportunityPage {
  NextStage                 : boolean = true;
  CloseOpportunity          : boolean = false;
  private auth              : AuthProvider;
  Stages                    : any;
  public opportuniyid       : any;
  public sessionid          : any;
  public opportunityStage   : any;
  public result             : any;

// http://110.4.41.78/sales/
  constructor
  (
    public navCtrl    : NavController,
    private http      : Http,
    private storage   : Storage,
    public navParams  : NavParams
  ){
    
  }

  ionViewDidLoad() {
    this.CreatNewEvent();
    this.sessionid        = this.navParams.get('sessionid');
    this.opportuniyid     = this.navParams.get('oppoid');
    this.opportunityStage = this.navParams.get("stage");
    this.getTheResult(this.opportuniyid,this.sessionid);
    this.storage.set('setCurrentStage',this.opportunityStage);
  }

  getTheResult(id,username){
    this.getOpportunity(id,username)
    .then((resp)=>{
        this.result = resp;        
      })
    .catch((err)=>{
        console.log(err);
    });
  }
  getOpportunity(id,username){
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key=displayOpportunityForStage&oppoid=" +id
                                  + "&username=" +username,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.auth.baseUrl+"Opportunity/retriveOppo.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
              resolve(res.json());
            }, (err) => {
              reject(err);
            });
	    });
  } 

  CreatNewEvent(){
    this.NextStage                 = true;
    this.CloseOpportunity          = false;
    this.storage.get('setCurrentStage')
    .then((res)=>{
      if(res === this.opportunityStage){
        alert('You did not change the stage');
      }else{
        this.changeStage();
      }
    }).catch((err)=>{});
  }
  changeStage(){
    this.AddNewStage();
    this.AddPresviousStage();
  }
  AddNewStage(){
    this.AddPresviousStage();
  }
  AddPresviousStage(){
    this.AddPrevious(this.result).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    });
  }
  AddPrevious(v){
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key=displayOpportunityForStage&oppoid="+''
                                  + "&username=",
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.auth.baseUrl+'Opportunity/retriveOppo.php';
         this.http.post(url,body,options)
         .subscribe(res => {
              resolve(res.json());
            }, (err) =>{
              reject(err);
          });
      });
    }
  CloseOpportunities(){
    this.NextStage              = false;
    this.CloseOpportunity       = true;
  }
}
