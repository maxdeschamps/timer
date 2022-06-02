import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiBasePath = 'http://localhost:3000';
  constructor(public httpClient: HttpClient) {

  }


  getUserTasks() {
    return this.httpClient.get<Array<Task>>(this.apiBasePath + "/tasks");
  }

}
