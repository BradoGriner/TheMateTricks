import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model = {};
  isCollapsed = false;
  loggedIn = false;
  //user = localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')).userName: '';
  alertPlaying = false;
  alert = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  

  login() {
      this.authService.login(this.model).subscribe(data => console.log(data), error => console.log(error));
  }

  playAlert(errorStatus) {
    this.alertPlaying = true;
    if (errorStatus == 401) {
      this.alert = {
        type: 'danger',
        msg: 'Invalid userName and/or password', //test
        timeout: 2000
      };
    } else if (errorStatus == 0) {
      this.alert = {
        type: 'success',
        msg: 'Successfully Logged In',
        timeout: 2000
      };
    } else if (errorStatus == -1) {
      this.alert = {
        type: 'info',
        msg: 'Logged out',
        timeout: 2000
      };
    }
  }
  closeAlert() {
    this.alertPlaying = false;
  }

  logOut() {
    this.authService.logOut();
    this.playAlert(-1);
  }

  checkLogin() {
    return this.authService.isExpired();
  }
}
