import { Component, ViewChild } from '@angular/core';
import { Nav, NavParams, AlertController, MenuController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { AccountPage } from '../pages/account/account';
import { ActivityPage } from '../pages/activity/activity';
import { ContactPage } from '../pages/contact/contact';
import { MyFilesPage } from '../pages/my-files/my-files';
import { OpportunityPage } from '../pages/opportunity/opportunity';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { TrackingProvider } from '../providers/tracking/tracking';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Events } from 'ionic-angular';
import { SalesPersonPage } from '../pages/sales-person/sales-person';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav : Nav;
  rootPage            : any;
  salePid             : any;
  btnTitle            : any;
  stoptbtn            : boolean = true;
  startbtn            : boolean = false;
  loader              : any;
  SalesPersonName     : any;
  SalePersonImage     : any;
  RetriveResult       : any;
  imageName           : any;
  username            : any;

  pages: Array<{title: string, component: any,names:string}>;

  constructor(
        public platform                   : Platform,
        public loadCtrl                   : LoadingController,
        private auth                      : AuthProvider,
        private storage                   : Storage,
        public events                     : Events,
        private menuCtrl                  : MenuController,
        private tracking                  : TrackingProvider,
        public alertCtrl                  : AlertController,
        public statusBar                  : StatusBar,
        private backgroundGeolocation     : BackgroundGeolocation,
        public splashScreen               : SplashScreen) {
    this.initializeApp();
    events.subscribe('ReloadSidemenu', () => {
      this.getSalePersons();
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'home'             , names:"Home", component: HomePage },
      { title: 'trophy'           , names:"Activities", component: ActivityPage },
      { title: 'user-circle'      , names:"Accounts", component: AccountPage },
      { title: 'address-book'     , names:"Contacts", component: ContactPage },
      { title: 'diamond'          , names:"Opportunities", component: OpportunityPage },
      { title: 'folder'           , names:"Files", component: MyFilesPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
  // AFTER INITIALIZING THE APPLICATION THIS FUNCTION SHOULD LOAD
      this.auth.CheckStorage().then((data)=>{
        this.getSalePersons();
        this.gettigStart();
        if(data === true){
              this.rootPage = HomePage;
              this.getSaplersonID();
        }else{
        if(this.rootPage = LoginPage){
            this.rootPage = LoginPage;
          }
        }
      });
    });
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
  getSaplersonID(){
    this.auth.GetStorageData().then((data)=>{
      this.salePid = data;
    });
  }
  LogOutCtrl(){
    let alert = this.alertCtrl.create({
      title   : 'Log Out',
      subTitle: 'Are you sure you want to logout ?',
      buttons : 
      [
        { text: 'Logout',
          handler: data=>{
            this.LoadFunction();
            this.storage.remove("myuser").then((data)=>{
              this.rootPage = LoginPage;
              window.location.reload();
              this.loader.dismiss();
            });
        }},
        {
         text:'Cancel',
         handler: data=>{
         }
       }
      ]
    })
    alert.present();
    }
  LogoutMe(){
      this.LogOutCtrl();
  }
  getSalePersons(){
    this.auth.GetStorageData().then((res)=>{
        this.auth.getSalePerson(res).then((resp)=>{
          this.RetriveResult = resp ;
          this.username = res;
          this.imageName = this.RetriveResult.imageName;
          this.SalePersonImage = 'http://110.4.41.78/sales/SalePerson/'+res+'/'+this.RetriveResult.imageName;
          this.SalesPersonName = this.RetriveResult.name;
        }).catch((err)=>{
          console.log(err);
        });
    }).catch((err)=>{
    });
  }
  
  UplaodAlert(){
    this.nav.push(SalesPersonPage,{credential:this.username});
  }
  LoadFunction(){
    this.loader = this.loadCtrl.create({
      content: "Please wait ...",
      duration : 12000
    });
    this.loader.present();
  }
  //...............................GPS Tracking 

  gettigStart(){
    this.storage.get('start_Tracking').then((res)=>{
      if(res!=null){
        this.startbtn = true;
        this.stoptbtn = false;
        this.tracking.load();
      }else{
        this.startbtn = false;
        this.stoptbtn = true;
        this.backgroundGeolocation.stop();
      }
    }).catch((err)=>{
      console.log(err);
    });
  }

  startTracking(){
    this.startbtn = true;
    this.stoptbtn = false;
    this.storage.set('start_Tracking','StartTracking').then((res)=>{
        this.tracking.load();
        this.Alertfunction('start');
    }).catch((err)=>{
      alert(err);
    });
  }
  stopTracking(){
    this.startbtn = false;
    this.stoptbtn = true;
      this.Alertfunction('stop');
      this.backgroundGeolocation.stop();
      this.storage.remove('start_Tracking').then((res)=>{
      }).catch((err)=>{
        console.log(err);
      });
  }
  Alertfunction(texts){
    let alert = this.alertCtrl.create({
      title: texts,
      subTitle: texts +' tracking',
      buttons:[{
        text: texts,
        handler : data =>{
        }
      }]
    });
    alert.present();
  }
}
