import { Injectable, Output, EventEmitter } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:5001/users';
  private jwtHelper = new JwtHelperService();
  decodedToken: any;
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    return this.http.post<any>(this.baseUrl, user);
  }

  loginUser(user: User) {
    return this.http.post<User>(this.baseUrl + '/authenticate', user);
  }

  logout() {
    localStorage.removeItem('token')
    this.decodedToken = null
    this.fireIsLoggedIn.emit(null)
  }

  emitLoginData() {
    this.fireIsLoggedIn.emit(this.decodedToken.unique_name);
  }

  getEmitter() {
    return this.fireIsLoggedIn;
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  decodeToken() {
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    return this.decodedToken;
  }

  getDecodedToken() {
    this.decodeToken();
    return this.decodedToken;
  }

  getUserName() {
    console.log('getUserName was called')
    console.log('decoded token is: ', this.decodedToken)
    return this.decodedToken
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
