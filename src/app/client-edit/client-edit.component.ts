import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from "angular2-flash-messages";

import { ClientService } from '../_services'
import { Client } from '../_models';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  id: string;
  client: Client;
  clientForm: FormGroup;
  submitted: boolean = false;

  disableBalanceOnAdd: boolean = true;

  constructor(
    private fb: FormBuilder,
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.required],
      balance: [{ value: '', disabled: this.disableBalanceOnAdd }]
    });

    this.id = this.route.snapshot.params['id']

    this.clientService.getById(this.id)
      .subscribe(client => {
        console.log(client)
        this.client = client;
        this.clientForm.controls.firstName.setValue(client.firstName);
        this.clientForm.controls.lastName.setValue(client.lastName);
        this.clientForm.controls.email.setValue(client.email);
        this.clientForm.controls.phone.setValue(client.phone);
        this.clientForm.controls.balance.setValue(client.balance);
      });
  }

  get f() { return this.clientForm.controls; }

  onSubmit() {
    this.submitted = true;

    if(this.clientForm.invalid) {
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout: '4000' })
      return;
    } else {
      this.clientForm.value.id = this.id;
      this.clientService.update(this.clientForm.value);
      this.router.navigate([`/client/${this.id}`]);
      this.flashMessage.show('Client Updated', { cssClass: 'alert-success', timeout: '4000' });
    }
  }
}
