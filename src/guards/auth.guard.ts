import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const isLogin = sessionStorage.getItem('token');
  const router = inject(Router); // שימוש ב-inject כדי לקבל את ה-Router
  
  if (!isLogin) {
    router.navigate(['/auth'], { queryParams: { returnUrl: state.url } }); // אפשר לשלוח את ה-URL הנוכחי כדי לחזור אליו אחרי התחברות
    return false;
  }
  return true;
};
 