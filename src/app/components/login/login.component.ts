import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl();
  password = new FormControl();

  errors: string|null = null;
  envDev: boolean = false;

  selectedUser = new FormControl(0);
  users: Array<User> = [];

  constructor(public router: Router, public userService: UserService) { }

  ngOnInit(): void {
    if (this.userService.getLoggedUser()) {
      this.router.navigate(['tasks']);
    }
    this.initUsers();
  }

  initUsers() {
    this.userService.findUsers().subscribe(items => {
      let usersArray: Array<any> = [];
      for(let i=0; i<items.length; i++) {
        usersArray.push({
          name: items[i].firstname + ' ' + items[i].lastname,
          id: items[i].id
        })
      }
      this.users = usersArray;
    });
  }

  userSelectedChanged(userId: any) {
    this.selectedUser.setValue(userId);
    this.userService.getUsers().subscribe(items => {
      let user = items.find(item => item.id === userId);
      if (user) {
        this.email.setValue(user.email);
        this.password.setValue(user.password);
      }
    })
  }


  logUser(): void {
    if (!this.email || !this.password) {
      this.errors = "Les informations saisies ne sont pas complètes";
      return;
    }

    this.userService.findUsers().subscribe(
      (items: Array<User>|null) => {
        const item = items
          ? items.find(item => (item.email === this.email.value && item.password === this.password.value))
          : null;

        if (item) {
          this.userService.logUser(item)
          this.errors = null;
          this.router.navigate(['tasks']);
        }

        this.errors = "Aucun utilisateur ne correspond aux informations saisies";
      }
    )
  }
}
