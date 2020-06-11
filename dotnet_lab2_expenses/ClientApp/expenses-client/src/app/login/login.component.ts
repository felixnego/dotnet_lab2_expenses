import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../Models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup
  
  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }

  initializeFormControls(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  login(): void {
    const login = this.loginForm.value as User

    this._authService.loginUser(login).subscribe(
      user => {
        localStorage.setItem('token', user.token);
        this._authService.decodeToken();
        this._authService.emitLoginData();
        this.router.navigateByUrl('expenses')
      }
    )
  }

  ngOnInit() {
    this.initializeFormControls()
  }

}

// export interface UserForLogin {
//   username: string,
//   password: string
// }