import {Injectable} from '@angular/core';

let USER_JWT = 'jwt';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  clean(): void {
    localStorage.clear();
  }

  public saveUser(userData: any): void {
    localStorage.removeItem(USER_JWT);
    localStorage.setItem(USER_JWT, userData.jwt);
  }

  public getUser(): any {
    const userData = localStorage.getItem(USER_JWT);
    if (userData) {
      return userData;
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const userData = localStorage.getItem(USER_JWT);
    if (userData) {
      return true;
    }
    return false;
  }
}
