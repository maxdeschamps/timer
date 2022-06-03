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

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }


  logUser() {
    let user: UserModel = {
      email: this.email?.value,
      password: this.password?.value,
    }

    this.userService.logUser(user);
  }

}
