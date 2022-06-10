import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiServiceService } from 'src/app/shared/ui-service.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  @ViewChild("dateInput", {static:true}) dateInput:ElementRef;
  maxDate;
  isLoading: boolean = false;
  loadingSub: Subscription;
  constructor(private authService:AuthService, public uiService:UiServiceService) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    
  }
  
  onSubmit(form:NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }

  ngOnDestroy(): void {
    if (this.loadingSub) { 
      this.loadingSub.unsubscribe();
    }
  }

}
