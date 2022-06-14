import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import * as fromRoot from "../../app.reducer";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  authSubscription: Subscription;
  isAuth$:Observable<boolean>;
  constructor( private authService:AuthService,private store:Store<fromRoot.State>) { }

  ngOnInit(): void {
    // this.authSubscription = this.authService.authChange.subscribe(
    //   (authState:any) => {
    //     this.isAuth = authState
    //   }
    // )
    this.isAuth$ =  this.store.select(fromRoot.getIsAuthanticated)
  }
  onCloseSidenav() {
    this.closeSidenav.emit()
  }
  onLogout() {
    this.authService.logout();
    this.onCloseSidenav()
  }
}
