
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';
import { Observable, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser> 
  public isAuthenticated$: Observable<boolean>

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
  ) {
    this.usersCollection = db.collection('users')
    this.isAuthenticated$ = auth.user.pipe(
      map((user) => !!user),
    )

  }

  public async createUser(userData: IUser) {

    if(!userData.password) {
      throw new Error("Password not provided!")
    }

    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email as string, userData.password as string
    )

    if (!userCred.user) {
      throw new Error("User can not be found!")
    }

    // await this.db.collection<IUser>('users').add({               // We ceated ref not to reply code in future. 
    await this.usersCollection.doc(userCred.user.uid).set({        // Replacing add with doc and set.
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    })

    await userCred.user.updateProfile({
      displayName: userData.name
    })
  }
}
