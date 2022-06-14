import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { UiServiceService } from '../shared/ui-service.service';
import { TrainingService } from '../training/training.service';
import { AuthData } from "./auth-data.model";
import * as fromRoot from '../app.reducer';
import * as uiActions from '../shared/ui.actions';
import * as authActions from '../auth/auth.actions';




@Injectable({
  providedIn: 'root',
})

export class AuthService {
    // private user: User;
    // private isAuthanticated = false;
    // authChange = new Subject<boolean>();
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UiServiceService,
        private store: Store<fromRoot.State>) { }
    
    initAuthListner() { 
        this.afAuth.authState.subscribe(user => { 
            if (user) {
                this.store.dispatch(new authActions.SetAuthanticated());
                // this.isAuthanticated = true;
                // this.authChange.next(true);
                this.router.navigate(['/training']);
            } else { 
                this.trainingService.cancelSubs();
                this.store.dispatch(new authActions.SetUnauthanticated());
                // this.isAuthanticated = false;
                // this.authChange.next(false);
                this.router.navigate(['/login']);
            }
        })
    }

    registerUser(authData: AuthData) {
        // this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new uiActions.StartLoading());
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => { 
                this.uiService.showSnackbar('User created', 'OK', 3000);
                // this.uiService.loadingStateChanged.next(false);
            })
            .catch(error => {
                this.uiService.showSnackbar(error.message, 'OK', 3000);
                // this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new uiActions.StopLoading());
                
            });
    }

    login(authData: AuthData) {
        // this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new uiActions.StartLoading());
        this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.uiService.showSnackbar('User logged in', 'OK', 3000);
                // this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new uiActions.StopLoading());
            })
            .catch(error => {
                this.uiService.showSnackbar(error.message, 'OK', 3000);
                // this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new uiActions.StopLoading());
            });
    }

    logout() {
        this.store.dispatch(new uiActions.StartLoading());
        this.afAuth.signOut().then(
            result => { 
                this.store.dispatch(new uiActions.StopLoading());
                this.uiService.showSnackbar('User logged Out', 'OK', 3000);
            }
        )
        .catch(error => {
            this.uiService.showSnackbar(error.message, 'OK', 3000);
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new uiActions.StopLoading());
        });
    }

    getUser() {
        // return {...this.user}
    }

    // isAuth() {
    //     return this.isAuthanticated
    // }

}