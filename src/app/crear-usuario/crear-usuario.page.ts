import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/user-add.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {

  formReg: FormGroup;
  getData:any[];

  constructor( private userService: UsersService, private router: Router, private alertController: AlertController) {

    this.formReg = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(12),Validators.minLength(3)]),
      apellido: new FormControl('', [Validators.required, Validators.maxLength(12),Validators.minLength(3)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
      edad: new FormControl('',[Validators.required, Validators.maxLength(2)]),
      telefono: new FormControl('',[Validators.required, Validators.maxLength(9),Validators.minLength(9)])
    })

  }

  ngOnInit() {
  }
  async onSubmit(){
    const email =this.formReg.value.email;
    const pass =this.formReg.value.password;
    const edad = this.formReg.value.edad;

    if(edad >= 18){
      if(pass.length >= 6){
        await this.userService.getEmails().pipe(take(1)).subscribe(async data => {
          if (data && data.length > 0) {
            const correoExiste = data.some(item => item.email === email);

            if (correoExiste) {
              console.log(`El correo ${email} existe en el objeto.`);
              const alert = await this.alertController.create({
                header: 'Correo Ya Registrado',
                message: `El correo ${email} existe en el objeto.`,
                buttons: ['Aceptar']
              });
              await alert.present();
              return;
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
      }else{
        const alert = await this.alertController.create({
          header: 'Contraseña No Válida',
          message: 'Contraseña debe de contener más de 6 caracteres',
          buttons: ['Aceptar']
        });
        await alert.present();
        return;
      }
    }else{
      const alert = await this.alertController.create({
        header: 'Edad No Válida',
        message: 'Tiene que ser mayor de edad para registrarse en esta página',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

  }



}
