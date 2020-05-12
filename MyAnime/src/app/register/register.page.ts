import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { accessProvider } from "../providers/access-provider-register";
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nick_name: string = "";
  password: string = "";
  confirm_password: string = "";
  disabledButton;
  private loaderPrivate;

  constructor(
    private route: Router,
    private toastCtrl: ToastController,
    private loadngCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accessProvider: accessProvider
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
      this.disabledButton = false;
  }

  tryRegister(){

    if (this.nick_name == "") {
      this.presentToast("The nickName is requerid.");
    }else if(this.password == "" || this.password == null){
      this.presentToast("Password is requerid.");
    }else if(this.confirm_password == "" || this.password == null){
      this.presentToast("Comfirm Password is requerid.");
    }else if(this.password != this.confirm_password){
      this.presentToast("Password are not the same.");
    }else{
      this.disabledButton = true;

      this.loadngCtrl.create({
          message: "Please wait..."
        }).then((overlay) => {
          this.loaderPrivate = overlay;
          this.loaderPrivate.present();
        });

      //this.presenLoader("Please wait ...");

      return new Promise(resolve => {
        let fields ={
          post_data: {
          execute: "proccess_new",
          name: this.nick_name,
          password: this.password
          }
        }

        this.accessProvider.postData(fields, 'index.php').subscribe((res:any)=>{
            if(res.exito == true){
              setTimeout(() => {
                this.loaderPrivate.dismiss();
                this.disabledButton = false;
                this.presentToast("You account has been created");
                this.route.navigate(['home']);
              }, 1000);

            }else{

              setTimeout(() => {
                this.loaderPrivate.dismiss();
                this.disabledButton = false;
                this.presentToast("You account has not been created");
              }, 1000);

            }
        },(err)=>{
          this.disabledButton = false;

          setTimeout(() => {
            this.loaderPrivate.dismiss();
            this.presentAlert("Timeout");
          }, 1000);
          //console.log("llega");
        });


      });
    }
  }

  redrtHome(){
    this.route.navigate(['home']);
  }

  async presentToast(text){
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  async presentAlert(text) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: text,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        }, {
          text: 'Try Again',
          handler: () => {
            this.tryRegister();

          }
        }
      ]
    });

    await alert.present();
  }
}
