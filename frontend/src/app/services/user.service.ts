import { Injectable } from '@angular/core';
import { environment } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users/';
  }

  signIn(user: User): Observable<User> {
    return this.http.post<User>(`${this.myAppUrl}${this.myApiUrl}`, user);
  }
}
