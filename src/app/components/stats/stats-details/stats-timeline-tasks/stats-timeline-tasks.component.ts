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

  @Input() filterDateFrom?: Date;
  @Input() filterDateTo?: Date;
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
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.userService.getUsers().subscribe(users => {
        this.users = users;

        this.users.forEach((user: any) => {

          this.taskService.getUserTasksAllProjects(user.id).subscribe(tasks => {
            if (this.filterDateFrom != null || this.filterDateTo != null) {
              tasks = tasks.filter(this.taskService.getTasksByDate(this.filterDateFrom, this.filterDateTo));
            }
            let dataTasks: any[] = [];
            tasks.forEach((task: any) => {
              let project = this.projects.filter((project: Project) => project.id === task.project_id);
              project.forEach((element: any) => {
                let taskObject: any = {
                  x: element.name,
                  y: [
                    new Date(task.start).getTime(),
                    new Date(task.end).getTime()
                  ]
                }
                dataTasks.push(taskObject);
              });
            });

            this.series.push({
              name: user.firstname,
              data: dataTasks,
            });

            this.createChart();
          });
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
