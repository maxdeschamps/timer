import { Component, OnInit } from '@angular/core';
import {Task} from "../../models/task.model";
import {TaskService} from "../../services/task.service";
import { CalendarOptions } from '@fullcalendar/angular';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  userTasks: Array<Task> = [];

  formGrpUserTask: FormGroup = new FormGroup({
    'description': new FormControl(),
    'start_date': new FormControl(),
    'end_date': new FormControl(),
  })
  constructor(public taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getUserTasks(3).subscribe(items => {
      this.userTasks = items;
    });

    this.submitUserTask()
  }

  submitUserTask() {
    let task: Task = {
      title: "testttt",
      start_date: "2022-06-01 15:00",
      end_date: "2022-06-01 15:00",
      user_id: 3,
      project_id: 1,
    }
    this.taskService.addUserTask(task);
  }


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    locale: 'fr',
    events: [
      { title: 'event 1', date: '2022-06-01' },
      { title: 'event 2', date: '2022-06-02' }
    ]
  };

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }

}
