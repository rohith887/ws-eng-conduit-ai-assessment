import { ApiService } from '@realworld/core/http-client';
import { UserResponse } from '@realworld/core/api-types';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoginUser, LoginUserRequest, NewUserRequest, NewUser } from '@realworld/core/api-types';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private apiService: ApiService) {}

  user(): Observable<UserResponse> {
    const token = localStorage.getItem('jwtToken');

    const options = token
      ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
      : undefined;
    
    return this.apiService.get<UserResponse>('/user', options).pipe(
    
      tap((response: UserResponse) => {
        console.log('User data received:', response);
      })
    );
    
  }

  login(credentials: LoginUser): Observable<UserResponse> {
    return this.apiService.post<UserResponse, LoginUserRequest>('/users/login', { user: credentials }).pipe(
      tap((response) => {
        localStorage.setItem('jwtToken', response.user.token);
        console.log(`Stored JWT token for user: ${credentials.email}`);
      }),
      catchError((error: any) => {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials and try again.');
        return throwError(error);
      })
    );
  }

  register(credentials: NewUser): Observable<UserResponse> {
    return this.apiService.post<UserResponse, NewUserRequest>('/users', { user: credentials }).pipe(
      tap((response) => {
        localStorage.setItem('jwtToken', response.user.token);
        console.log(`Stored JWT token for new user: ${credentials.email}`);
      }),
      catchError((error: any) => {
        console.error('Registration error:', error);
        alert('Registration failed. Please check your input and try again.');
        return throwError(error);
      })
    );
  }
}
