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

  getById(id: string): Observable<Client> {
    this.clientsDoc = this.db.doc<Client>(`clients/${id}`);
    this.client = this.clientsDoc.snapshotChanges().pipe(
      map(action =>  {
        if(action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.client;
  }

  create(client: Client) {
    this.clientsCollection.add(client);
  }

  update(client: Client) {
    this.clientsDoc = this.db.doc(`clients/${client.id}`);
    this.clientsDoc.update(client);
  }

  delete(client: Client) {
    this.clientsDoc = this.db.doc(`clients/${client.id}`);
    this.clientsDoc.delete();
  }
}
