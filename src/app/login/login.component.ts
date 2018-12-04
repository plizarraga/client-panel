import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../_services/";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {

    this.authService.isAuth()
      .subscribe(auth => {
        if (auth) {
          this.router.navigate(['/'])
        }
      });

    this.loginForm = this.fb.group({
      email: ['plizarraga86@gmail.com', Validators.compose([Validators.required, Validators.email])],
      password: ['123456', Validators.required]
    });
  }

  get f() { return this.loginForm.controls };

  onSubmit() {
    this.submitted = true;

    if(this.loginForm.invalid) {
      return;
    } else {
      this.loading = true;
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authService.login(email, password)
        .then(res => {
          this.router.navigate(['/']);
        })
        .catch(err => {
          this.flashMessage.show('Invalid email or password', { cssClass: 'alert-danger', timeout: 4000})
          console.log(err)
        })
    }
  }
}
