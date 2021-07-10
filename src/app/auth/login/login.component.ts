import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  maxDate;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    })
  }

}
