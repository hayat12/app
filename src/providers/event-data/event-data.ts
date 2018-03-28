import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
@Injectable()
export class EventDataProvider {
  constructor(
    private storage          : Storage,
    public network          : Network,
    public locationaccuracy  : LocationAccuracy,
    private geolocation      : Geolocation) {
      this.ValidateConection();
  }

  ValidateConection(){
    return new Promise((resolve, reject) => {
      let disconnectSubscription = this.network.onDisconnect().subscribe((boolean) => {
          resolve(false);
      },()=>{
          disconnectSubscription.unsubscribe();
          reject(true);
      });
    });
  }
  Validatedisvonection(){
    return new Promise((resolve, reject) => {
      let disconnectSubscription = this.network.onConnect().subscribe((boolean) => {
          resolve(true);
      },()=>{
          disconnectSubscription.unsubscribe();
          reject(false);
      });
    });
  }
  getfilename(filestring){
       let file 
       file = filestring.replace(/^.*[\\\/]/, '')
       return file;
    }
    getfileext(filestring){
      let file = filestring.substr(filestring.lastIndexOf('.') + 1);
       return file;
    }

  MyLocationAcurency(){
    this.locationaccuracy.canRequest().then((canRequest: boolean) => {
      if(canRequest) {
        this.locationaccuracy.request(this.locationaccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
              let options = { enableHighAccuracy: true, maximumAge: 3000};
              this.geolocation.getCurrentPosition(options).then((position)=>{
                  this.storage.set('myReatimelocation',position);
              }).catch((er)=>{
                console.log(er);
              });
          },
          error => console.log('Error requesting location permissions', error)
        );
      }else{
      }
  })
}
getCurrentPickUplocation(getType){
  return new Promise((resolve, reject) => {
    this.storage.get(getType).then((resp)=>{
      resolve(resp);
    })
  });
}
getCurrentCorporatLocation(getType){
  return new Promise((resolve, reject) => {
    this.storage.get(getType).then((resp)=>{
      resolve(resp);
    })
  });
}

getCurrentContactPersonLocation(getType){
  return new Promise((resolve, reject) => {
    // let body 		   : 	string 		=	  "key=getOpportunityForAccountDetails&id="+id,
    //     type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
    //     headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
    //     options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
    //     url 		   : 	any 		  = 	this.baseUrl+"Opportunity/retriveOppo.php";
    //    this.http.post(url,body,options)
    //    .subscribe(res => {
    //           resolve(res.json());
    //       }, (err) => {
    //         reject(err);
    //       });
  });
}

setMylocations(addresstype,value){
  return new Promise((resolve, reject) => {
      this.storage.set(addresstype,value).then((boolean)=>{
        resolve(true);
      }).catch((er)=>{
        console.log(er);
      });
  });
}

}
