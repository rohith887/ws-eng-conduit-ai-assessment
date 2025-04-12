import { ApiService } from '@realworld/core/http-client';
import { UserResponse } from '@realworld/core/api-types';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser, LoginUserRequest, NewUserRequest, NewUser } from '@realworld/core/api-types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private apiService: ApiService) {}

  user(): Observable<UserResponse> {
    const token = localStorage.getItem('jwtToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return this.apiService.get<UserResponse>('/user', { headers });
  }

  login(credentials: LoginUser): Observable<UserResponse> {
    return this.apiService.post<UserResponse, LoginUserRequest>('/users/login', { user: credentials }).pipe(
      tap((response) => {
        localStorage.setItem('jwtToken', response.user.token);
        console.log(`Stored JWT token for user: ${credentials.email}`);
      })
    );
  }

  register(credentials: NewUser): Observable<UserResponse> {
    return this.apiService.post<UserResponse, NewUserRequest>('/users', { user: credentials }).pipe(
      tap((response) => {
        localStorage.setItem('jwtToken', response.user.token);
        console.log(`Stored JWT token for new user: ${credentials.email}`);
      })
    );
  }
}
