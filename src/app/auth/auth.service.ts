import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UiServiceService } from '../shared/ui-service.service';
import { TrainingService } from '../training/training.service';
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";



@Injectable({
  providedIn: 'root',
})

export class AuthService {
    // private user: User;
    private isAuthanticated = false;
    authChange = new Subject<boolean>();
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService:UiServiceService) { }
    
    initAuthListner() { 
        this.afAuth.authState.subscribe(user => { 
            if (user) {
                this.isAuthanticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else { 
                this.trainingService.cancelSubs();
                this.isAuthanticated = false;
                this.authChange.next(false);
                this.router.navigate(['/login']);
            }
        })
    }

    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => { 
                this.uiService.showSnackbar('User created', 'OK', 3000);
                this.uiService.loadingStateChanged.next(false);
            })
            .catch(error => {
                this.uiService.showSnackbar(error.message, 'OK', 3000);
                this.uiService.loadingStateChanged.next(false);
            });
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.uiService.showSnackbar('User logged in', 'OK', 3000);
                this.uiService.loadingStateChanged.next(false);
            })
            .catch(error => {
                this.uiService.showSnackbar(error.message, 'OK', 3000);
                this.uiService.loadingStateChanged.next(false);
            });
    }

    logout() {
        this.afAuth.signOut()
    }

    getUser() {
        // return {...this.user}
    }

    isAuth() {
        return this.isAuthanticated
    }

}