import { Component, NgZone, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, PopoverController, AlertController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { EventPage } from '../event/event';
import { OpportunityPage } from '../opportunity/opportunity';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { MapsAPILoader } from '@agm/core';
import { StagesPage } from '../stages/stages';
import { Events } from 'ionic-angular';
import { CustomencoderProvider } from '../../providers/customencoder/customencoder';
import {URLSearchParams, QueryEncoder} from '@angular/http';
@IonicPage()
@Component({
  selector: 'page-new-opportunity',
  templateUrl: 'new-opportunity.html',
})
export class NewOpportunityPage {

          NewOppo                      : boolean = true;
          OppotFooter                  : boolean = false;
          OppotDetails                 : boolean = false;

          smg                          : any;
          Title                        : any = 'Opportunity';
          btnTitle                     : any = "Save";
          orgData                      : any;
          AccountName                  : any;
          AmountOfDelivery             : any;
          ExpectCloseDate              : any;
          OpportunityName              : any;
          OpportunityStage             : any;
          ProbablityOfClosing          : any;
          opportunityId                : any;
          contactPerson                : any;
          sessionid                    : any;
          ff                           : any;
          Contactid                    : any;
          AccountId                    : any;
          loading                      : any;
          PerivousStage                : any;
          public stageid               : any;
          CurrentEventNo               : number = 0;
          CurrentTaskNo                : number = 0;
          PerviousEventNo              : any;
          PerviousTaskNo               : number = 0;
          Response                     : any;
          ListOfPersivousStage         : any;
          EventNo                      : number = 0;
          TaskNo                       : number = 0;
  constructor(
          public navCtrl               : NavController, 
          private http                 : Http,
          private ngZone			         : NgZone,
          private events               : Events,
          private mapsAPILoader		     : MapsAPILoader,
          private loadCtrl             : LoadingController,
          public alertCtrl             : AlertController,
          public popoverCtlr           : PopoverController,
          private auth                 : AuthProvider,
          private cusencoder           : CustomencoderProvider,
          public navParams             : NavParams) {
        
  }

  ionViewDidLoad() {
    this.auth.GetStorageData().then((data)=>{
      if (!data != null) {
        this.getAccount(data);
        this.sessionid = data;
        if (this.navParams.get('newoppo')) {
              this.NewOppo                  = true;
              this.OppotFooter              = false;
              this.OppotDetails             = false;
              this.Title                    = "New Opportunity";
        }
        else if (this.navParams.get("veiewoppo")) {
          this.navrecorde(this.navParams.get("veiewoppo"));   
              this.Title                    = "Opportunity";
              this.NewOppo                  = false;
              this.OppotFooter              = true;
              this.OppotDetails             = true;
              this.displayOpportunity(data,{type:"DisplayNewOpportunity"},this.navParams.get("veiewoppo"));
              this.GetPreviousStage(this.navParams.get("veiewoppo"));
              this.getCurrentStage(this.navParams.get("veiewoppo"));

              // If the page popped reload his function
              this.events.subscribe('reloadDetails',() => {
                this.displayOpportunity(data,{type:"DisplayNewOpportunity"},this.navParams.get("veiewoppo"));
                this.GetPreviousStage(this.navParams.get("veiewoppo"));
                this.getCurrentStage(this.navParams.get("veiewoppo"));
              });
        }     
        else if (this.navParams.get("eidt")) {
                this.navrecorde(this.navParams.get("eidt"));
                this.Title = "Update Opportunity";
                this.btnTitle               = "Update";
        }
        else{
          console.log("non were selected");
        }
      } else {
          this.navCtrl.setRoot(LoginPage);
      }
    });
  } 


  PopMe(){
    this.events.publish('backToopportunitylist');
      this.navCtrl.pop().then(()=>{
        this.auth.popPage();
      });
  }

getAccount(id){
    this.auth.OpportunitisAccounts(id).then((resp)=>{
        this.AccountId = resp;
    }).catch((err)=>{
        console.log(err);
    });
}
getthisValue(v){
  this.LoadFunction();
  this.getContactPerson(v);
}
getContactPerson(id){
  this.auth.getListOfContactForOppo(id).then((resp)=>{
      this.Contactid = resp;
      if (resp !=null) {
        this.loading.dismiss();
      } else {
        alert('No contact exist');
      }
  }).catch((err)=>{
      console.log(err);
  });
}
displayOpportunity(data,type,data2){
    this.auth.DisplayListOfOpportunity(data,type,data2).then((res)=>{
       this.orgData = res;
    });
  }

  navrecorde(viewoppo){
    this.ff = viewoppo;
    this.AccountName                       = viewoppo.account_name;
    this.AmountOfDelivery                  = viewoppo.No_of_delivery;
    this.ExpectCloseDate                   = viewoppo.expected_close_date;
    this.OpportunityName                   = viewoppo.opportunity_name;
    this.OpportunityStage                  = viewoppo.opportunity_stage;
    this.ProbablityOfClosing               = viewoppo.probality_close_sale;
    this.opportunityId                     = viewoppo.oppor_id;
    this.contactPerson                     = viewoppo.contact_person;
  }
    VeiwOppoDetails(){
    this.NewOppo                            = false;
    this.OppotFooter                        = true;
    this.OppotDetails                       = true;
  }

  AddNewOpportunity(
           opportunityId
          ,AccountName
          ,AmountOfDelivery
          ,ExpectCloseDate
          ,OpportunityName
          ,contactPerson
          ,OpportunityStage
          ,ProbablityOfClosing){
          
          let params = new URLSearchParams('', new CustomencoderProvider());
              params.append('OpportunityName',OpportunityName);

    let body              :   string    = "key=NewEntry&contact_person="+contactPerson
                                        + "&AccountName="+AccountName
                                        + "&SalePerson="+this.sessionid
                                        + "&AmountOfDelivery="+AmountOfDelivery
                                        + "&ExpectCloseDate="+ExpectCloseDate
                                        + "&"+params.toString()
                                        + "&OpportunityStage="+OpportunityStage
                                        + "&ProbablityOfClosing="+ProbablityOfClosing,
        type              :   string    = "application/x-www-form-urlencoded; charset=UTF-8",
        headers           :   any       = new Headers({ 'Content-Type': type}),
        options           :   any       = new RequestOptions({headers : headers}),
        url               :   any       = this.auth.baseUrl+"Opportunity/manageOppo.php";

    this.http.post(url,body,options)
        .subscribe((data)=>{
        if (data.status ==200) {
            this.navCtrl.setRoot(OpportunityPage);
            this.loading.dismiss();
        }
        },err=>{
            return this.smg = "Please try again";
        })
  }

  EditOpportunity(
    opportunityId
   ,AccountName
   ,AmountOfDelivery
   ,ExpectCloseDate
   ,OpportunityName
   ,contactPerson
   ,OpportunityStage
   ,ProbablityOfClosing){
    //NewEntry

    let params = new URLSearchParams('', new CustomencoderProvider());
              params.append('OpportunityName',OpportunityName);

    let body              :   string    = "key=Editoppo&opporid=" +opportunityId
                                        + "&AccountName="+AccountName
                                        + "&contact_person="+contactPerson
                                        + "&AmountOfDelivery="+AmountOfDelivery
                                        + "&ExpectCloseDate="+ExpectCloseDate
                                        + "&"+params.toString()
                                        + "&OpportunityStage="+OpportunityStage
                                        + "&ProbablityOfClosing="+ProbablityOfClosing,
        type              :   string    = "application/x-www-form-urlencoded; charset=UTF-8",
        headers           :   any       = new Headers({ 'Content-Type': type}),
        options           :   any       = new RequestOptions({headers : headers}),
        url               :   any       = this.auth.baseUrl+"Opportunity/manageOppo.php";

    this.http.post(url,body,options)
        .subscribe((data)=>{
        if (data.status ==200) {
            this.navCtrl.setRoot(OpportunityPage);
            this.loading.dismiss();
        }
        },err=>{
            return this.smg = "Please try again";
        })
  }


  addReconds(){
    this.LoadFunction();
      let isAccountName                     = this.AccountName;
      let isAmountOfDelivery                = this.AmountOfDelivery;
      let isExpectCloseDate                 = this.ExpectCloseDate;
      let isOpportunityName                 = this.OpportunityName;
      let isOpportunityStage                = this.OpportunityStage;
      let isProbablityOfClosing             = this.ProbablityOfClosing;
      let isopportunityId                   = this.opportunityId;
      let iscontactPerson                   = this.contactPerson;
    if (this.btnTitle === "Save") { 
      this.AddNewOpportunity(
        isopportunityId,
        isAccountName,
        isAmountOfDelivery,
        isExpectCloseDate,
        isOpportunityName,
        iscontactPerson,
        isOpportunityStage,
        isProbablityOfClosing); 
    }else if (this.btnTitle ==="Update"){
      this.EditOpportunity(
        isopportunityId,
        isAccountName,
        isAmountOfDelivery,
        isExpectCloseDate,
        isOpportunityName,
        iscontactPerson,
        isOpportunityStage,
        isProbablityOfClosing);      
    }
  }
  NextStage(nextStag){
    this.navCtrl.push(EventPage,nextStag);
  }
  CloseOppo(nn,bb){
   let oppoId  = bb.close.oppor_id;
   let stage = nn.OpportunityName;

        let body          :   string    = "key=UpdateStatus&opporid=" +oppoId
                                        + "&OpportunityStage="+stage,
        type              :   string    = "application/x-www-form-urlencoded; charset=UTF-8",
        headers           :   any       = new Headers({ 'Content-Type': type}),
        options           :   any       = new RequestOptions({headers : headers}),
        url               :   any       = this.auth.baseUrl+"Opportunity/manageOppo.php";

    this.http.post(url,body,options)
        .subscribe((data)=>{
        if (data.status ==200) {
            this.navCtrl.setRoot(OpportunityPage);
        }
        },err=>{
            return this.smg = "Please try again";
        })
  }
  ManageOpportunity(){
      let Np = this.opportunityId;
      let ed = {eidt:this.ff}
      let alert = this.alertCtrl.create({
          title: 'Manage Opportunity',
          buttons: 
          [
              {
              text      :'Edit',
              handler   : data=>{
                  //something here ...
                  this.EditOppo(ed);
              }
          },
          {
              text      : 'Delete',
              handler   :data=>{
                // do something here ...
                this.LoadFunction();
                this.DeleteOppo(Np);
              }
          },
          {
              text      : 'Cancel',
              handler   : data=>{
                  // cancel doing nothing !
              }
          }
        ]
      });
      alert.present();
  }

  EditOppo(Np){
    this.navCtrl.push(NewOpportunityPage,Np);
  }
  DeleteOppo(Np){
    let oppor_id                        =   Np;
    let body              :   string    =   "key=Deleteoppo&opporid=" +oppor_id,
        type              :   string    =   "application/x-www-form-urlencoded; charset=UTF-8",
        headers           :   any       =   new Headers({ 'Content-Type': type}),
        options           :   any       =   new RequestOptions({headers : headers}),
        url               :   any       =   this.auth.baseUrl+"Opportunity/manageOppo.php";

    this.http.post(url,body,options)
    .subscribe((data)=>{
      if (data.status ==200) {
          this.navCtrl.setRoot(OpportunityPage);
          this.loading.dismiss();
      }
    },err=>{
      return this.smg = "Please try again";
    })
  }
  getCurrentStage(v){
    let oppoId    = v.oppor_id;
    let stageName = v.opportunity_stage;
    this.auth.getCurrentStage(oppoId,stageName).then((rep)=>{
      this.stageid = rep[0].id;
      this.CountCurrntEvent(this.stageid);
      this.CountCurrentTask(this.stageid);
    }).catch((err)=>{
      console.log(err);
    });
  }

  GetPreviousStage(id){
    let stage = id.opportunity_stage;
    let oppoId = id.oppor_id;
    this.auth.DisPlayPreviousOpporStage(oppoId,stage).then((rs)=>{
        this.PerivousStage = rs;
    }).catch((ex)=>{
      console.log(ex);
    });
  }
  CountCurrntEvent(id){
    this.auth.CountEventAndTask(id,'countCurrntEventOppo').then((ers)=>{
      let count = Object.keys(ers).length;
      this.CurrentEventNo = count;
    }).catch((err)=>{
      console.log(err);
    });
  }
  CountCurrentTask(id){
    this.auth.CountEventAndTask(id,'countCurrntTaskOppo').then((ers)=>{
      this.Response = ers;
      let count = Object.keys(ers).length;
      this.CurrentTaskNo = count;
    }).catch((err)=>{
      console.log(err);
    });
  }

  ValidateForContact(data){
    console.log(data);
  }
  LoadFunction(){
    this.loading = this.loadCtrl.create({
      content : 'Loading ...',
      duration: 60000
    });
    this.loading.present();
  }
  RespectivePreviousStage(v){
    this.navCtrl.push(StagesPage,{st:v.oppo_id,slp:this.sessionid,stage:v.StageType,stageid:v.id,pr:'previousStage'});
    // this.navCtrl.push(MyStagePage,{mypreviousStage:v});
  } 
  RespectiveCurrentStage(v){
    this.navCtrl.push(StagesPage,{st:v.oppor_id,slp:this.sessionid,stage:this.OpportunityStage,stageid:this.stageid});
    // this.navCtrl.push(MyStagePage,{mycurrentStage:v});
  }
  
} 
