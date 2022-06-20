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
    if(task.id) {
      return this.httpClient.put<any>(this.apiBasePath + `/tasks/${task.id}`, task)
    }
    return this.httpClient.post<any>(this.apiBasePath + "/tasks", task)

  }

  deleteTask(id: number) {
    return this.httpClient.delete<any>(this.apiBasePath + `/tasks/${id}`)
  }

  getTasksByDate(filterDateFrom: any, filterDateTo: any) {
    return function (task: any) {
      let start = Date.parse(task.start)/1000;
      let end = Date.parse(task.end)/1000;

      if (filterDateFrom != null && filterDateTo === null) {
        let filterStart = Date.parse(filterDateFrom)/1000;
        return start >= filterStart || end > filterStart;
      } else if (filterDateFrom === null && filterDateTo != null) {
        let filterEnd = Date.parse(filterDateTo)/1000;
        return start < filterEnd || end <= filterEnd;
      } else {
        let filterStart = Date.parse(filterDateFrom)/1000;
        let filterEnd = Date.parse(filterDateTo)/1000;
        return (start >= filterStart || end > filterStart) && (start < filterEnd || end <= filterEnd);
      }
    }
  }

}
