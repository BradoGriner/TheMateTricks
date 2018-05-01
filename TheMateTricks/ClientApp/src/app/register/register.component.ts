import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //model = {}; Model for submission
  model = { userName: '', password: '' };
  //Declare the password confirmation model
  PasswordConfirmation = { passwordConfirm: '' }
  AcctSuccess = false;
  constructor(public AuthService: AuthService) { }

  ngOnInit() {
  }
  //Method used to verify the password
  PassVerify() {
    return this.model.password == this.PasswordConfirmation.passwordConfirm;
   
  }
  //Method used to check if an account was created
  AccountCreation() {
  return this.AcctSuccess;
}
  
  register() {
    console.log(this.model);
    if (this.PassVerify()) {
      this.AcctSuccess = true;
      if (this.AccountCreation()) {
        this.AuthService.Register(this.model).subscribe(data => console.log(data), error => console.log(error));
      }
    }
  }
}
