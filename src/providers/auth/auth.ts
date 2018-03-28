import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthProvider {
  // http://110.4.41.78/sales/
               public baseUrl                : any = "http://110.4.41.78/sales/";
                currentUser                  : any;
                loading                      : any;
                local                        : any;
                mydetail                     : any;
                eventdata                    : any;
                forgotpasscridencial         : any;
  constructor(  public http 			           : Http,
                public toastCtrl             : ToastController,
                private storage              : Storage,
                public loadCtrl              : LoadingController,
                public alertCtrl             : AlertController) {
  }
 
  public mylogin(flog) {
    let username = flog.username;
    let password = flog.password;
    return new Promise((resolve, reject) => {
	  	let body 		   : 	string 		=	"username="	 +username
	  										          + "&password=" +password,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"login.php";
	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	    });
  }

Register(formdata){
    let name     = formdata.name;
    let email    = formdata.email;
    let username = formdata.username;
    let password = formdata.password;    
    return new Promise((resolve, reject) => {
	  	let body 		   : 	string 		=	"key=SignUp &name="	 +name
                                  + "&email=" +email
                                  + "&username=" +username
                                  + "&password=" +password,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"SalePerson/retriveSaleP.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	  });
  }
CheckStorage(){
    let chck = this.storage.get('myuser').then((data)=>{
      if(data !=null){
        return true;
      }else{
        return false;
      }
    });
    return chck;
  }
GetStorageData(){
      let str         = this.storage.get('myuser').then((data)=>{
			this.local      = JSON.parse(data);
			if (this.local  !=null){
        return this.local.username;
      }else{
        return null;
      }
    });
        return str;
  }

Loading(){
   this.loading           = this.loadCtrl.create({
      content             : "Please wait ...",
      dismissOnPageChange : true
    });
      return this.loading.present();
  }
ShowError(){
    let alert = this.alertCtrl.create({
      title       : "ERROR",
      subTitle    : "Please tray again",
      buttons     : ['OK!']
    });
      return alert;
  }

ToatMaker(text){
    let toastctrl = this.toastCtrl.create({
        message   : text,
        duration  : 2000
    });
    return toastctrl.present();
  } 
// Create Events ...
CreateEvent(data,EntryType){
  return new Promise((resolve,reject)=>{
            let body 		   : 	string 		=	"key="+EntryType+"&"+data,
                type       : 	string  	= "application/x-www-form-urlencoded; charset=UTF-8",
                headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
                options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
                url 		   : 	any 		  = 	this.baseUrl+"events/manageEvent.php";

                this.http.post(url,body,options)
                .subscribe(res => {
                resolve(res.json());
                }, (err) => {
                reject(err);
                });
                    
                  });
}
CreateTask(data,EntryType){
  return new Promise((resolve,reject)=>{
        let body 		   : 	string 		=	"key="+EntryType+"&"+data,
                  type       : 	string  	= "application/x-www-form-urlencoded; charset=UTF-8",
                  headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
                  options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
                  url 		   : 	any 		  = 	this.baseUrl+"task/manageTask.php";

                  this.http.post(url,body,options)
                  .subscribe(res => {
                  resolve(res.json());
                  }, (err) => {
                  reject(err);
                  });
    });
}
displayListOfContactsForGroups(v){
  return new Promise((resolve, reject) => {
    let body 		   : 	string 		=	"key=SelectListOfContactsForGroup&username="+v,
        type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
        headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
        options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
        url 		   : 	any 		  = 	this.baseUrl+"contacts/manageContact.php";
       this.http.post(url,body,options)
       .subscribe(res => {
          resolve(res.json());
          }, (err) => {
            reject(err);
          });
});
}

displayListOfContacts(v){
    return new Promise((resolve, reject) => {
	  	let body 		   : 	string 		=	"key=selectSalep&username="+v,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"contacts/manageContact.php";
	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
            resolve(res.json());
            }, (err) => {
              reject(err);
            });
  });
  }

  // Display List of Accounts 
  DisplayListOfAccounts(v){
    return new Promise((resolve, reject) => {
	  	let body 		   : 	string 		=	"key=selectAccountList&username="+v,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"account/manageAccount.php";
	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
            resolve(res.json());
            }, (err) => {
              reject(err);
            });
  });
  }

  AccountGrouped(id){
    return new Promise((resolve, reject) => {
	  	let body 		   : 	string 		=	"key=AccoundGrouped&id="+id,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"account/manageAccount.php";
	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
            resolve(res.json());
            }, (err) => {
              reject(err);
            });
  });
  }
  // Select Account For new Opportunity 
  OpportunitisAccounts(v){
    return new Promise((resolve, reject) => {
	  	let body 		   : 	string 		=	"key=selectAccountList&username="+v,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"Opportunity/manageOppo.php";
	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
            resolve(res.json());
            }, (err) => {
              reject(err);
            });
  });
  }

