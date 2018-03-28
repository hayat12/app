import { Injectable, NgZone } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../auth/auth';

import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

@Injectable()
export class TrackingProvider {

  public watch: any;    
  public lat: number = 0;
  public lng: number = 0;
  public mylocation : any;

  constructor(
        public http 			              : Http,
        private storage                 : Storage,
        private auth                    : AuthProvider,
        public zone                     : NgZone,
        public backgroundGeolocation    : BackgroundGeolocation, 
        public geolocation              : Geolocation) {

  }
  load(){
    // Background Tracking
        let config = {
            desiredAccuracy: 5,
            stationaryRadius: 20,
            distanceFilter: 10, 
            debug: false,
            interval: 1000
        };  
        this.backgroundGeolocation.configure(config).subscribe((location) => {
          // Run update inside of Angular's zone
            this.zone.run(() => {
            this.lat = location.coords.latitude;
            this.lng = location.coords.longitude;
          });
        }, (err) => {
          console.log(err);
        });
        // Turn ON the background-geolocation system.
          this.backgroundGeolocation.start();
        // Foreground Tracking
        let options = {
          frequency: 1, 
          enableHighAccuracy: true
        };
      this.watch = this.geolocation.watchPosition(options).subscribe((position: Geoposition) => {
        // Run update inside of Angular's zone
        console.log(position);
          this.zone.run(() => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.auth.GetStorageData().then((res)=>{
              let username = res;
              let body 		   : 	string 		=	"key=insert&lat=" +this.lat
                                          + "&lng="+this.lng
                                          + "&username="+username,
                  type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
                  headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
                  options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
                  url 		   : 	any 		  = 	this.auth.baseUrl+"Map/ManageLocation.php";
                 this.http.post(url,body,options)
                 .subscribe(res => {
                 });
            });
          });
      });
  }
  getLocations(){
    return new Promise((resolve, reject) => {
        this.auth.GetStorageData().then((res)=>{ 
        let body 		   : 	string 		=	"key=viewLocations&id=" +res,
            type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
            headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
            options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
            url 		   : 	any 		  = 	this.auth.baseUrl+"Map/ManageLocation.php";
            this.http.post(url,body,options)
	  		        .subscribe(res => {
                resolve(res.json());
              }, (err) => {
                reject(err);
              });
          });
	  });
  }
  getCurrentLocations(){
    return new Promise((resolve, reject) => {
      this.storage.get('start_Tracking').then((tracker)=>{
        if(tracker !=null){
          this.auth.GetStorageData().then((res)=>{ 
          let body 		   : 	string 		=	"key=CurrentLocation&id=" +res,
              type       : 	string  	= 	"application/x-www-form-urlencoded; charset=UTF-8",
              headers 	 : 	any 		  = 	new Headers({ 'Content-Type': type}),
              options 	 : 	any 		  = 	new RequestOptions({headers : headers}),
              url 		   : 	any 		  = 	this.auth.baseUrl+"Map/ManageLocation.php";
              this.http.post(url,body,options)
                  .subscribe(res => {
                  resolve(res.json());
                }, (err) => {
                  reject(err);
                });
            });
        }
      }).catch((err)=>{
        console.log(err);
      });
	  });
  }
}
