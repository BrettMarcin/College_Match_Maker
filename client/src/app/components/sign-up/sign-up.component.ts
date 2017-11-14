import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { Title } from '@angular/platform-browser';
import { Http, Headers, RequestOptions } from '@angular/http'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  username = new FormControl("", [Validators.required, Validators.minLength(5)]);
  email = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", [Validators.required, Validators.minLength(5), this.checkIfPasswordIsValid]);
  password_confirm = new FormControl("", [Validators.required, Validators.minLength(5)]);
  userTaken:boolean = true;
  submitted: boolean;
  //userService: UserService;

  constructor(private fb: FormBuilder, private title: Title, private userService: UserService, private http:Http) {
    //this.userService = userService;
    this.title.setTitle('Sign-up');
    this.form = fb.group({
      "username": this.username,
      "email": this.email,
      "password": this.password,
      "password_confirm": this.password_confirm,
    },
      {
        validator: this.checkIfMatchingPasswords('password', 'password_confirm')
      });
    this.submitted = false;
  }

  ngOnInit() { }

  save(model: User, isValid: boolean) {
    this.submitted = true;
    console.log(model, isValid);
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  checkIfPasswordIsValid(fieldControl: FormControl) {
      let passwordInput = fieldControl.value;
      var re = new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$');
      if (re.test(passwordInput)) {
        return null;
      } else {
        return {passwordValid: true};
      }
  }

  checkValidUser(userName: string){
      let headers = new Headers({ 'content-type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.get('/api/checkUserName?theUser=' + userName, options)
        .map(response => {
          return response.json();
        });
  }

  checkValidUserControl(fieldControl: FormControl) {
    console.log('Called');
    let userName = fieldControl.value;
    var theResult = false;
    this.checkValidUser(userName).subscribe(
      data => {
        theResult = data;
      }
    );
    if (theResult) {
      return null;
    } else {
      return {userNameValid: true};
    }
  }


}
