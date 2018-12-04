import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from "angular2-flash-messages";

import { ClientService, SettingsService } from '../_services'
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

  constructor(
    private fb: FormBuilder,
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private settingservice: SettingsService,
    private router: Router) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingservice.getSettings().disableBalanceOnAdd;

    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.required],
      balance: [{ value: 0, disabled: this.disableBalanceOnAdd }]
    });
  }

  get f() { return this.clientForm.controls; }

  onSubmit() {
    this.submitted = true;

    if(this.clientForm.invalid) {
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: '4000' })
      return;
    } else {
      this.loading = true;
      this.Client = this.clientForm.value;
      this.Client.balance = this.Client.balance || 0;
      this.clientService.create(this.Client);
      this.router.navigate(['/']);
      this.flashMessage.show('New Client added', { cssClass: 'alert-success', timeout: '4000' });
    }
  }
}
