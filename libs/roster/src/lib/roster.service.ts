import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RosterDto {
  username: string;
  articlesCount: number;
  favoritesReceived: number;
  firstArticleDate: Date | null;
}

@Injectable({
  providedIn: 'root',
})
export class RosterService {
  private apiUrl = '/api/roster';

  constructor(private http: HttpClient) {}

  getRoster(): Observable<RosterDto[]> {
    return this.http.get<RosterDto[]>(this.apiUrl);
  }
}
