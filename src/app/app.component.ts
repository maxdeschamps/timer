import { Component } from '@angular/core';
import { Router, Event, NavigationEnd} from '@angular/router';
import {UserService} from "./services/user.service";
import {UserModel} from "./models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'timer';

  currentRoute: string;

  user: UserModel|null;

  constructor(private router: Router, private userService: UserService) {
    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });

    this.user = this.userService.getLoggedUser();
  }

  userIsAdmin(): boolean {
    return this.userService.getLoggedUser()?.role === 'ADMIN';
  }
}
