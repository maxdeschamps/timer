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
    this.taskService.getUserTasks().subscribe(items => {
      this.userTasks = items;
    });
  }

}
