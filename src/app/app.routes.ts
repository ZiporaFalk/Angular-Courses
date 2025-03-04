import { Routes } from '@angular/router';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { ListCoursesComponent } from '../components/list-courses/list-courses.component';
import { MyCoursesComponent } from '../components/my-courses/my-courses.component';
import { CourseManagementComponent } from '../components/course-management/course-management.component';
import { teacherGuard } from '../guards/teacher.guard';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [

    {
        path: '', component: HomePageComponent, children: [
            { path: 'Logout', redirectTo: '', pathMatch: 'full' },
            { path: 'Login', component: LoginComponent, },
            { path: 'Register', component: RegisterComponent },
            {
                path: 'Courses', component: CoursesComponent,
                children: [
                    { path: 'ListCourses', component: ListCoursesComponent, canActivate: [authGuard] },
                    { path: 'MyCourses', component: MyCoursesComponent, canActivate: [authGuard] },
                    { path: 'ManageCourses', component: CourseManagementComponent, canActivate: [teacherGuard] }
                ]
            }
        ]
    }
];
