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

const routes: Routes = [
  {path: 'home', component: AppComponent},
  {path: 'tasks', component: TaskComponent},
  {path: 'login', component: LoginComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SandouichModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
