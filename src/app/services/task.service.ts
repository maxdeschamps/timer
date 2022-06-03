import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskModel} from "../models/task.model";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiBasePath = 'http://localhost:3000';
  constructor(public httpClient: HttpClient) {

  }


  getUserTasks(projectId: number, userId: number) {
    return this.httpClient.get<Array<any>>(this.apiBasePath + "/tasks" + `?user_id=${userId}&project_id=${projectId}`);
  }

  addUserTask(task: TaskModel) {
    return this.httpClient.post<any>(this.apiBasePath + "/tasks", task)
  }

}
