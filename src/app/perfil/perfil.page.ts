import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { UsersService } from '../services/user-add.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private auth : Auth, private firestore: Firestore, private userService: UsersService) { }

  userData: any;

  ngOnInit() {
    const email = this.auth.currentUser?.email
    if (email) {
      this.userService.getUsuarios(email).subscribe(data => {
        this.userData = data[0];
      });
    }
  }



}
