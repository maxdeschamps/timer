import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { TaskComponent } from './components/task/task.component';
import { SandouichModule } from 'sandouich';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { LogoutComponent } from './components/logout/logout.component'; // a plugin!

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
