import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
  ) { }

  async SignUp(email: string, password: string) {
    const auth = getAuth();

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      window.alert('You have been successfully registered!');
      this.router.navigate(['/login']);
      return result;
    } catch (error: any) {
      if (error.code.includes('auth/email-already-in-use')) {
        return error.message;
      } else {
        window.alert(error.message);
        throw error;
      }
    }
  }

  async SignIn(email: string, password: string) {
    const auth = getAuth();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      this.router.navigate(['/gallery']);
      return result;
    }
    catch (error) {
      console.log(error)
      return error;
    }
  };

  async SignOut() {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

}
