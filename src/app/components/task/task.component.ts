import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Task} from "../../models/task.model";
import {TaskService} from "../../services/task.service";
import {ProjectService} from "../../services/project.service";
import {CalendarOptions} from '@fullcalendar/angular';
import {FormControl} from "@angular/forms";
import {ModalService} from 'sandouich';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  displayed = true;

  projects:any = []

  title = new FormControl();
  start_date = new FormControl();
  end_date = new FormControl();
  selectedProject = new FormControl(1);

  constructor(public taskService: TaskService, public modalService: ModalService, public projectService: ProjectService) { }

  ngOnInit(): void {

    this.refreshUserTasks()
    this.refreshProjects()

    this.modalService.display.subscribe((s: any) => {
      this.displayed = s;
    });

  }

  refreshUserTasks() {
    this.taskService.getUserTasks(this.selectedProject.value,3).subscribe(items => {
      this.calendarOptions.events = items;
    });

  }

  refreshProjects() {
    this.projectService.getProjects().subscribe(items => {
      this.projects = items;
    });
  }

  projectSelectedChanged(projectId: number) {
    this.selectedProject.setValue(projectId)
    this.refreshUserTasks()
  }

  submitUserTask() {
    let task: Task = {
      title: this.title.value,
      start: this.start_date.value,
      end:  this.end_date.value,
      user_id: 3,
      project_id: 1,
    }



    this.taskService.addUserTask(task).subscribe(item => {
        this.modalService.disable();
        this.refreshUserTasks()
      });

   /** if(this.taskService.addUserTask(task)) {
      this.modalService.disable();
      this.refreshUserTasks()
    }
    **/




  }


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    locale: 'fr',
    firstDay: 1,
    buttonText: {
      today:    "Aujourd'hui",
    },
    events: [],
  };

  handleDateClick(arg: any) {
    this.openModal()
    this.start_date.setValue(`${arg.dateStr}T08:01`)
    this.end_date.setValue(`${arg.dateStr}T13:01`)
  }

  openModal() {
    this.title.setValue("")
    this.start_date.setValue("")
    this.end_date.setValue("")
    this.modalService.enable();
  }

}
