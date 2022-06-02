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


  getUserTasks(userId: number) {
    return this.httpClient.get<Array<TaskModel>>(this.apiBasePath + "/tasks" + `?user_id=${userId}`);
  }

  addUserTask(task: TaskModel) {
    return this.httpClient.post<any>(this.apiBasePath + "/tasks", task).subscribe(data => {
      console.log('Ajouter')
      console.log(data)
    })
  }

}
