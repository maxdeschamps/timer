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

  @Input() projects: Array<Project> = [];
  @Input() tasks: Array<Task> = [];
  @Input() user?: number;
  @Input() filterDateFrom?: Date;
  @Input() filterDateTo?: Date;
  @Input() reloadNum: number = 0;

  chartOpt = {};

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
      // Get tasks by user
      let tasks = this.tasks.filter(this.taskService.getTasksByUser(this.user));
      // Get projects
      this.projects.forEach((project: Project) => {
        if (project.id) {
          let tasksByProject = tasks.filter(this.taskService.getTasksByProject(project.id));
          if (this.filterDateFrom != null || this.filterDateTo != null) {
            tasksByProject = tasksByProject.filter(this.taskService.getTasksByDate(this.filterDateFrom, this.filterDateTo));
          }
          this.data.push(tasksByProject.length);
          this.colors.push(project.color ? project.color : "");
          this.categories.push(project.name);
        }
      });
      // Create chart
      this.createChart();
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