ChangeStage(data,username){
  let opportunityStage = data.currentStage;
  let ContactPerson = data.ContactPerson
  return new Promise((resolve,reject)=>{
          let body 		   : 	string 		=	"key=UpdateOpportunityStage&username="    +username
                                              + "&opportunityStage="              +opportunityStage
                                              + "&ContactPerson="                 +ContactPerson,
                      type       : 	string  	= "application/x-www-form-urlencoded; charset=UTF-8",
                      headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
                      options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
                      url 		   : 	any 		  = 	this.baseUrl+"task/manageTask.php";

                      this.http.post(url,body,options)
                      .subscribe(res => {
                      resolve(res.json());
                      }, (err) => {
                      reject(err);
                      });
    
  });
}
// get respictive account
getAccount(id){
  return new Promise((resolve,reject)=>{
          let body 		   : 	string 		=	"key=getAccount&id="    +id,
                      type       : 	string  	= "application/x-www-form-urlencoded; charset=UTF-8",
                      headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
                      options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
                      url 		   : 	any 		  = 	this.baseUrl+"account/manageAccount.php";
                      this.http.post(url,body,options)
                      .subscribe(res => {
                      resolve(res.json());
                      }, (err) => {
                      reject(err);
                      });
  });
}
getGroupedAccount(id){  
  return new Promise((resolve,reject)=>{
                  let body 		   : 	string 		=	"key=GroupedAccount&id=" +id,
                      type       : 	string  	= "application/x-www-form-urlencoded; charset=UTF-8",
                      headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
                      options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
                      url 		   : 	any 		  = 	this.baseUrl+"account/manageAccount.php";
                      this.http.post(url,body,options)
                      .subscribe(res => {
                      resolve(res.json());
                      }, (err) => {
                      reject(err);
                      });
  });
}
getmyaccoutslistforcontact(id){
  return new Promise((resolve,reject)=>{
    let body 		   : 	string 		=	"key=mythisacount&id=" +id,
        type       : 	string  	= "application/x-www-form-urlencoded; charset=UTF-8",
        headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
        options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
        url 		   : 	any 		  = 	this.baseUrl+"account/manageAccount.php";

        this.http.post(url,body,options)
        .subscribe(res => {
        resolve(res.json());
        }, (err) => {
        reject(err);
        });
});
}
displayListOfContactsForTesting(id){
  return new Promise((resolve,reject)=>{
    let body 		   : 	string 		=	"key=mytestingRequest&id=" +id,
        type       : 	string  	= "application/x-www-form-urlencoded; charset=UTF-8",
        headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
        options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
        url 		   : 	any 		  = 	this.baseUrl+"contacts/manageContact.php";

        this.http.post(url,body,options)
        .subscribe(res => {
        resolve(res.json());
        }, (err) => {
        reject(err);
        });
});
}
// Display for home ...

