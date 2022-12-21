import {Injectable} from '@angular/core';
import {Auth_Model} from "../models/auth_Model";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  clean(): void {
    localStorage.clear();
  }

  public saveUser(userData: Auth_Model): void {
    localStorage.removeItem('auth-user');
    localStorage.setItem('auth-user', JSON.stringify(userData));
  }

  public getUser(): any {
    const userData = localStorage.getItem('auth-user');

    if (userData) {
      return JSON.parse(userData);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    const userData = localStorage.getItem('auth-user');
    if (userData) {
      return true;
    }
    return false;
  }
}
