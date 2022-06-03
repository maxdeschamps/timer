import { Component, OnInit } from '@angular/core';
import {Task} from "../../models/task.model";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  userTasks: Array<Task> = [];

  constructor(public taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getUserTasks(3).subscribe(items => {
      this.userTasks = items;
    });

    this.submitUserTask()
  }

  submitUserTask() {
    let task: Task = {
      description: "testttt",
      start_date: "2022-06-01 15:00",
      end_date: "2022-06-01 15:00",
      user_id: 3,
      project_id: 1,
    }
    this.taskService.addUserTask(task);
  }

}
