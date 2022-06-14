import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import * as firebase from 'firebase'
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining$:Observable<boolean>;
  message:any = null;
  // exersiceSubscription: Subscription;

  constructor(private trainingService:TrainingService, private store:Store) { }

  ngOnInit(): void {
    // this.exersiceSubscription = this.trainingService.exericseChanged.subscribe(
    //   (exercise) => {
    //     exercise ? this.ongoingTraining = true : this.ongoingTraining = false;
    //   }
    // )
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);


    this.requestPermission();
    this.listen();
  }


  requestPermission() {
    const messaging = firebase.default.messaging();
    messaging.getToken(
      { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }

  listen() {
    const messaging = firebase.default.messaging();
    messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
    });
  }

  ngOnDestroy(): void {
    // if (this.exersiceSubscription) {
    //   this.exersiceSubscription.unsubscribe();
    // }
  }

}
