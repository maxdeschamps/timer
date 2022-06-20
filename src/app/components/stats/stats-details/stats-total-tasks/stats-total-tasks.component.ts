import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Task } from "../../../../models/task.model";
import { Project } from "../../../../models/project.model";

import { TaskService } from "../../../../services/task.service";
import { ProjectService } from "../../../../services/project.service";

@Component({
  selector: 'app-stats-total-tasks',
  templateUrl: './stats-total-tasks.component.html',
  styleUrls: ['./stats-total-tasks.component.scss']
})
export class StatsTotalTasksComponent implements OnInit {

  @Input() user?: number;
  @Input() filterDateFrom?: Date;
  @Input() filterDateTo?: Date;

  chartOpt = {};
  tasks: Array<Task> = [];
  projects: Array<Project> = [];

  data: Array<number> = [];
  colors: Array<string> = [];
  categories: Array<string> = [];

  constructor(public taskService: TaskService, public projectService: ProjectService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.data = [];
    this.colors = [];
    this.categories = [];
    this.refreshData();
  }

  refreshData() {
    if (this.user) {
      this.taskService.getUserTasksAllProjects(this.user).subscribe(items => {
        this.tasks = items;
        this.projectService.getProjects().subscribe(projects => {
          this.projects = projects;
          this.projects.forEach((project: Project) => {
            if (project.id) {
              let tasksByProject = this.tasks.filter(getTasksByUserId(project.id));
              if (this.filterDateFrom != null || this.filterDateTo != null) {
                tasksByProject = tasksByProject.filter(this.taskService.getTasksByDate(this.filterDateFrom, this.filterDateTo));
              }
              this.data.push(tasksByProject.length);
              this.colors.push(project.color ? project.color : "");
              this.categories.push(project.name ? project.name : "");
            }
          });
          this.createChart();
        });
      });
    }
  }

  createChart() {
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
            formatter: function (val: number) {
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
  }
}

function getTasksByUserId(projectId: number) {
  return function (task: any) {
    return task.project_id === projectId;
  }
}