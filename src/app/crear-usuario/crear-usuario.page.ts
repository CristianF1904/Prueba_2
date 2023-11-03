import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/user-add.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {

  formReg: FormGroup;
  getData:any[];

  constructor( private userService: UsersService, private router: Router) {

    this.formReg = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(12),Validators.minLength(3)]),
      apellido: new FormControl('', [Validators.required, Validators.maxLength(12),Validators.minLength(3)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',Validators.required),
      rol: new FormControl(Validators.required)
    })

  }

  ngOnInit() {
  }
  async onSubmit(){
    const email =this.formReg.value.email;
    const pass =this.formReg.value.password;

    await this.userService.getEmails().pipe(take(1)).subscribe(async data => {
      if (data && data.length > 0) {
        const correoExiste = data.some(item => item.email === email);

        if (correoExiste) {
          console.log(`El correo ${email} existe en el objeto.`);
        } else {
          console.log(`El correo ${email} no existe en el objeto.`);
          this.userService.register(email,pass)
          .then((userCredential)=> {
            this.userService.addUser(this.formReg.value);
            this.router.navigate(['/login'])
          })
          .catch((error) => {
            console.log(error)
            alert('Correo ya registrado');
          });
        }
      } else {
        console.log('No se encontraron datos.');
      }
    })
  }



}
