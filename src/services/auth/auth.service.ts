import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../../models/UserLogin';
import { UserRegister } from '../../models/UserRegister';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(userlogin: UserLogin): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/auth/login`, userlogin)
      .pipe(
        tap((response: any) => {
          console.log('Login response:', response); // לוודא שהשרת מחזיר טוקן
          if (response.token) {
            this.saveToken(response.token); // לשמור את הטוקן
            console.log('Token saved:', response.token);
          } else {
            console.warn('No token received!');
          }
        })
      );
  }
  register(userregister: UserRegister): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/auth/register`, userregister).pipe(
      tap((response: any) => {
        console.log('Login response:', response); // לוודא שהשרת מחזיר טוקן
        if (response.token) {
          this.saveToken(response.token); // לשמור את הטוקן
          console.log('Token saved:', response.token);
        } else {
          console.warn('No token received!');
        }
      })
    );
  }
  saveToken(token: string) {
    sessionStorage.setItem('token', token)
  }
  getToken() {
    return sessionStorage.getItem('token')
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // מפענח את ה- payload
      return payload.userId || null; // מחזיר את userId אם קיים
    } catch (error) {
      console.error('Invalid token-----בפונקציה: getUserId', error);
      return null;
    }
  }
  Logout() {
    sessionStorage.removeItem('token')
  }

}


