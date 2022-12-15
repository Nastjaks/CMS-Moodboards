import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {User} from "../models/user";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL: string = 'http://localhost:1337/api/auth/';

  constructor(private http: HttpClient, private storageService: StorageService) {
  }

  register(username: string, email: string, password: string): Observable<User> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify({
      username: username,
      email: email,
      password: password
    });

    return this.http.post<User>(this.baseURL + 'local/register', body, {'headers': headers})
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

    return this.http.post<User>(this.baseURL + 'local', {
      identifier,
      password
    }, {'headers': headers})
      .pipe(
        map((res: any) => { //der response der vom server zurück kommt wird "gemapt", um einfacher an die Infos zu kommen. am anfang vom respone steht dieses "data{...}" und so können wir direkt hineins in das "..." greifen ohne dan das data davor zu denken
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
}