CountOpportunity(flog,type){
  let username = flog;
  let type1 = type.type;
  return new Promise((resolve, reject) => {
    let body 		   : 	string 		=	  "key="        +type1+
                                    "&username="	+username,
        type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
        headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
        options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
        url 		   : 	any 		  = 	this.baseUrl+"Opportunity/retriveOppo.php";

       this.http.post(url,body,options)
       .subscribe(res => {
              resolve(res.json());
          }, (err) => {
            reject(err);
          });
});
}
GetEventForHome(flog,type){
    let username = flog;
    let type1 = type.type;
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	  "key="        +type1+
                                      "&username="	+username,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"events/retriveEvent.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	});
  }

  GetTastForHome(flog,type){
    let username = flog;
    let type1 = type.type;
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key="       +type1
                                  + "&username=" +username,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"task/retriveTask.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	});
  }

  // Display for Activity 

  GetEventForActivity(flog,type){
    let username = flog;
    let type1 = type.type;
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	  "key="        +type1+
                                      "&username="	+username,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"events/retriveEvent.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	});
  }

  GetTaskForActivity(flog,type){
    let username = flog;
    let type1 = type.type;
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key="       +type1
                                  + "&username=" +username,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"task/retriveTask.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	});
  }

  GetCallForActivity(flog){
    let username = flog;
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key=all&username=" +username,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"Calls/ManageCalls.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res =>{
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	}); 
  }
  GetMailForActivity(flog){
    let username = flog;
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key=getMail&username=" +username,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"Mails/retriveMail.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	});
  }

  // Dispaly For Opportunity
  DisplayListOfOpportunity(flog,type,oppo_id){
    let username = flog;
    let oppoid = oppo_id.oppor_id;
    let type1 = type.type;
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key="       +type1
                                  + "&oppoid="   +oppoid
                                  + "&username=" +username,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"Opportunity/retriveOppo.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	});
  }
