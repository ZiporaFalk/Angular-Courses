import { OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../models/Course';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatList, MatListItem } from '@angular/material/list';
import { LessonsService } from '../../services/lessons/lessons.service';

@Component({
  selector: 'my-courses',
  imports: [MatCardModule, CommonModule, MatList, MatListItem],
  // imports: [AsyncPipe, MatCardModule, MatIcon, CommonModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {
  Message: string = ''
  a: Course[] = []
  activeCourses: number[] = []; // מערך של קורסים פעילים

  constructor(private coursesService: CoursesService, private http: HttpClient, private authService: AuthService, private lessonServices: LessonsService) {
 
  }
  ngOnInit(): void {
    this.coursesService.getCoursesStudent().subscribe({
      next: (data) => {
        this.a = data;
        this.a.forEach((c) => {
          this.lessonServices.getLessons(c.id).subscribe({
            next: (data) => { c.Lessons = data },
            error: (err) => {
              console.error(`Failed to fetch lessons for course ${c.id}:`, err);
            }
          })
        }) // עדכון המערך a בקורסים
      },
      error: (err) => {
        console.error('Failed to fetch courses for student:', err);
      }
    });
  }

}
