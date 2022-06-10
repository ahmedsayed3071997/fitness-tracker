import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiServiceService } from 'src/app/shared/ui-service.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading: boolean = false;
  loadingSub: Subscription;
  constructor(private authService:AuthService, public uiService:UiServiceService) { }

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
  onSubmit(form:NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    })
  }

  ngOnDestroy() { 
    if (this.loadingSub) { 
      this.loadingSub.unsubscribe();
    }
  }

}
