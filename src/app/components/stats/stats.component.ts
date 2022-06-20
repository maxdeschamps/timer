import { Component, OnInit } from '@angular/core';

import {User} from "../../models/user.model";
import { TaskService } from "../../services/task.service";
import { ProjectService } from "../../services/project.service";
import { UserService } from "../../services/user.service";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  users:Array<User> = [];

  filter_date_from = new FormControl();
  filter_date_to = new FormControl();
  date_from?:any = null;
  date_to?:any = null;
  reloadNum: number = 0;

  constructor(public router: Router, public taskService: TaskService, public projectService: ProjectService, public userService: UserService) { }

  ngOnInit(): void {
    if (!this.userService.getLoggedUser()) {
      this.router.navigate(['login'])
    }

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

  reloadTab() {
    this.reloadNum = Math.floor(Math.random() * 100);
  }
}
