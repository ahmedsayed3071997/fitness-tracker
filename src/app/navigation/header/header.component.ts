import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import * as fromRoot from "../../app.reducer";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$:Observable<boolean>;
  authSubscription: Subscription;
  constructor(private authService:AuthService,private store:Store<fromRoot.State>) { }

  ngOnInit(): void {
    // this.authSubscription = this.authService.authChange.subscribe(
    //   (authState: boolean) => {
    //     this.isAuth = authState
    //   }
    // );

    this.isAuth$ =  this.store.select(fromRoot.getIsAuthanticated)
  }

  onToggle() {
    this.sidenavToggle.emit();
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe()
  }
}
