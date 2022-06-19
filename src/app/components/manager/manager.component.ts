import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {ProjectService} from "../../services/project.service";
import {UserService} from "../../services/user.service";
import {CalendarOptions} from "@fullcalendar/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  displayed = true;

  projects:any = []
  users: any = [];

  title = new FormControl();
  start_date = new FormControl();
  end_date = new FormControl();
  selectedProject = new FormControl(1);
  selectedUser = new FormControl(1);

  constructor(public taskService: TaskService, public projectService: ProjectService, public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.userService.getLoggedUser()?.role !== 'ADMIN') {
      this.router.navigate(['home'])
    }

    this.refreshUserTasks()
    this.refreshProjects()
    this.refreshUsers()
  }

  refreshUserTasks() {
    this.taskService.getUserTasks(this.selectedProject.value, this.selectedUser.value).subscribe(items => {
      this.calendarOptions.events = items;
    });
  }

  refreshProjects() {
    this.projectService.getProjects().subscribe(items => {
      this.projects = items;
    });
  }

  refreshUsers() {
    this.userService.findUsers().subscribe(items => {
      let usersArray = [];
      for(let i=0; i<items.length; i++) {
        usersArray.push({
          name: items[i].firstname + ' ' + items[i].lastname,
          id: items[i].id
        })
      }
      this.users = usersArray;
    });
  }

  projectSelectedChanged(projectId: number) {
    this.selectedProject.setValue(projectId)
    this.refreshUserTasks()
  }

  userSelectedChanged(userId: any) {
    this.selectedUser.setValue(userId)
    this.refreshUserTasks()
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'fr',
    firstDay: 1,
    buttonText: {
      today: "Aujourd'hui",
    },
    events: [],
  };
}
