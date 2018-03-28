import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AccountPage } from '../pages/account/account';
import { ActivityPage } from '../pages/activity/activity';
import { ContactPage } from '../pages/contact/contact';
import { ContactPersonPage } from '../pages/contact-person/contact-person';
import { EventPage } from '../pages/event/event';
import { LoginPage } from '../pages/login/login';
import { MyFilesPage } from '../pages/my-files/my-files';
import { NewAccountPage } from '../pages/new-account/new-account';
import { NewContactPage } from '../pages/new-contact/new-contact';
import { NewEventPage } from '../pages/new-event/new-event';
import { NewOpportunityPage } from '../pages/new-opportunity/new-opportunity';
import { NewSalesPage } from '../pages/new-sales/new-sales';
import { NewTaskPage } from '../pages/new-task/new-task';
import { OpportunityPage } from '../pages/opportunity/opportunity';
import { SalesPersonPage } from '../pages/sales-person/sales-person';
import { TaskPage } from '../pages/task/task';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { RespectiveAccountPage } from '../pages/respective-account/respective-account'
import { StarterPage } from '../pages/starter/starter';
import { SetMyLocationPage } from '../pages/set-my-location/set-my-location';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { AuthProvider } from '../providers/auth/auth';

import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';

import { SecureStorage } from '@ionic-native/secure-storage';
import { AgmCoreModule } from '@agm/core';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
import { TrackingProvider } from '../providers/tracking/tracking';
import { UploaderProvider } from '../providers/uploader/uploader';
import { EmailComposer } from '@ionic-native/email-composer';

import { FileOpener } from '@ionic-native/file-opener';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Network } from '@ionic-native/network';
import { BrowserTab } from '@ionic-native/browser-tab';
import { StagesPage } from '../pages/stages/stages';
import { CloseMyOpportunityPage } from '../pages/close-my-opportunity/close-my-opportunity';
import { ChangeStagePage } from '../pages/change-stage/change-stage';
import { MyStagePage } from '../pages/my-stage/my-stage';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { MapPikerPage } from '../pages/map-piker/map-piker';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { EventDataProvider } from '../providers/event-data/event-data';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { MyEmailPage} from '../pages/my-email/my-email';
import { NotConnectionPage } from '../pages/not-connection/not-connection';
import { CustomencoderProvider } from '../providers/customencoder/customencoder';
import { Diagnostic } from '@ionic-native/diagnostic';
import { ImagePicker } from '@ionic-native/image-picker';
import { ImageResizer } from '@ionic-native/image-resizer';
@NgModule({
  declarations: [
    MyApp,
    MapPikerPage,
    MyStagePage,
    ChangeStagePage,
    CloseMyOpportunityPage,
    HomePage,
    ForgetPasswordPage,
    AccountPage,
    ActivityPage,
    ContactPage,
    ContactPersonPage,
    EventPage,
    LoginPage,
    SetMyLocationPage,
    StarterPage,
    RespectiveAccountPage,
    MyFilesPage,
    NewAccountPage,
    NewContactPage,
    NewEventPage,
    StagesPage,
    NewOpportunityPage,
    NewSalesPage,
    SignUpPage,
    NewTaskPage,
    OpportunityPage,
    SalesPersonPage,
    TaskPage,
    MyEmailPage,
    NotConnectionPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBXKX0M33K2vGl4xLO3wIdH49ogbYp1row',
      libraries: ['places']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPikerPage,
    CloseMyOpportunityPage,
    HomePage,
    MyStagePage,
    AccountPage,
    StarterPage,
    ActivityPage,
    SignUpPage,
    StagesPage,
    ContactPage,
    ContactPersonPage,
    EventPage,
    NotConnectionPage,
    SetMyLocationPage,
    RespectiveAccountPage,
    ForgetPasswordPage,
    LoginPage,
    MyFilesPage,
    NewAccountPage,
    NewContactPage,
    NewEventPage,
    NewOpportunityPage,
    NewSalesPage,
    NewTaskPage,
    OpportunityPage,
    SalesPersonPage,
    TaskPage,
    ChangeStagePage,
    MyEmailPage,
  ],
  providers: [
    StatusBar,
    SecureStorage,
    FileChooser,
    FileTransfer,
    File,
    BrowserTab,
    FilePath,
    GoogleMaps,
    Camera,
    NativeGeocoder,
    EmailComposer,
    Geolocation,
    Network,
    InAppBrowser,
    FileOpener,
    PhotoViewer,
    BackgroundGeolocation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    TrackingProvider,
    UploaderProvider,
    DocumentViewer,
    LaunchNavigator,
    LocationAccuracy,
    AndroidPermissions,
    EventDataProvider,
    Diagnostic,
    CustomencoderProvider,
    ImagePicker,
    ImageResizer
  ]
})
export class AppModule {}
