import { CanActivateFn, Router } from '@angular/router';
import { CoursesService } from '../services/courses/courses.service';
import { inject } from '@angular/core';

export const teacherGuard: CanActivateFn = (route, state) => {
  const isLogin = sessionStorage.getItem('token');
  const router = inject(Router);
  const service = inject(CoursesService);
  const status = service.getRoleByToken()
  console.log(status);

  if (status === 'teacher') {
    return true;
  }
  return false;
};