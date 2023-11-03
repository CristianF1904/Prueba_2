import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDocs, getFirestore, updateDoc } from '@angular/fire/firestore';
import { Partido } from '../interfaces/Partido';
import { Observable } from 'rxjs';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  constructor(
              private firestore: Firestore
              ) { }

//Metodo para agregar partido a BD
  async addGame(partido: Partido){
    const gameRef = addDoc(collection(this.firestore, 'partido'),partido);
    const partidoDocRef = doc(this.firestore, 'partido', (await gameRef).id);
    return  updateDoc(partidoDocRef, { id: partidoDocRef.id });
  }

  //Metodo para obtener los partidos en BD
  getGames(): Observable<any> {
  return collectionData(collection(this.firestore, 'partido'));
  }

  //Metodo para agregar usuarios al partido
  addPlayer(partidoID: string, playerNumber:string){
    // Inicializa Firestore
    const db = getFirestore();

    // Obtén una referencia al documento del partido en Firestore
    const partidoRef = doc(db, 'partido', partidoID);

    // Inicializa Auth
    const auth = getAuth();

    // Obtén el UID del usuario autenticado (asegúrate de que el usuario esté autenticado)
    const usuarioUID = auth.currentUser?.uid;
    const usuarioEmail = auth.currentUser?.email;

    // Actualiza el campo de jugador correspondiente en el documento del partido
    updateDoc(partidoRef, {
        [playerNumber]: usuarioEmail
    })
    .then(() => {
        console.log('Usuario registrado en el partido.');
    })
    .catch((error) => {
        console.error('Error al registrar al usuario en el partido: ', error);
    });
  }





}//END
