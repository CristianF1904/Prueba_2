import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/user-add.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private userService: UsersService, private router: Router) {}

  onClick(){
    this.userService.logout()
    .then(() => {
      this.router.navigate(['/login'])
    })
    .catch(error => console.log(error))
  }


}

