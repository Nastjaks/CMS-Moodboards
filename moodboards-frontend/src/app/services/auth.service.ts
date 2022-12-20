import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {User} from "../models/user";
import {StorageService} from "./storage.service";
import {Urls} from "../helper/urls";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, private storageService: StorageService, private urls: Urls, private router: Router) {
  }

  register(username: string, email: string, password: string): Observable<User> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify({
      username: username,
      email: email,
      password: password
    });

    return this.http.post<User>(this.urls.auth_URL + 'local/register', body, {'headers': headers})
      .pipe(
        catchError((err) => {
            console.error(err);
            throw err;
          }
        )
      );
  };

  login(identifier: string, password: string): Observable<User> {
    const headers = {'content-type': 'application/json'}

    return this.http.post<User>(this.urls.auth_URL + 'local', {
      identifier,
      password
    }, {'headers': headers})
      .pipe(
        map((res: any) => {
          this.storageService.saveUser(res);
          return res;
        }),
        catchError((err) => {
            console.error(err);
            throw err;
          }
        )
      );
  };

  logout(): void {
    this.storageService.clean();
    this.router.navigate(['/']).then(r => window.location.reload());
  }
}