// List of Contacts for new opportunity
  getListOfContactForOppo(id){
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key=selectContactListForNewOppo&id="+id,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"Opportunity/manageOppo.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	});
  }
  // ... Count Event and Task for opportunity 
  CountEventAndTask(id,type){
    let mytype = type;
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key=" +mytype
                                  + "&id=" +id,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"Opportunity/retriveOppo.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	});
  }
  // Stage ......
  InsertToStage(ev){
    let username = ev.SaleP_username;
    let oppoid = ev.oppor_id;
    let No_of_delivery = ev.No_of_delivery;
    let expected_close_date = ev.expected_close_date;
    
    let opportunity_stage = ev.opportunity_stage;
    let probality_close_sale = ev.probality_close_sale;

    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key=InsertStage&username=" +username
                                  + "&oppoid="                  +oppoid
                                  + "&opportunity_stage="       +opportunity_stage
                                  + "&probality_close_sale="    +probality_close_sale
                                  + "&expected_close_date="     +expected_close_date
                                  + "&No_of_delivery="          +No_of_delivery,
          type       : 	string  	= "application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"Opportunity/retriveOppo.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	});
  }

  ValidateStage(id,stage){

    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key=ValidateStage&oppoid="+id
                                  + "&stage="+stage,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"Opportunity/retriveOppo.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            },(err) => {
              reject(err);
            });
      });
  }
  InsertDatainToStage(Reponse,newStage){
    let oppoid                       = Reponse[0].oppo_id;;
    let stage                        = newStage;

    let ProbalityClosingOpportunity  = Reponse[0].probality_close_sale;
    let expected_close_date          = Reponse[0].expected_close_date;
    let No_of_delivery               = Reponse[0].no_of_deliviry;
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key=InsertNewStage&oppoid="          +oppoid
                                  + "&ProbalityClosingOpportunity="       +ProbalityClosingOpportunity
                                  + "&expected_close_date="               +expected_close_date
                                  + "&No_of_delivery="                    +No_of_delivery
                                  + "&stage="                             +stage,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"Opportunity/retriveOppo.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            },(err) => {
              reject(err);
            });
      });
  }

  getCurrentStage(oppo_id,opportunityStage){
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key=displayOpportunityForStage&oppoid=" +oppo_id
                                  + "&stage=" +opportunityStage,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"Opportunity/retriveOppo.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	    });
  }
  setOpportunity(id){
    return new Promise((resolve, reject) => {
      let body 		    : 	string 		=	"key=SelectOpportunityForEvent&oppoid=" +id,
        type       		: 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
        headers 	 	: 	any 		= 	new Headers({ 'Content-Type': type}),
        options 	 	: 	any 		= 	new RequestOptions({headers : headers}),
        url 		   	: 	any 		= 	this .baseUrl+"Opportunity/retriveOppo.php";
           this.http.post(url,body,options)
           .subscribe(res => {
            resolve(res.json());
          }, (err) => {
          reject(err);
          });
        });
    }
  // Display Opportunities for stages 
  DisplayOpportunityForStages(username,oppo_id){
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key=displayOpportunityForStageDetails&oppoid=" +oppo_id
                                  + "&stage=" +username,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"Opportunity/retriveOppo.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	});
  }

  DisPlayPreviousOpporStage(oppoid,stage){
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	  "key=MyPreviousStage&oppoid="+oppoid
                                  +   "&stage="+stage,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"Opportunity/retriveOppo.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	});
  }
  myNewStage(id){
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	  "key=getStageForMyNewStgae&stageid="+id,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"Opportunity/retriveOppo.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	});
  }

  forgetPass(res_email){
    let rest_email = res_email.email;
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key=validatePass&Email=" +rest_email,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"ForgetPass/ForgetPassword.php";
	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
            resolve(res.json());
            }, (err) => {
              reject(err);
            });
	  });
  }
  ManageResetRequast(res_email,type){
    let rest_email = res_email;
    let types = type; 
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key="+types+"&Email="+rest_email,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"Mails/ManageMails.php";
	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
            resolve(res);
            }, (err) => {
              reject(err);
        });
	    });
    }
    // Select Seleperson Profile ...

    getSalePerson(username){
      return new Promise((resolve, reject) => {
        let body         :   string      = "key=slectSalePProfile&username="+username,
            type         :   string      =   "application/x-www-form-urlencoded; charset=UTF-8",
            headers      :   any         =   new Headers({ 'Content-Type': type}),
            options      :   any         =   new RequestOptions({headers : headers}),
            url          :   any         =   this.baseUrl+"SalePerson/ManageSaleP.php";
        this.http.post(url,body,options)
         .subscribe((res)=>{
          resolve(res.json());
         },(err)=>{
           console.log(reject);
         });
      });
}
  ResetPasswords(e){
    this.forgotpasscridencial = JSON.parse(e);
    console.log(this.forgotpasscridencial);
    let myemail = this.forgotpasscridencial.myEmail;
    let securKey = this.forgotpasscridencial.securKey;
    let cfrPass = this.forgotpasscridencial.Mycfmpass;
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key=RequestResetPass&myemail=" +myemail
                                  + "&securKey="+securKey
                                  + "&confrirmPass="+cfrPass,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"ForgetPass/ForgetPassword.php";
	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
            resolve(res.json());
            }, (err) => {
              reject(err);
            });
	});
  }
  
  getFile(id){
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key=viewFile&id=" +id,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"files/manageFile.php";
	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	});
  } 
  getContactsp(username){
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key=selectSalep&username=" +username,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"contacts/manageContact.php";
	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	});
  }
  getRespectiveContactsp(username){
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key=selectRespectiveSalep&username=" +username,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"contacts/manageContact.php";
	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	    });
  }

  getRespectiveContactspDetails(username){
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key=selectRespectiveContactPersonDetails&username=" +username,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"contacts/manageContact.php";
	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	    });
  }
  // get Events and task for opportunity stages 
  getEventAndTakForStages(username,oppoid,types){
    let type1 = types;
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	"key="      +type1
                                  + "&username="+username
                                  // + "&id="      +id
                                  + "&oppoid="  +oppoid,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"events/retriveEvent.php";
	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	});
  }
  CloseTheOpportunity(v,oppoid,stage){
    let mystatus = v.OpportunityName;
    let mycomment = v.OpportunityComment;
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	  "key=ColoseTheOpportunity&oppoid="+oppoid
                                  +   "&stage="+stage
                                  +   "&statuss="+mystatus
                                  +   "&comment="+mycomment,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"Opportunity/retriveOppo.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	});
  }

  getAllStageOfOppo(id){
    return new Promise((resolve, reject) => {
      let body 		   : 	string 		=	  "key=getAllStagesOfAnOpportunity&oppoid="+id,
          type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
          headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
          options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
          url 		   : 	any 		  = 	this.baseUrl+"Opportunity/retriveOppo.php";

	  		 this.http.post(url,body,options)
	  		 .subscribe(res => {
                resolve(res.json());
            }, (err) => {
              reject(err);
            });
	});
  }
