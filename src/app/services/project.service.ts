import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  apiBasePath = 'http://localhost:3000';

  constructor(public httpClient: HttpClient) {

  }

  getProjects() {
    return this.httpClient.get<Array<Project>>(this.apiBasePath + "/projects");
  }

}

