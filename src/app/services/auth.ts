import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSignal = signal<string | null>(localStorage.getItem('access_token'));

  public userRole = computed<string | null>(() => {
    const token = this.tokenSignal();
    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
      const payloadData = JSON.parse(decodedPayload);

      return payloadData.role || null;
    } catch (error) {
      console.error('Помилка декодування JWT токена:', error);
      return null;
    }
  });

  public isAuthenticated = computed(() => !!this.tokenSignal());

  public isAdmin = computed(() => this.userRole() === 'admin');

  public getToken(): string | null {
    return this.tokenSignal();
  }

  public saveToken(token: string): void {
    localStorage.setItem('access_token', token);
    this.tokenSignal.set(token);
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    this.tokenSignal.set(null);
  }
}