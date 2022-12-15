import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:1337/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getProfile(userId: number): Observable<any> {
    return this.http.get(API_URL + 'users/' + userId, { responseType: 'text' });
  }
}
