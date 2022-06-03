import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  apiBasePath = 'http://localhost:3000';

  constructor(public httpClient: HttpClient) {

  }

  getProjects() {
    return this.httpClient.get<Array<any>>(this.apiBasePath + "/projects");
  }

}

