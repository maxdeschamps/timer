import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { TaskComponent } from './components/task/task.component';
import { SandouichModule } from 'sandouich'; // Lib
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { LogoutComponent } from './components/logout/logout.component'; // a plugin!
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { StatsComponent } from './components/stats/stats.component';
import { StatsTotalTasksComponent } from './components/stats/stats-details/stats-total-tasks/stats-total-tasks.component';
import { StatsTimelineTasksComponent } from './components/stats/stats-details/stats-timeline-tasks/stats-timeline-tasks.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'tasks', component: TaskComponent},
  {path: 'stats', component: StatsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
]

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    LoginComponent,
    LogoutComponent,
    StatsComponent,
    StatsTotalTasksComponent,
    StatsTimelineTasksComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SandouichModule,
    ReactiveFormsModule,
    FullCalendarModule,
    SandouichModule,
    DpDatePickerModule,
    FormsModule,
    NgApexchartsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
