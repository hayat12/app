import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { FileChooser} from '@ionic-native/file-chooser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Http, Headers, RequestOptions} from '@angular/http';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Diagnostic } from '@ionic-native/diagnostic';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { Alert } from 'ionic-angular/components/alert/alert';
// import { MomentModule } from 'angular2-moment';
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-my-files',
  templateUrl: 'my-files.html',
})
export class MyFilesPage {
 	actionSheetCtrl								  : any;
  takePicture 								    : any;
  imageFileName                   : any;
  myfiles                         : any;
  downloadResul                   : any;
  UploadResult                    : any;
  salePersonId                    : any;
  filesResonse                    : any;
  filestatus                      : any;
  url                             : any;
  myicon                          : any;
  constructor(
  			public 	navCtrl 					: NavController,
  			private transfer 					: FileTransfer, 
        private http              : Http,
        public photoviewer        : PhotoViewer,
        private alertCtrl         : AlertController,
        private auth              : AuthProvider,
        private androidPermissions:AndroidPermissions,
        public loadCtrl           : LoadingController,
        public Ctrltoast          : ToastController,
  			private filechooser 			: FileChooser,
        private filePath 					: FilePath,
        private EventData         : EventDataProvider,
        private diagnostic        : Diagnostic,
  			public  navParams 				: NavParams) {          
  }
  ionViewDidLoad() {
    this.auth.GetStorageData().then((data)=>{
      if(data!=null){
        this.salePersonId = data;
        this.getFiles(this.salePersonId);
      }else{
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }
  getFiles(id){
    this.auth.getFile(id).then((res)=>{
      this.filesResonse = res;
    }).catch((err)=>{
      console.log(err);
    });
  }
  manageFile(v){
    let alert = this.alertCtrl.create({
      title: 'Delete',
      subTitle: 'are you sure you want delete '+v.orgfilename,
      buttons : 
      [
         { text: 'Delete',
           handler: data=>{
            this.DeleteFile(v);
         }},
         {
          text:'Cancel',
          handler: data=>{
          }
        }
        ]
      });
      alert.present();
    }

    DeleteFile(d){
      return new Promise((resolve, reject) => {
        let body 		   : 	string 		=	"key=DeleteFile&id=" +d.id
                                    + "&filename="+d.filename,
            type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
            headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
            options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
            url 		   : 	any 		  = 	this.auth.baseUrl+"files/manageFile.php";
           this.http.post(url,body,options)
           .subscribe(res => {
                this.navCtrl.setRoot(MyFilesPage);
                let text = 'successfully deleted';
                this.ToastMaker(text);
              }, (err) => {
                reject(err);
              });
    });
    }
    ToastMaker(text){
      let toest = this.Ctrltoast.create({
        message:text,
        duration: 2000
      });
      toest.present();
    }
    manageMyFile(){
      let alert = this.alertCtrl.create({
        title: 'Add File ',
        subTitle: 'Uplaod file ',
        buttons : 
        [
           { 
             text: 'Upload',
             handler: data=>{
              this.diagnostic.getExternalStorageAuthorizationStatus().then((e)=>{
                this.OpenFile();
                }).catch(error=>{
                console.log(error);
                });
           }},
           {
            text:'Cancel',
            handler: data=>{
            }
          }
          ]
        });
    alert.present();
    }

  OpenFile(){
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.externalStorage).then((result)=>{
        // alert('Checking perimition 1 '+ JSON.stringify(result));
    if (result.hasPermission === false) {
      this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then((re)=>{
        // Here the permition is has truned on 
            // alert('Turned on now 2 '+ JSON.stringify(re));
            this.TakePath();
          }).catch(()=>{
            console.log("err1");
          })
    } else {
            // alert('Already on 3 '+ JSON.stringify(result));
            this.TakePath();
          }
      }).catch((er)=>{
        console.log(er); 
      })
    }

    TakePath(){
            this.filechooser.open()
            .then((uri) =>{
             this.filePath.resolveNativePath(uri).then((fileentry)=>{
               let filesName = this.EventData.getfilename(fileentry);
               let fileext = this.EventData.getfileext(fileentry);
               switch (fileext) {
                 case 'pdf':
                 this.uploadss(uri,filesName,fileext);
                   break;
                   case 'docx':
                   this.uploadss(uri,filesName,fileext);
                   break;
                   case 'png':
                   this.uploadss(uri,filesName,fileext);
                   break;
                   case 'jpg':
                   this.uploadss(uri,filesName,fileext);
                   break;
                   case 'jpen':
                   this.uploadss(uri,filesName,fileext);
                   break;
                   case 'jfif':
                   this.uploadss(uri,filesName,fileext);
                   break;
                   case 'gif':
                   this.uploadss(uri,filesName,fileext);
                   break;
                   case 'txt':
                   this.uploadss(uri,filesName,fileext);
                   break;
                 default:
                 return this.ToastMaker('This file can not update please try different format');
               }
             }).catch((er)=>{
               console.log(er);
             });
            }).catch(e => console.log(e));
      }

    uploadss(uri,fName,filetype){
          
          const fileTransfer: FileTransferObject = this.transfer.create();
          let options: FileUploadOptions = {
              fileKey: 'file',
              fileName: fName,
              headers: {},
              params: {"key":"UploadIage",'username':this.salePersonId},
              chunkedMode : false
          }
          fileTransfer.upload(uri,this.auth.baseUrl+'files/tryf.php',options)
          .then((data) => {
            if(data.responseCode == 200){
              if(data.response ==='SUCCESS'){
                this.presentLoadingCustom();
              }
            }
          }, (err) => {
            // error
            console.log(err);
          })
      }
      presentLoadingCustom() {
        let loading = this.loadCtrl.create({
          spinner: 'hide',
          content: `Loading ...`,
          duration: 1000
        });
        loading.onDidDismiss(() => {
          this.navCtrl.setRoot(MyFilesPage);
        });
        loading.present();
      }
      OpenMyFile(fname){
        var filename = fname.filename;
        cordova.InAppBrowser.open('http://110.4.41.78/sales/files/myfiles/uploads/'+filename,"_system", "location=no");
      }
    }