import { Injectable } from '@angular/core';
import {UserModel} from "../models/user.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiBasePath = 'http://localhost:3000';

  constructor(public httpClient: HttpClient) { }

  logUser(user: UserModel) {
    console.log(user);
  }
}
