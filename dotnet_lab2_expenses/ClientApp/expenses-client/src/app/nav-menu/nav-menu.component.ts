import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  isExpanded = false;
  public username: string;

  constructor(
    private _authService: AuthService,
    private router: Router
  ) {  }

  collapse() {
    this.isExpanded = false;
  }

  logout() {
    this._authService.logout( )
    this.router.navigateByUrl('/')
  }

  authServiceSubscribe() {
    this._authService.getEmitter().subscribe(
      data => this.username = data
    )
  }

  ngOnInit(){
    this.username = this._authService.getDecodedToken();
    this.authServiceSubscribe()
  }
}
