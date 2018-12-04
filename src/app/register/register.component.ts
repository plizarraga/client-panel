import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../_services/";
import { MustMatch } from '../_helpers/must-match.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {

    this.registerForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });

    this.authService.isAuth()
      .subscribe(auth => {
        if (auth) {
          this.router.navigate(['/'])
        }
      });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    } else {
      this.loading = true;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;

      this.authService.register(email, password)
        .then(res => {
          this.flashMessage.show('You are now register', { cssClass: 'alert-success', timeout: 4000 })
          this.router.navigate(['/']);
        })
        .catch(err => {
          this.flashMessage.show(err.message, { cssClass: 'alert-danger', timeout: 4000 })
        })
    }
  }
}
