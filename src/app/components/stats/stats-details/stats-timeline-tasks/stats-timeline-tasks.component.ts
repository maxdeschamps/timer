import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

import { Task } from "../../../../models/task.model";
import { Project } from "../../../../models/project.model";
import { User } from "../../../../models/user.model";
import { TaskService } from "../../../../services/task.service";
import { ProjectService } from "../../../../services/project.service";
import { UserService } from "../../../../services/user.service";

@Component({
  selector: 'app-stats-timeline-tasks',
  templateUrl: './stats-timeline-tasks.component.html',
  styleUrls: ['./stats-timeline-tasks.component.scss']
})
export class StatsTimelineTasksComponent implements OnInit {

  @Input() filterDateFrom?: Date|any;
  @Input() filterDateTo?: Date|any;
  @Input() reloadNum: number = 0;

  chartOpt = {};
  tasks: Array<Task> = [];
  projects: Array<Project> = [];
  users: Array<User> = [];

  series: Array<any> = [];

  constructor(public taskService: TaskService, public projectService: ProjectService, public userService: UserService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.series = [];
    this.refreshData();
  }

  refreshData() {
    // Get projects
    this.projectService.getProjects().subscribe(projects => {
      // Get users
      this.userService.getUsers().subscribe(users => {
        // Get tasks
        this.taskService.getTasks().subscribe(tasks => {
          users.forEach((user: User) => {
            // Filter tasks by user
            let filteredTasks = tasks.filter(this.taskService.getTasksByUser(user.id));
            // If dates filters are enabled
            if (this.filterDateFrom != null || this.filterDateTo != null) {
              filteredTasks = filteredTasks.filter(this.taskService.getTasksByDate(this.filterDateFrom, this.filterDateTo));
            }
            let dataTasks: Array<any> = [];
            filteredTasks.forEach((task: any) => {
              // If dates filters are enabled
              // For calcul nb hours per project
              let start = Date.parse(task.start);
              let end = Date.parse(task.end);
              task.start = start;
              task.end = end;
              if (this.filterDateFrom != null || this.filterDateTo != null) {
                let filterStart = Date.parse(this.filterDateFrom);
                if (start < filterStart) {
                  task.start = filterStart;
                } else {
                  task.start = start;
                }

                let filterEnd = Date.parse(this.filterDateTo);
                if (end > filterEnd) {
                  task.end = filterEnd;
                } else {
                  task.end = end;
                }
              }
              let project = projects.filter((project: Project) => project.id === task.project_id);
              project.forEach((element: Project) => {
                dataTasks.push({
                  x: element.name,
                  y: [
                    new Date(task.start).getTime(),
                    new Date(task.end).getTime()
                  ]
                });
              });
            });
            this.series.push({
              name: user.firstname,
              data: dataTasks,
            });
          });
          // Create chart
          this.createChart();
        });
      });
    });
  }

  createChart() {
    this.chartOpt = {
      series: this.series,
      chart: {
        height: 450,
        type: "rangeBar"
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "80%"
        }
      },
      xaxis: {
        type: "datetime"
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      legend: {
        position: "top",
        horizontalAlign: "left"
      }
    };
  }
}
