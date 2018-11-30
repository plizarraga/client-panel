import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from "@angular/fire/firestore";

import { Client } from '../_models'

@Injectable({ providedIn: 'root' })
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientsDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private db: AngularFirestore) {
    this.clientsCollection = db.collection('clients', ref => ref.orderBy('lastName', 'asc'));
   }

  getAll(): Observable<Client[]> {
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.clients;
  }

  create(client: Client) {
    this.clientsCollection.add(client);
  }
}
