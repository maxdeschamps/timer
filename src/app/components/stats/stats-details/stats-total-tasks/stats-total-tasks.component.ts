import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Task } from "../../../../models/task.model";

import { TaskService } from "../../../../services/task.service";
import { ProjectService } from "../../../../services/project.service";

@Component({
  selector: 'app-stats-total-tasks',
  templateUrl: './stats-total-tasks.component.html',
  styleUrls: ['./stats-total-tasks.component.scss']
})
export class StatsTotalTasksComponent implements OnInit {

  @Input() user?: number;
  @Input() filterDateFrom?: any;
  @Input() filterDateTo?: any;

  chartOpt = {};
  tasks: any = [];
  projects: any = [];

  data: number[] = [];
  colors: string[] = [];
  categories: string[] = [];

  constructor(public taskService: TaskService, public projectService: ProjectService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.data = [];
    this.colors = [];
    this.categories = [];
    this.refreshChartOpt();
  }

  refreshChartOpt() {
    if (this.user) {
      this.taskService.getUserTasksAllProjects(this.user).subscribe(items => {
        this.tasks = items;
        this.projectService.getProjects().subscribe(projects => {
          this.projects = projects;
          this.projects.forEach((project: { id: number; color: string; name: string; }) => {
            let tasksByProject = this.tasks.filter(getTasksByUserId(project.id));
            if (this.filterDateFrom != null || this.filterDateTo != null) {
              tasksByProject = tasksByProject.filter(getTasksByDate(this.filterDateFrom, this.filterDateTo));
            }
            this.data.push(tasksByProject.length);
            this.colors.push(project.color);
            this.categories.push(project.name);

            this.chartOpt = {
              series: [
                {
                  name: "Tâches",
                  data: this.data
                }
              ],
              chart: {
                height: 350,
                type: "bar",
              },
              colors: this.colors,
              plotOptions: {
                bar: {
                  distributed: true
                }
              },
              dataLabels: {
                enabled: false
              },
              legend: {
                show: false
              },
              yaxis: [
                {
                  labels: {
                    formatter: function(val: number) {
                      return val.toFixed(0);
                    }
                  }
                }
              ],
              xaxis: {
                categories: this.categories,
                labels: {
                  style: {
                    colors: this.colors,
                    fontSize: "12px"
                  }
                }
              }
            };
          });
        });
      });
    }
  }
}

function getTasksByUserId(projectId: number) {
  return function (task: any) {
    return task.project_id === projectId;
  }
}

function getTasksByDate(filterDateFrom: any, filterDateTo: any) {
  return function (task: any) {
    let start = Date.parse(task.start)/1000;
    let end = Date.parse(task.end)/1000;

    if (filterDateFrom != null && filterDateTo === null) {
      let filterStart = Date.parse(filterDateFrom)/1000;
      return start >= filterStart || end > filterStart;
    } else if (filterDateFrom === null && filterDateTo != null) {
      let filterEnd = Date.parse(filterDateTo)/1000;
      return start < filterEnd || end <= filterEnd;
    } else {
      let filterStart = Date.parse(filterDateFrom)/1000;
      let filterEnd = Date.parse(filterDateTo)/1000;
      return (start >= filterStart || end > filterStart) && (start < filterEnd || end <= filterEnd);
    }
  }
}

