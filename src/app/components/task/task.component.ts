import { Component, OnInit} from '@angular/core';
import {Task} from "../../models/task.model";
import {Project} from "../../models/project.model";
import {User} from "../../models/user.model";
import {TaskService} from "../../services/task.service";
import {ProjectService} from "../../services/project.service";
import {CalendarOptions} from '@fullcalendar/angular';
import {FormControl} from "@angular/forms";
import {ModalService} from 'sandouich';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  displayed = true;

  projects: Array<Project> = []
  users: Array<User> = [];

  id: any = null;
  title = new FormControl();
  start_date = new FormControl();
  end_date = new FormControl();
  selectedProject = new FormControl(1);
  selectedUser = new FormControl(this.userService.getLoggedUser()?.id ?? 1);

  constructor(public router: Router, public taskService: TaskService, public modalService: ModalService, public projectService: ProjectService, public userService: UserService) { }

  ngOnInit(): void {
    if (!this.userService.getLoggedUser()) {
      this.router.navigate(['login'])
    }
    this.refreshUserTasks();
    this.refreshProjects();
    if (this.userService.loggedUserIsAdmin()) {
      this.refreshUsers();
    }

    this.modalService.display.subscribe((s: any) => {
      this.displayed = s;
    });
  }

  refreshUserTasks() {
    const user = this.userService.getLoggedUser();
    if (user) {
      this.taskService.getUserTasks(this.selectedProject.value, this.selectedUser.value).subscribe(items => {
        this.calendarOptions.events = items;
      });
    }
  }

  refreshUsers() {
    this.userService.findUsers().subscribe(items => {
      let usersArray: Array<any> = [];
      for(let i=0; i<items.length; i++) {
        usersArray.push({
          name: items[i].firstname + ' ' + items[i].lastname,
          id: items[i].id
        })
      }
      this.users = usersArray;
    });
  }

  refreshProjects() {
    this.projectService.getProjects().subscribe(items => {
      this.projects = items;
    });
  }

  projectSelectedChanged(projectId: number) {
    this.selectedProject.setValue(projectId);
    this.refreshUserTasks();
  }

  userSelectedChanged(userId: any) {
    this.selectedUser.setValue(userId);
    this.refreshUserTasks();
  }

  submitUserTask() {
    const user = this.userService.getLoggedUser();
    if (user) {
      let task: Task = {
        id: this.id,
        title: this.title.value,
        start: this.start_date.value,
        end: this.end_date.value,
        user_id: this.userService.loggedUserIsAdmin() ? this.selectedUser.value : user.id,
        project_id: this.selectedProject.value,
      }

      this.taskService.addUserTask(task).subscribe(item => {
        this.modalService.disable();
        this.refreshUserTasks();
      });
    }
  }

  deleteTask() {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la tâche '${this.title.value}' ?`)) {
      this.taskService.deleteTask(this.id).subscribe(item => {
        this.modalService.disable();
        this.refreshUserTasks()
      });
    }
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    locale: 'fr',
    firstDay: 1,
    buttonText: {
      today: "Aujourd'hui",
    },
    events: [],
  };

  handleEventClick(eventClickInfo: any) {
    this.openModal();
    this.id = eventClickInfo.event._def.publicId;
    this.title.setValue(eventClickInfo.event._def.title);
    this.start_date.setValue(eventClickInfo.event._instance.range.start.toISOString().substring(0, 16));
    this.end_date.setValue(eventClickInfo.event._instance.range.end.toISOString().substring(0, 16));
  }

  handleDateClick(arg: any) {
    this.openModal()
    this.start_date.setValue(`${arg.dateStr}T08:00`);
    this.end_date.setValue(`${arg.dateStr}T12:00`);
  }

  openModal() {
    this.id = null;
    this.title.setValue("");
    this.start_date.setValue("");
    this.end_date.setValue("");
    this.modalService.enable();
  }

  filtreTasks() {
    this.refreshUserTasks();
  }

  userLoggedIsAdmin(): boolean {
    return this.userService.loggedUserIsAdmin();
  }
}
