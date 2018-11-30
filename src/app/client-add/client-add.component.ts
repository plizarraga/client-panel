import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Client } from '../_models';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {
  Client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  clientForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  disableBalanceOnAdd: boolean = true;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['test@test.com', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.required],
      balance: ['']
    });
  }

  get f() { return this.clientForm.controls; }

  onSubmit() {
    this.submitted = true;

    if(this.clientForm.invalid) {
      return;
    }

    this.Client = this.clientForm.value;

    console.log(this.Client)

    this.loading = true;
  }

}