// Delete Task ...
DeleteTask(id){
  return new Promise((resolve, reject) => {
    let body 		   : 	string 		=	  "key=DeleteTask&id="+id,
        type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
        headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
        options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
        url 		   : 	any 		  = 	this.baseUrl+"events/retriveEvent.php";

       this.http.post(url,body,options)
       .subscribe(res => {
              resolve(res.json());
          }, (err) => {
            reject(err);
          });
  });
}
// Delete Event ...
DeleteEvent(id){
  return new Promise((resolve, reject) => {
    let body 		   : 	string 		=	  "key=DeleteEvent&id="+id,
        type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
        headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
        options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
        url 		   : 	any 		  = 	this.baseUrl+"events/retriveEvent.php";

       this.http.post(url,body,options)
       .subscribe(res => {
              resolve(res.json());
          }, (err) => {
            reject(err);
          });
  });
}
getLoseOpportuniy(id){
  return new Promise((resolve, reject) => {
    let body 		   : 	string 		=	  "key=SelectLoseOpportunity&id="+id,
        type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
        headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
        options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
        url 		   : 	any 		  = 	this.baseUrl+"Opportunity/retriveOppo.php";

       this.http.post(url,body,options)
       .subscribe(res => {
              resolve(res.json());
          }, (err) => {
            reject(err);
          });
  });
}

GetOpportuniyForAccountDetails(id){
  return new Promise((resolve, reject) => {
    let body 		   : 	string 		=	  "key=getOpportunityForAccountDetails&id="+id,
        type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
        headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
        options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
        url 		   : 	any 		  = 	this.baseUrl+"Opportunity/retriveOppo.php";
       this.http.post(url,body,options)
       .subscribe(res => {
              resolve(res.json());
          }, (err) => {
            reject(err);
          });
  });
}

popPage(){
  return new Promise((resolve, reject)=>{
    resolve(()=>true);
  });
  }
ChangePassword(v){
  return new Promise((resolve, reject) => {
    let body 		   : 	string 		=	  "key=ChangePassword&"+v,
        type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
        headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
        options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
        url 		   : 	any 		  = 	this.baseUrl+"SalePerson/ManageSaleP.php";
       this.http.post(url,body,options)
       .subscribe(res => {
              resolve(res);
          }, (err) => {
            reject(err);
          });
  });
}

UpdateProfile(v){
  return new Promise((resolve, reject) => {
    let body 		   : 	string 		=	  "key=UpdateProfile&"+v,
        type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
        headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
        options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
        url 		   : 	any 		  = 	this.baseUrl+"SalePerson/ManageSaleP.php";
       this.http.post(url,body,options)
       .subscribe(res => {
              resolve(res);
          }, (err) => {
            reject(err);
          });
  });
}
}