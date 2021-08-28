import { AuthCredential } from './../models/auth-credential';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import jwt_decode from "jwt-decode";
import { EventEmitter, Injectable } from '@angular/core';
import { AbstractResponse } from 'src/app/modules/pethernet/shared/models/abstract-response';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public isAuthorized = false;
  public userCredential: AuthCredential;

  public accessTokenChangedEvent = new EventEmitter();

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
      const result = await this.http.post<AbstractResponse<AuthCredential>>(environment.authenticate, credential).toPromise();
      this.isAuthorized = true;
      window.localStorage.setItem('ACCESS_TOKEN', result.message.token);
      this.accessTokenChangedEvent.emit();
    } catch (error) {
      console.error(error);
      this.isAuthorized = false;
    }

    return this.isAuthorized;
  }

  logout() {
    this.isAuthorized = false;
    window.localStorage.removeItem('ACCESS_TOKEN');
    this.accessTokenChangedEvent.emit();
  }

  getAccessToken(): string {
    return window.localStorage.getItem('ACCESS_TOKEN');
  }
}
