import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AlertController } from '@ionic/angular';
import { PartidoService } from '../services/partido.service';
import { Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
//Mis importaciones


@Component({
  selector: 'app-crear-juego',
  templateUrl: './crear-juego.page.html',
  styleUrls: ['./crear-juego.page.scss'],
})
export class CrearJuegoPage implements OnInit {
  //Declaración de variables
  @ViewChild('imgCancha', {static: true})
  imgCancha!: ElementRef;
  ocultarS1ficha: boolean = true;
  ocultarS2ficha: boolean = true;
  fmGame: FormGroup;
  switchPlayers: string = 'Double';
  switchCanchas: string = 'Arcilla';
  date: string;

  constructor(
                public fb: FormBuilder,
                public alertController: AlertController,
                private partidoService: PartidoService,
                public router: Router,

                ){
    this.fmGame = this.fb.group({
      'nameGame': new FormControl("", Validators.required),
      'ubicacion': new FormControl("", Validators.required),
      'date': new FormControl(new Date().toISOString()),
    });
  }

  ngOnInit() {

  }


//Funciones

  //CAMBIAR ESTADO BOOLEANO SEGÚN EL PARÁMETRO QUE RECIBE
  toggleS = false;
  toggleD = true;


  togglePlayers(players: String) {
    if (players === 'S') {
      this.switchPlayers='Single';
      this.ocultarS1ficha = false;
      this.ocultarS2ficha = false;
      this.toggleD = false;
      this.toggleS = false;
    } else if (players === 'D') {
      this.switchPlayers='Double';
      this.ocultarS1ficha = true;
      this.ocultarS2ficha = true;
      this.toggleS = false;
      this.toggleD = false;
    }
  }

  //CAMBIAR CHANCHAS

  toggleAC = true;
  toggleAF = false;
  //Por defecto

  toggleCanchas(canchas: String){
    if (canchas === 'AC') {
      this.switchCanchas='Arcilla'
      this.imgCancha.nativeElement.src = 'https://i.ibb.co/99LdTZs/clay-tennis-court-tactics-board-vector.jpg';
      this.toggleAF = false;
      this.toggleAC = false;
    } else if (canchas === 'AF') {
      this.switchCanchas = 'Asfalto';
      this.imgCancha.nativeElement.src = 'https://i.ibb.co/MNVCb0h/blue-tennis-court-tactics-board-vector.jpg';
      this.toggleAC = false;
      this.toggleAF = false;

    }
  }

  //Adquirir datos formularios
  async validarFm(){
    const auth = getAuth();
    // Obtén el UID del usuario autenticado (asegúrate de que el usuario esté autenticado)
    const usuarioEmail = auth.currentUser?.email;
    var form = this.fmGame.value;

    if (this.fmGame.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Debe llenar todos los datos.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    } else {


      //Objeto de partido con sus atributos
      if (this.switchPlayers=='Single') {
          const partido = {
            id: "",
            nameGame : form.nameGame,
            cantPlayers : this.switchPlayers,
            nameCancha : this.switchCanchas,
            ubicacion : form.ubicacion,
            date : form.date,
            p1: usuarioEmail,
            p2: 'N/A',
            p3: 'N/A',
            p4: 'N/A'
        }

        //Enviar Datos a BD
        this.partidoService.addGame(partido);
        //Enviar msj a usuario para confirmar la creacion
        const alert = await this.alertController.create({
          header: 'Datos con exito!',
          message: 'Se publicó el partido.',
          buttons: ['Aceptar']
        });
        //Mostrando alert
        await alert.present();
        //Finalmente redirigimos a home
        this.router.navigate(['/public-game']);
        //Retornamos y nos encontraremos en home
        return;

      } else if (this.switchPlayers=='Double') {
        const partido = {
          id:'${id}',
          nameGame : form.nameGame,
          cantPlayers :this.switchPlayers,
          nameCancha : this.switchCanchas,
          ubicacion : form.ubicacion,
          date : form.date,
          p1: usuarioEmail,
          p2: 'N/A',
          p3: 'N/A',
          p4: 'N/A'
        }

        //Enviar Datos a BD
          this.partidoService.addGame(partido);
          //Enviar msj a usuario para confirmar la creacion
          const alert = await this.alertController.create({
            header: 'Datos con exito!',
            message: 'Se publicó el partido.',
            buttons: ['Aceptar']
          });
          //Mostrando alert
          await alert.present();
          //Finalmente redirigimos a home
          this.router.navigate(['/public-game']);
          //Retornamos y nos encontraremos en home
          return;

      }
    }
  }

}; //END CLASS
