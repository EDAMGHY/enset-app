import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppStateService } from './app-state.service';
import { firstValueFrom } from 'rxjs';
import { IUser } from '../types';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  host: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private appState: AppStateService) {}

  authenticate(user: IUser) {
    const userPassword = btoa(user.password!);
  }

  async login(username: string, password: string): Promise<IUser> {
    try {
      const data: IUser = await firstValueFrom(
        this.http.get(`${this.host}/users/${username}`)
      );

      if (data.password === btoa(password)) {
        let token = data.token;
        let decodedJwt: any = jwtDecode(token!);

        this.appState.setAuthState({
          isAuthenticated: true,
          username: username,
          roles: decodedJwt.roles,
          token: token,
        });
        return Promise.resolve(data);
      } else {
        return Promise.reject('Bad Credentials');
      }
    } catch (err: any) {
      return Promise.reject(err?.message || 'Network error');
    }
  }

  public logout() {
    this.appState.setAuthState({
      isAuthenticated: false,
      username: '',
      token: '',
    });
  }
}
