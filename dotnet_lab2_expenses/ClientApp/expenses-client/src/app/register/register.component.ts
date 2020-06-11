import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup
  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }

  initializeFormControls(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  register(): void {
    const newUser = this.registerForm.value as User

    this._authService.registerUser(newUser).subscribe(
      _ => this.router.navigateByUrl('expenses')
    )
  }

  ngOnInit() {
    this.initializeFormControls()
  }

}
