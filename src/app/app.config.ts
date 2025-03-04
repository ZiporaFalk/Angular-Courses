import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../interceptors/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(withEventReplay()),
  provideAnimationsAsync(),
  provideHttpClient(withInterceptors([authInterceptor]))]
};
/////////////////////////////////////////////////
// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { CoursesService } from '../services/courses.service';

// export const teacherManagerGuard: CanActivateFn = (route, state) => {
// const isLogin=sessionStorage.getItem('token');
// const router=inject(Router);
// const service=inject(CoursesService);
// const status=service.getRoleByToken()
// console.log(status);

// if(status==='teacher'){
//   // router.navigate(['/coursesForTeacherManager'])
//   return true;
// }
//   return false;
// };
