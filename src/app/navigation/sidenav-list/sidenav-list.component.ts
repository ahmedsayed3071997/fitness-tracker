import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  authSubscription: Subscription;
  isAuth = false;
  constructor( private authService:AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authState:any) => {
        this.isAuth = authState
      }
    )
  }
  onCloseSidenav() {
    this.closeSidenav.emit()
  }
  onLogout() {
    this.authService.logout();
    this.onCloseSidenav()
  }
}
