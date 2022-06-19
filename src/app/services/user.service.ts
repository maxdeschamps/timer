import { Injectable } from '@angular/core';
import {UserModel} from "../models/user.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserModel|null = null;

  apiBasePath = 'http://localhost:3000';

  constructor(public httpClient: HttpClient) { }

  findUsers() {
    return this.httpClient.get<any>(this.apiBasePath + "/users");
  }

  getUsers() {
    return this.httpClient.get<Array<any>>(this.apiBasePath + "/users");
  }

  getLoggedUser(): UserModel|null {
    return JSON.parse(<string>localStorage.getItem('user'));
  }

  logUser(user: UserModel): boolean {
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }

  unlogUser(): any {
    localStorage.setItem('user', JSON.stringify(null));
  }
}
