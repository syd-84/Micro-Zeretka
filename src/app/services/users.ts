import { inject, Injectable, signal } from '@angular/core';
import { RequestApi } from './request';
import { take } from 'rxjs';

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

  addNewUser(user: UserType) {
    this.request.addNewUser(user).pipe(take(1)).subscribe({
      next: (response) => {
        console.log(response);
      }
    });
  }

  authentication(authData: { email: string, password: string }) {
    this.request.authentication(authData).pipe(take(1)).subscribe({
      next: (response) => {
        const res = response;
        console.log('res: ', res)
      },
      error: () => {
        this.wrongPass.set(true);
        setTimeout(() => {
          this.wrongPass.set(false);
        }, 2000)
      }
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
