import { Component, NgZone, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams, LoadingController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { GoogleMaps, GoogleMapsEvent, GoogleMapOptions, CameraPosition } from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Geolocation } from '@ionic-native/geolocation';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Platform } from 'ionic-angular/platform/platform';
import { Events } from 'ionic-angular';
import { NotConnectionPage } from '../not-connection/not-connection';
import { MapsAPILoader } from '@agm/core';
import {} from 'tpes/googlemaps';

@IonicPage()
@Component({
  selector: 'page-map-piker',
  templateUrl: 'map-piker.html',
})
export class MapPikerPage {

    mapElement                        : any;
    map                               : any;
    type                              : any;
    center                            : any;
    mpName                            : any;
    mpPostCode                        : any;
    mpArea                            : any;
    mpPlocality                       : any;
    mpsubLocality                     : any;
    mpfare                            : any;
    mpsubfare                         : any;
    pin                               : boolean = false;
    myrealtimelocation                : any;
    loading                           : any;
    spiner                            : boolean = false;

    @ViewChild('search') public searchElement: ElementRef;
  constructor(
        public navCtrl         	 	 	      : NavController,
        private googleMaps                : GoogleMaps,
        public camera                     : Camera,
        public viewCtrl                   : ViewController, 
        private zone                      : NgZone,
        private geolocation               : Geolocation,
        public locationaccuracy           : LocationAccuracy,
        private eventdata                 : EventDataProvider,
        public loadCtrl                   : LoadingController,
        private nativeGeocoder            : NativeGeocoder,
        private event                     : Events,
        public platform                   : Platform,
        private mapsAPILoader             : MapsAPILoader,
        private launchNavigator           : LaunchNavigator,
        public navParams 						      : NavParams) {

    }
  ngOnInit(){
    if (this.searchElement.nativeElement === null) {
      return;
    }else{
      this.mapsAPILoader.load().then(()=>{
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement);
        autocomplete.addListener("place_changed",(e)=>{
          this.zone.run(()=>{
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;  
            }
            this.reloadMap(place.geometry.location.lat(),place.geometry.location.lng());
          })
        })
      });
    }
  }

  ionViewDidLoad(){
			this.eventdata.ValidateConection().then((e)=>{
				if (e != true) {
					this.navCtrl.setRoot(NotConnectionPage);
				}
			}).catch((er)=>{
			});
    this.LoadFunction();
    this.type = this.navParams.get('lct');
    if (this.navParams.get('entry')==='Update'){
      var lat = this.navParams.get('lat');
      var lng = this.navParams.get('lng');
      this.loadMap(lat,lng);
    } else if(this.navParams.get('entry') ==='NewEntery'){ 
      this.MyLocationAcurency();
    }
  }
  MyLocationAcurency(){
    this.locationaccuracy.canRequest().then((canRequest: boolean) => {
      if(canRequest){
        this.locationaccuracy.request(this.locationaccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            let options = {
                timeout: 30000,
                enableHighAccuracy: true
            }
            this.geolocation.getCurrentPosition(options).then((data) => {
                var lat = data.coords.latitude;
                var lng = data.coords.longitude;
                this.loadMap(lat,lng);
            });
          },
           error => console.log('Error requesting location permissions', error)
        );
      }else{
        this.launchNavigator.APP.enableGeolocation = true;
      }
  })
}

loadMap(lat,lng){
    this.mapElement = document.getElementById('map');
    let mapOptions: GoogleMapOptions = {
      camera: {
        duration: 40,
        target: {
          lat: lat,
          lng: lng
        },
          zoom: 10,
          tilt: 30,
      }
    };
    this.map = this.googleMaps.create(this.mapElement, mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
            this.loading.dismiss();
            this.currentMarker(lat,lng);
            this.getGeoCoder(lat,lng);
            this.getMycurrentlocation(lat,lng)
            this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((result)=>{
                this.map.clear();
                this.spiner = true;
                this.AddNewMarker(result.lat,result.lng);
            })
      });
  }
  reloadMap(lat,lng){
    this.map.clear();
    this.spiner = true;
    this.AddNewMarker(lat,lng);
  }
  currentMarker(lat,lng){
    this.map.addMarker(
      {
        title     : 'Mylocation',
        icon      : 'rad',
        animation : 'DROP',
        position  : { lat: lat,lng: lng },
        draggable : false
      });
  }
  AddNewMarker(lat,lng){
    this.map.addMarker(
      {
          title     : 'Mylocation',
          icon      : 'rad',
          animation : 'DROP',
          position  : { lat: lat,lng: lng },
          draggable : false
      }).then((marker)=>{
          this.getGeoCoder(lat,lng);
          this.getMycurrentlocation(lat,lng)
        });
  }
  getMycurrentlocation(lat,lng){
      var markerlocation = {lat: lat,lng: lng};
      this.eventdata.setMylocations(this.type,markerlocation).then((resp)=>{
        if (resp === true) {
  
        } else{
          this.navCtrl.pop();
        }
      }).catch((er)=>{
        console.log(er); 
      });
  }
  getGeoCoder(lat,lng){
    this.ResetLebals();
    this.nativeGeocoder.reverseGeocode(lat,lng)
    .then((result: NativeGeocoderReverseResult) =>{
                    if (result.countryName != undefined) {
                      this.mpName = result.countryName;
                    }
                    if(result.postalCode != undefined) {
                      this.mpPostCode = result.postalCode +',';
                    }
                    if(result.administrativeArea != undefined) {
                      this.mpArea = result.administrativeArea +',';
                    }
                    if(result.locality != undefined) {
                      this.mpPlocality = result.locality +',';
                    }
                    if(result.subLocality != undefined) {
                      this.mpsubLocality = result.subLocality +',';
                    }
                    if(result.thoroughfare != undefined) {
                      this.mpfare = result.thoroughfare +',';
                    }
                    if(result.subThoroughfare != undefined) {
                      this.mpsubfare = result.subThoroughfare +',';
                    }
        this.spiner = false;
    }).catch((error: any) => console.log(error));
  this.nativeGeocoder.forwardGeocode('Berlin')
    .then((coordinates: NativeGeocoderForwardResult) => console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude))
    .catch((error: any) => console.log(error));
  }
  LoadFunction(){
    this.loading = this.loadCtrl.create({
      content: 'loading...',
      duration: 60000
    });
    this.loading.present();
  }
  PopPicker(){
    this.event.publish(this.type);
      this.navCtrl.pop();
  }
  
  ResetLebals(){
    this.mpName            = '';
    this.mpPostCode        = '';
    this.mpArea            = '';
    this.mpPlocality       = '';
    this.mpsubLocality     = '';
    this.mpfare            = '';
    this.mpsubfare         = '';
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
