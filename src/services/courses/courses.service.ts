import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Course } from '../../models/Course';
import { LessonsService } from '../lessons/lessons.service';
import { jwtDecode } from 'jwt-decode';
import { Lesson } from '../../models/Lesson';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private coursesSubject: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]>;

  constructor(private http: HttpClient, private authService: AuthService, private lessonService: LessonsService) {
    this.courses$ = this.coursesSubject.asObservable()
  }
  getCourses() {
    this.http.get<Course[]>('http://localhost:3000/api/courses').subscribe(data => {
      data.forEach((c) => {
        this.lessonService.getLessons(c.id)
          .subscribe(lessons => {
            c.Lessons = lessons
          });
      })
      this.coursesSubject.next(data)
    })
  }

  getCoursesStudent(): Observable<Course[]> {
    const studentId = this.authService.getUserId()
    return this.http.get<Course[]>(`http://localhost:3000/api/courses/student/${studentId}`)
  }
  addCourse(result: any) {
    var userId = this.authService.getUserId()
    console.log(userId + 'userid');
    const { title, description } = result
    this.http.post<Course>('http://localhost:3000/api/courses', { title, description, userId }).subscribe(() => {
      this.getCourses()
    })
  }

  updateCourse(result: any) {
    var teacherId = this.authService.getUserId()
    const { title, description, idCourse } = result
    const id = idCourse
    this.http.put<any>(`http://localhost:3000/api/courses/${id}`, { title, description, teacherId }).subscribe(() => {
      this.getCourses()
    })
  }

  deleteCourse(id: number) {
    this.courses$.subscribe((c) => {
      const course = c.find((c) => id == c.id);
      if (!course) return; // אם הקורס לא נמצא, לא להמשיך
      const deleteLessonRequests = course.Lessons.map((l) =>
        this.lessonService.deleteLesson(l.id, course.id)
      );
      forkJoin(deleteLessonRequests).subscribe(() => {
        this.http.delete<any>(`http://localhost:3000/api/courses/${id}`).subscribe(() => {
          this.getCourses();
        });
      });
    });
  }
  joinCourse(courseId: number) {
    const userId = this.authService.getUserId()
    this.http.post(`http://localhost:3000/api/courses/${courseId}/enroll`, { userId }).subscribe(() => {
      this.getCourses()
    })
  }
  leaveCourse(courseId: number) {
    const userId = this.authService.getUserId()
    this.http.delete(`http://localhost:3000/api/courses/${courseId}/unenroll`, { body: { userId } }).subscribe(() => {
      this.getCourses()
    })
  }

  getRoleByToken(): string {
    const token = sessionStorage.getItem('token');
    if (!token) return ''
    try {
      const decodedToken: any = jwtDecode(token)

      console.log(decodedToken.role);

      return decodedToken.role
    }
    catch (error) {
      console.error('שגיאה בפענוח ה-Token:', error)
      return ''
    }
  }


}
