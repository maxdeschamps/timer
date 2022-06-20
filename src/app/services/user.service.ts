import { Injectable } from '@angular/core';
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User|null = null;

  apiBasePath = 'http://localhost:3000';

  constructor(public httpClient: HttpClient) { }

  findUsers() {
    return this.httpClient.get<Array<User>>(this.apiBasePath + "/users");
  }

  getUsers() {
    return this.httpClient.get<Array<User>>(this.apiBasePath + "/users");
  }

  getLoggedUser(): User|null {
    return JSON.parse(<string>localStorage.getItem('user'));
  }

  logUser(user: User): boolean {
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }

  unlogUser(): any {
    localStorage.setItem('user', JSON.stringify(null));
  }

  loggedUserIsAdmin(): boolean {
    return JSON.parse(<string>localStorage.getItem('user'))?.role === 'ADMIN';
  }
}
