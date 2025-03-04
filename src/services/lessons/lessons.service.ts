import { Injectable } from '@angular/core';
import { Lesson } from '../../models/Lesson';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  public lessonsSubject: BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);
  lessons$: Observable<Lesson[]>;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.lessons$ = this.lessonsSubject.asObservable()
  }

  getLessons(courseId: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`http://localhost:3000/api/courses/${courseId}/lessons`).pipe(
      tap(lessons => this.lessonsSubject.next(lessons))
    )
  }


  addLesson(result: any, courseId: number) {
    const { title, content } = result
    return this.http.post<Lesson>(`http://localhost:3000/api/courses/${courseId}/lessons`, { title, content, courseId }).pipe(
      tap(() => this.getLessons(courseId)) // לאחר ההוספה מבצעים קריאה לעדכון השיעורים
    );
  }
  updateLesson(result: any, courseId: number) {
    const { title, content, idLesson } = result
    const id = idLesson
    return this.http.put<any>(`http://localhost:3000/api/courses/${courseId}/lessons/${id}`, { title, content, courseId }).pipe(
      tap(() => this.getLessons(courseId)) // לאחר העדכון, מבצעים קריאה לעדכון השיעורים
    );
  }

  deleteLesson(id: number, courseId: number) {
    return this.http.delete<any>(`http://localhost:3000/api/courses/${courseId}/lessons/${id}`).pipe(
      tap(() => this.getLessons(courseId)) // לאחר העדכון, מבצעים קריאה לעדכון השיעורים
    );
  }

}















