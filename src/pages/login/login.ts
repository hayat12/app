import { Component } from '@angular/core';
import { IonicPage,Platform ,NavController, NavParams, LoadingController, AlertController, ToastController, MenuController } from 'ionic-angular';
import { Storage} from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { ForgetPasswordPage } from '../forget-password/forget-password';
import { Events } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  flog = { username: '', password: '' };
  responsData					                 : any;
  loading                              : any;

  constructor( 
  	public navCtrl				             : NavController, 
    public http 				               : Http,
    public menuCtrl                    : MenuController,
    public platform                    : Platform,
    public events                      : Events,
    public toastCtrl                   : ToastController,
    public storage                     : Storage,
    public loadCtrl                    : LoadingController,
    public alertCtrl                   : AlertController,
  	public authProvider			           : AuthProvider,
  	public navParams			             : NavParams) {
      // this.menuCtrl.enable(false, 'myMenu');
  }
  ionViewDidLoad(){
    this.menuCtrl.swipeEnable(false);
   }
  Login(flog)
    {
      this.Loader();
      this.authProvider.mylogin(flog).then((data)=>{
        this.responsData = data;
        if(this.responsData.length >0){
          let u = this.responsData[0].saleP_username;
          let userid = JSON.stringify({username:u});
          this.storage.set('myuser',userid).then((data)=>{
          this.toasmaker("Successfully logged in");
          this.platform.ready().then((runit)=>{
            this.navCtrl.setRoot(HomePage).then((allow)=>{
              this.Popme();
              this.loading.dismiss();
            },(err)=>{
              this.toasmaker("Login Failed");
            });
          });
        }); 
        }else{
          this.navCtrl.setRoot(LoginPage).then((reject)=>{
            this.toasmaker("Invalid Email and Password");
            this.loading.dismiss();
          })
        }
      },(re)=>{
        this.navCtrl.setRoot(LoginPage);
        this.toasmaker("Invalid Email and Password");
        this.loading.dismiss();
      });
    }
    public toasmaker(text){
      let toastctrl = this.toastCtrl.create({
        message:text,
        duration:3000
      });
      toastctrl.present();
    }

    Loader(){
      this.loading = this.loadCtrl.create({
        content   : 'Loading...',
        duration  : 6000
        });
        this.loading.present();
    }
    ForgotPass(){
      this.navCtrl.push(ForgetPasswordPage);
    }

    Popme(){
      this.events.publish('ReloadSidemenu',()=>{
        this.navCtrl.setRoot(MyApp);
      })
    }
}

