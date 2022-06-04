import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl();
  password = new FormControl();

  errors: string|null = null;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  logUser(): void {
    if (!this.email || !this.password) {
      this.errors = "Les informations saisies ne sont pas complètes";
      return;
    }

    this.userService.findUsers().subscribe(
      (items: Array<UserModel>|null) => {
        const item = items
          ? items.find(item => (item.email === this.email.value && item.password === this.password.value))
          : null;

        if (item) {
          this.userService.logUser(item)
          this.errors = null;
          return;
        }

        this.errors = "Aucun utilisateur ne correspond aux informations saisies";
      }
    )
  }

}
