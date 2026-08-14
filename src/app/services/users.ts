import { inject, Injectable, signal } from '@angular/core';
import { RequestApi } from './request';
import { catchError, of, take } from 'rxjs';

export type UserType = {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  cart: string[],
  role: string,
}

@Injectable({
  providedIn: 'root',
})
export class Users {
  request = inject(RequestApi);
  existEmail = signal(false);
  wrongPass = signal(false);
  user = signal<UserType | null>(null);

  addNewUser(user: UserType) {
    this.request.addNewUser(user).pipe(take(1)).subscribe({
      next: (response) => {
        console.log(response);
      }
    });
  }

  authentication(authData: { email: string, password: string }) {
    this.request.authentication(authData).pipe(take(1)).subscribe({
      next: (response: any) => {
        this.user.set(response.user)
        console.log('user: ', this.user())
      },
      error: (err) => {
        this.wrongPass.set(true);
        console.log(err.error)
        setTimeout(() => {
          this.wrongPass.set(false);
        }, 2000)
      }
    });
  }

  getMe() {
    this.request.getMe().pipe(take(1), catchError(() => of(null))).subscribe((user) => {
      this.user.set(user);
    })
  }

  logOut() {
    this.request.logOut().pipe(take(1)).subscribe({
      next: () => {
        this.user.set(null);
      },
      error: (err) => {
        console.log('error', err)
      },
    });
  }

  checkEmail(email: string) {
    this.request.checkEmail(email).pipe(take(1)).subscribe({
      next: (response: any) => {
        this.existEmail.set(response.exists);
      },
      error: (err) => {
        this.existEmail.set(err.error.exists);
      }
    });
  }
}
