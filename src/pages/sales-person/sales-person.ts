import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, MenuController} from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthProvider } from '../../providers/auth/auth';
import { URLSearchParams } from '@angular/http';
import { CustomencoderProvider } from '../../providers/customencoder/customencoder';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Events } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer';
@IonicPage()
@Component({
  selector: 'page-sales-person',
  templateUrl: 'sales-person.html',
})
export class SalesPersonPage {
	changePassword				: boolean = false;
	Profile								: boolean = true;
	updateProfile 				: boolean = false;
	username              : any;
	name									: any;
	email									: any;
	image									: any;
	respone								: any;
	loading								: any;
	myimage								: any;
	imageUrl							: any = 'http://110.4.41.78/sales/SalePerson/';
  constructor( 
  			public navCtrl 						: NavController,
				private http 					: Http,
				private eventData      		 	: EventDataProvider,
				private fileChooser    		 	: FileChooser,
				private transfer       		 	: FileTransfer, 
				private filepath        		: FilePath,
				public event					: Events,
				private imageResizer			: ImageResizer,
				private androidPermissions		: AndroidPermissions,
				private diagnostic				: Diagnostic,
				public menuCtrl					: MenuController,
				public loadCtrl					: LoadingController,
				private toastCtrl				: ToastController,
				private auth 					: AuthProvider,
  				public navParams  				: NavParams) {
  }

  ionViewDidLoad(){
	 this.LoadingFunction()
	 this.username = this.navParams.get('credential');
	 this.getSalePerson(this.navParams.get('credential'))
	}
	getSalePerson(username){
		this.auth.getSalePerson(username).then((data)=>{
			this.respone = data;
			this.name  	= this.respone.name;
			this.email	= this.respone.email;
			this.myimage 	= this.respone.imageName
			this.image 	= this.imageUrl+'/'+username+'/'+this.myimage;
			this.loading.dismiss();
		}).catch((er)=>{
			console.log(er);
		});
	}
	
  EditProfile(){
	  if (this.Profile === true) {
				this.Profile = false;
				this.updateProfile = true;
	  }else{
				this.Profile = true;
				this.updateProfile = false;
	  }
  }
  EditPassword(){
		if (this.changePassword === false) {
				this.changePassword = true;
		}else{
				this.changePassword = false;
		}
	}
	
	UpdateMyProfile(v){
		this.LoadingFunction();
		let resp;
		let name = v.name;
		let email = v.email;
		let params = new URLSearchParams('', new CustomencoderProvider());
				params.append('name',name);
				params.append('username',this.username);
				params.append('email',email);
		this.auth.UpdateProfile(params.toString()).then((res)=>{
			resp = res;
			if (resp.status === 200) {
				this.ToastFunction('Successfully Updated');
				this.loading.dismiss();
				this.Profile						= true;
				this.updateProfile 			= false;
				// this.ionViewDidLoad();
				this.Popme();
			}
		}).catch((er)=>{
			console.log(er);
		});
	}

	ChangePassword(v){
		this.LoadingFunction();
		let myresp;
				let newpassword 			= v.newpassword;
				let currentpassword 	= v.currentpassword;
				let confirmpassword 	= v.confirmpassword;
				if (newpassword === confirmpassword) {
						let params = new URLSearchParams('', new CustomencoderProvider());
						params.append('currentpassword',currentpassword);
						params.append('newpassword',newpassword);
						params.append('username',this.username);
						this.auth.ChangePassword(params.toString()).then((resp)=>{
							myresp = resp;
							if (myresp._body === 'UPDATED') {
								this.ToastFunction('Successfully changed your password');
								this.loading.dismiss();
								this.changePassword = false;
								this.ionViewDidLoad();
							}else{
								this.ToastFunction('Please insert valid current password');
							}
						}).catch((er)=>{
							this.ToastFunction('Please try again');
						});
		}else{
			this.loading.dismiss();
			this.ToastFunction('Your password does not matched');
		}
	}


	ToastFunction(x){
		let toast = this.toastCtrl.create({
			message: x,
			duration: 3000
		});
		toast.present();
	}
	LoadingFunction(){
		this.loading = this.loadCtrl.create({
			content: 'Loading ...',
			duration: 40000
		});
		this.loading.present();
	 }

	 UploadImage(){
		this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.externalStorage).then((result)=>{
		// alert('Checking perimition 1 '+ JSON.stringify(result));
		if (result.hasPermission === false) {
			this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then((re)=>{
				this.ValidatandroidPermissions();
			});
		}else{
			this.ValidatandroidPermissions();
		}
		});
	 }
	ValidatandroidPermissions(){
		this.fileChooser.open().then((uri)=>{
       this.filepath.resolveNativePath(uri).then((fileentry)=>{
         let filesName = this.eventData.getfilename(fileentry);
				 let fileext = this.eventData.getfileext(fileentry);
				 switch (fileext) {
						case 'png':
						this.ValidateFile(uri);
						break;
						case 'jpg':
						this.ValidateFile(uri);
						break;
						case 'jpen':
						this.ValidateFile(uri);
						break;
				}
			 });
		}).catch((er)=>{
			console.log(er);
		})
	}
	ValidateFile(uri){
		let options = {
				uri: uri,
				folderName: 'Protonet',
				quality: 50,
				width: 280,
				height: 280
		   } as ImageResizerOptions;
		   this.imageResizer.resize(options).then((filePath)=>{
			this.uploadss(filePath)
		   }).catch((er)=>{
			console.log(er);
		   });
	}
	uploadss(uri){
		this.LoadingFunction();
		this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then((pr)=>{
		const fileTransfer: FileTransferObject = this.transfer.create();
		let options: FileUploadOptions = {
				fileKey: 'file',
				fileName: 'ntw',
				headers: {},
				params: {"key":"UploadImage",'username':this.username},
				chunkedMode : false
			}
		fileTransfer.upload(uri,this.auth.baseUrl+'SalePerson/ManageSaleP.php',options)
		 .then((data) => {
			this.Popme();
			this.image = '';
			this.getSalePerson(this.username)
			this.loading.dismiss();
		 }, (err) => {
			 console.log(err);
			 
		 })
		}).catch((er)=>{
			console.log(er);
		})
		}
	Popme(){
		this.event.publish('ReloadSidemenu',()=>{
			this.navCtrl.setRoot(MyApp);
		})
	}
}
