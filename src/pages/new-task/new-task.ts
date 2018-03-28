import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
@IonicPage()
@Component({
  selector: 'page-new-task',
  templateUrl: 'new-task.html',
})
export class NewTaskPage {

  Subject : any;
  DueDate : any;
  taskid  : any;
  salePid : any;
  public contactPerson : any;
  
  constructor(
    public navCtrl    : NavController,
    public alertCtrl  : AlertController,
    public loadCtrl   : LoadingController, 
    private auth      : AuthProvider,
    public navParams  : NavParams) {
  }

  ionViewDidLoad() {
    this.getTask(this.navParams.get('tsk'));
  }
  getTask(e){
    this.Subject = e.subject;
    this.DueDate = e.dueDate;
    this.salePid = e.SaleP_username;
    this.taskid  = e.id;
  }

  ManageTask(){
    let alert = this.alertCtrl.create({
      title: 'Manage Task',
      subTitle: 'Edit or Delete'+this.Subject,
      buttons: 
      [
        {
          text: 'Edit',
          handler: data=>{
            this.EditTask();
          }
        },
        {
          text: 'Delete',
          handler: data=>{
            this.DeleteTask();
          }
        },
        {
          text: 'Cancel',
          handler: data=>{
          }
        }
      ]
    });
    alert.present();
  }

  EditTask(){
    alert('Edit');
  }

  DeleteTask(){
    this.auth.DeleteTask(this.taskid).then((res)=>{
      this.navCtrl.pop();
    }).catch();
  }
}
