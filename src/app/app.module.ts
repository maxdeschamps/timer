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

const routes: Routes = [
  {path: 'home', component: AppComponent},
  {path: 'tasks', component: TaskComponent},
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
