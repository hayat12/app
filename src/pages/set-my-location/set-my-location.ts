import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { GoogleMaps, GoogleMapsEvent, GoogleMapOptions } from '@ionic-native/google-maps';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
@IonicPage()
@Component({
  selector: 'page-set-my-location',
  templateUrl: 'set-my-location.html',
})
export class SetMyLocationPage{
  codeResult            : any;
  locationfullname      : any;
  map                   : any;
  mapElement            : any;

  lat                   : number = 0;
  lng                   : number = 0;
  
  @ViewChild('search') public searchElement: ElementRef;
  constructor (
    public navCtrl          : NavController,
    public madolCtrl        : ModalController,
    public viewCtrl         : ViewController,
    private googleMaps      : GoogleMaps,
    public locationaccuracy : LocationAccuracy,
    public navParams        : NavParams) {
  }
  ionViewDidLoad(){
    this.lat = this.navParams.get('lat');
    this.lng = this.navParams.get('lng');
    this.MyLocationAcurency(this.navParams.get('lat'),this.navParams.get('lng'));
  }
  MyLocationAcurency(lat,lng){
    this.locationaccuracy.canRequest().then((canRequest: boolean) => {
      if(canRequest) {
        this.locationaccuracy.request(this.locationaccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            this.loadMap(lat,lng);
          },
          error => console.log('Error requesting location permissions', error)
        );
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
            zoom: 16,
            tilt: 30,
        }
      };
      this.map = this.googleMaps.create(this.mapElement, mapOptions);
      // Wait the MAP_READY before using any methods.
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          this.map.addMarker({
              title: 'Mylocation',
              icon: 'rad',
              animation: 'DROP',
              draggable: false,
              position: {
                lat: lat,
                lng: lng
              }
            });
        });
  }

} 
 