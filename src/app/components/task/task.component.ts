import { Component, OnInit } from '@angular/core';
import {Task} from "../../models/task.model";
import {TaskService} from "../../services/task.service";
import { CalendarOptions } from '@fullcalendar/angular';
import {FormControl, FormGroup} from "@angular/forms";
import { ModalService } from 'sandouich';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  displayed = true;

  userTasks: Array<Task> = [];

  formGrpUserTask: FormGroup = new FormGroup({
    'title': new FormControl(),
    'start_date': new FormControl(),
    'end_date': new FormControl(),
  })
  constructor(public taskService: TaskService, public modalService: ModalService) { }

  ngOnInit(): void {
    this.taskService.getUserTasks(2,3).subscribe(items => {
      this.userTasks = items;
    });

    this.modalService.display.subscribe(s => {
      this.displayed = s;
    });

    //this.submitUserTask()
  }

  submitUserTask() {
    let task: Task = {
      title: this.formGrpUserTask.get('title'),
      start_date: this.formGrpUserTask.get('start_date'),
      end_date: this.formGrpUserTask.get('end_date'),
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

  openModal() {
    this.modalService.enable();
  }

}
