import { AuthCredential } from './../models/auth-credential';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import jwt_decode from "jwt-decode";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public isAuthorized = false;
  public userCredential: AuthCredential;
  public ACCESS_TOKEN: string;

  constructor(
    private http: HttpClient) {
    this.isAuthenticated();
  }

  public isAuthenticated(): boolean {
    const accessToken = window.localStorage.getItem('ACCESS_TOKEN');
    if (accessToken) {
      try {
        this.userCredential = jwt_decode<AuthCredential>(accessToken);
        this.isAuthorized = true;
        this.ACCESS_TOKEN = accessToken;
      } catch (error) {
        console.error(error);
        this.isAuthorized = false;
      }
    }

    return this.isAuthorized;
  }

  async login(username: string, password: string): Promise<boolean> {
    const credential = {
      username,
      password,
    }
    try {
      const result = await this.http.post<any>(environment.authenticate, credential).toPromise();
      this.isAuthorized = true;
      window.localStorage.setItem('ACCESS_TOKEN', result.token);
      this.ACCESS_TOKEN = result.token;
    } catch (error) {
      console.error(error);
      this.isAuthorized = false;
    }

    return this.isAuthorized;
  }

  logout() {
    this.isAuthorized = false;
    this.ACCESS_TOKEN = undefined;
    window.localStorage.removeItem('ACCESS_TOKEN');
  }
}
