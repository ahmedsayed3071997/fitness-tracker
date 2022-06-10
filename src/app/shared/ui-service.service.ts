import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  loadingStateChanged = new Subject<boolean>();
  constructor(private snackbarSVC:MatSnackBar) { }

  showSnackbar(message, action, duration) { 
    this.snackbarSVC.open(message, action, {duration:duration})
  }
}
