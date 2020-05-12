import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  redrtRegister(){
    this.router.navigate(['register']);
  }
  go(){
  	this.router.navigate(['register']);
  }
}
