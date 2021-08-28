import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
//
import { environment } from 'src/environments/environment';
//
import { AuthResponse, User } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _User!: User;

  get user() {
    return { ...this._User };
  }

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth`;
    const body = { email, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap((res) => {
        sessionStorage.setItem('token', res.token!);
        this._User = {
          uid: res.uid!,
          name: res.name!,
        };
      }),
      map((res) => res.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  validateToken() {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      sessionStorage.getItem('token') || ''
    );
    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((res) => {
        sessionStorage.setItem('token', res.token!);
        this._User = {
          uid: res.uid!,
          name: res.name!,
        };
        return res.ok;
      }),
      catchError((err) => of(false))
    );
  }
}
