import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { EMPTY } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();
  console.log('Token in Interceptor:', token);
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  // else {
  //   alert(' פעולה זו ניתנת עבור משתמש מחובר בלבד'); // הודעה למשתמש
  //   return EMPTY; // מבטל את הבקשה
  // }
  return next(req);

};

