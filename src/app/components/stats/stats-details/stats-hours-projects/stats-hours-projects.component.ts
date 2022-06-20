import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

import { Task } from "../../../../models/task.model";
import { Project } from "../../../../models/project.model";
import { User } from "../../../../models/user.model";
import { TaskService } from "../../../../services/task.service";
import { ProjectService } from "../../../../services/project.service";
import { UserService } from "../../../../services/user.service";

@Component({
  selector: 'app-stats-hours-projects',
  templateUrl: './stats-hours-projects.component.html',
  styleUrls: ['./stats-hours-projects.component.scss']
})
export class StatsHoursProjectsComponent implements OnInit {

  @Input() filterDateFrom?: any;
  @Input() filterDateTo?: any;
  @Input() reloadNum: number = 0;

  chartOpt = {};
  tasks: Array<Task> = [];
  projects: Array<Project> = [];
  users: Array<User> = [];

  series: Array<any> = [];
  categories: Array<String> = [];
  $observable: Promise<any> | undefined;

  constructor(public taskService: TaskService, public projectService: ProjectService, public userService: UserService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.series = [];
    this.categories = [];
    this.refreshData();
  }

  async refreshData() {
    // Get projects
    this.projectService.getProjects().subscribe(projects => {

      // Get users
      this.userService.getUsers().subscribe(users => {

        // Get tasks
        this.taskService.getTasks().subscribe(tasks => {
          // If dates filters are enabled
          if (this.filterDateFrom != null || this.filterDateTo != null) {
            tasks = tasks.filter(this.taskService.getTasksByDate(this.filterDateFrom, this.filterDateTo));
          }

          // Set user index to 0
          let userIndex: number = 0;
          users.forEach((user: User) => {
            // Set dataHours
            let dataHours: Array<number> = [];
            // Set project index to 0
            let projectIndex: number = 0;
            projects.forEach((project: Project) => {
              // Filter tasks by user and project
              let filteredTasks = tasks.filter(this.taskService.getTasksByUserAndProject(user.id, project.id));
              // Increment +1 to project index
              projectIndex++;
              // Increment +1 to user index
              if (projectIndex === 1) {
                userIndex++;
              }
              // Set nb hours for project to 0
              let hours: number = 0;
              filteredTasks.forEach((task: Task|any) => {
                // For calcul nb hours per project
                let start = Date.parse(task.start);
                let end = Date.parse(task.end);
                task.start = start;
                task.end = end;

                // If dates filters are enabled
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

                // Set hours of the task for total project hours
                hours += Math.abs(task.end - task.start) / 36e5;
              });

              // Push total project hours in dataHours array
              dataHours.push(hours);

              // Set project name to categories option chart
              if (userIndex === 1) {
                this.categories.push(project.name);
              }

              // Set data to series option chart
              if (projects.length === projectIndex) {
                this.series.push({
                  name: user.firstname,
                  data: dataHours
                });

                // Create chart
                if (users.length === userIndex) {
                  this.createChart();
                }
              }
            });
          });
        });
      });
    });
  }

  createChart() {
    this.chartOpt = {
      series: this.series,
      chart: {
        type: 'bar',
        height: 430
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
      },
      tooltip: {
        shared: true,
        intersect: false
      },
      xaxis: {
        categories: this.categories,
      },
    };
  }

}
