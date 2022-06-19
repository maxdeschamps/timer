import { Component, OnInit } from '@angular/core';
import { Task } from "../../models/task.model";

import { TaskService } from "../../services/task.service";
import { ProjectService } from "../../services/project.service";
import { UserService } from "../../services/user.service";
import { IDatePickerConfig } from 'ng2-date-picker';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  projects:any = [];
  users:any = [];
  tasks:any = [];

  filter_date_from = new FormControl();
  filter_date_to = new FormControl();
  date_from?:any = null;
  date_to?:any = null;



  constructor(public taskService: TaskService, public projectService: ProjectService, public userService: UserService) { }

  ngOnInit(): void {
    this.refreshUsers()
  }

  refreshUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  getClickButton(event :number|string){
    if (event === "apply_filters") {
      this.date_from = this.filter_date_from.value;
      this.date_to = this.filter_date_to.value;
    } else if (event === "clear_filters") {
      this.filter_date_from.setValue(null);
      this.filter_date_to.setValue(null);
      this.date_from = this.filter_date_from.value;
      this.date_to = this.filter_date_to.value;
    }
  }
}
