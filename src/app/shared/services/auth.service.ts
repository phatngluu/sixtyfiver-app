import { AuthCredential } from './../models/auth-credential';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import jwt_decode from "jwt-decode";
import { EventEmitter, Injectable } from '@angular/core';
import { AbstractResponse } from 'src/app/modules/pethernet/shared/models/abstract-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public isAuthorized = false;
  public userCredential: AuthCredential;

  public accessTokenChangedEvent = new EventEmitter();

  constructor(
    private router: Router,
    private http: HttpClient) {
    this.isAuthenticated();
  }

  async getUserInfo(userId: number, accessToken: string): Promise<AbstractResponse<string>> {
    const genericOptions: object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }),
      responseType: "json"
    }
    return await this.http.get<AbstractResponse<string>>(environment.getUser + userId, genericOptions).toPromise();
  }

  public isAuthenticated(): boolean {
    const accessToken = window.localStorage.getItem('ACCESS_TOKEN');
    if (accessToken) {
      try {
        this.userCredential = jwt_decode<AuthCredential>(accessToken);
        this.getUserInfo(this.userCredential.sub, accessToken).then(res => {
          if (res.success === false) {
            this.isAuthorized = false;
            this.router.navigate(['login']); // forces login again if not authorized
          }
        }).catch(error => {
          console.error(error);
          this.isAuthorized = false;
          this.router.navigate(['login']);
        });

        return true; // synchronously return authorized
      } catch (error) {
        console.error(error);
        this.isAuthorized = false;
        this.router.navigate(['login']);

        return false; // synchronously return unauthorized;
      }
    }
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
