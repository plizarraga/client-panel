import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";

import { ClientService } from '../_services'
import { Client } from '../_models';
import { timeout } from 'q';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  balanceForm: FormGroup;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getById(this.id)
      .subscribe(client => {
        if(client != null) {
          this.hasBalance = client.balance > 0 ? true : false;
        }
        this.client = client;
        this.balanceForm = this.fb.group({
          balance: [this.client ? this.client.balance : 0]
        });
        console.log(this.client);
      });
  }

  onUpdateBalance() {
    this.client.balance = this.balanceForm.value.balance;
    console.log(this.client)
    this.clientService.update(this.client);
    this.showBalanceUpdateInput = false;
    this.flashMessage.show('Balance Updated', { cssClass: 'alert-success', timeout: 4000 } )
  }

  onDelete() {
    if(confirm('Are you sure?')) {
      this.clientService.delete(this.client);
      this.flashMessage.show('Cliente Deleted', { cssClass: 'alert-success', timeout: 4000 } )
      this.router.navigate(['/']);
    }
  }
}
