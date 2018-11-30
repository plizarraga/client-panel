import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ClientService } from '../_services'
import { Client } from '../_models';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  totalOwed: number = 0;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getAll()
      .subscribe(clients => {
        console.log(clients);
        this.clients = clients;
        this.getTotalOwed();
      });
  }

  getTotalOwed() {
    this.totalOwed = this.clients.reduce((total, client) =>{
      return total + client.balance;
    }, 0);
  }

}
