import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskModel} from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiBasePath = 'http://localhost:3000';
  constructor(public httpClient: HttpClient) {

  }

  getTasks() {
    return this.httpClient.get<Array<any>>(this.apiBasePath + "/tasks");
  }

  getUserTasks(projectId: number, userId: number) {
    return this.httpClient.get<Array<any>>(this.apiBasePath + "/tasks" + `?user_id=${userId}&project_id=${projectId}`);
  }

  getUserTasksAllProjects(userId: number) {
    return this.httpClient.get<Array<any>>(this.apiBasePath + "/tasks" + `?user_id=${userId}`);
  }

  addUserTask(task: TaskModel) {
    return this.httpClient.post<any>(this.apiBasePath + "/tasks", task)
  }

}
