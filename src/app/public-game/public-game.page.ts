import { Component, OnInit } from '@angular/core';
import { PartidoService } from '../services/partido.service';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Partido } from '../interfaces/Partido';
import { AlertController } from '@ionic/angular';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-public-game',
  templateUrl: './public-game.page.html',
  styleUrls: ['./public-game.page.scss'],
})
export class PublicGamePage implements OnInit {

  //Variables
  tipoPartido: any = "Double";
  constructor(
    private partidoService: PartidoService,
    private firestore: Firestore,
    private alertController: AlertController
  ) { }

  ngOnInit() {

  }


  partidos$ = this.partidoService.getGames();

  async getGames(): Promise<any> {
    const games = collection(this.firestore, 'partido');
    const gameSnapshot = await getDocs(games);
    return gameSnapshot.docs.map(doc => {
      let data = doc.data() as Partido;
      if (data.cantPlayers === "Single") {
        this.tipoPartido = 'Single';
      }
      return data;

    });
  }


  async registrarUsuario(partido: any, playerNumber: any) {
    const auth = getAuth();
    const usuarioEmail = auth.currentUser?.email;
    if(partido.p1 === usuarioEmail || partido.p2 === usuarioEmail || partido.p3 === usuarioEmail || partido.p4 === usuarioEmail){
      const alert = await this.alertController.create({
        header: 'Usuario ya registrado',
        message: 'Tu correo ya esta registrado en este partido',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }else{
      const alert = await this.alertController.create({
        header: 'Unirse a la partida',
        message: '¿Estás seguro de que deseas unirte a esta partida?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Aceptar',
            handler: () => {
              // Aquí colocas la lógica para unir al usuario a la partida
              const partidoID = partido.id;
              this.partidoService.addPlayer(partidoID, playerNumber);

            },
          },
        ],
      });

      await alert.present();
    }

  }


}
