import { Component, OnInit } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Iniciar sesión',
    buttonColor: 'accent',
    barColor: 'primary',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false,
    fullWidth: true,
    customClass: 'login-button'
  };

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onClick(){
    this.loginButtonOptions.active = true;
    setTimeout(() => {
      this.loginButtonOptions.active = false;
      this.router.navigateByUrl('/dashboard').then();

    }, 3500);
  }


}
