import { Injectable } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { DocumentData, Firestore, addDoc, collection, collectionData, doc, getDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private auth : Auth, private firestore: Firestore) { }

  //Auth Metodos


  register( email: any, password: any){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({email, password}: any ){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(){
    return signOut(this.auth);
  }

  //FireStore Metodos

  addUser(user: User){
    const userRef = collection(this.firestore, 'Usuario');
    return addDoc(userRef,user);
  }

  getEmails(): Observable<any[]>{
    const userRef = collection(this.firestore, 'Usuario');
    const queryj = query(userRef, where('email', '!=', null));
    const datos = collectionData(queryj, { idField: 'id' }) as Observable<any[]>;
    //console.log(datos);
    return datos;
  }


}
