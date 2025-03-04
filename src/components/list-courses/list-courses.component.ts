import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Course } from '../../models/Course';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LessonsService } from '../../services/lessons/lessons.service';
import { LessonDialogComponent } from '../lesson-dialog/lesson-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'list-courses',
  standalone: true,
  imports: [MatCardModule, MatIcon, MatListModule, MatIconModule, MatButtonModule, AsyncPipe],
  templateUrl: './list-courses.component.html',
  styleUrl: './list-courses.component.css'
})
export class ListCoursesComponent implements OnInit {
  Message: string = '';
  allCourses$: Observable<Course[]>;
  @Input() IsToShow: boolean = false

  constructor(private coursesService: CoursesService, private http: HttpClient, private lessonService: LessonsService, public dialog: MatDialog) {
    this.allCourses$ = this.coursesService.courses$;
  }

  ngOnInit(): void {
    this.coursesService.getCourses();
    console.log("list-" + this.IsToShow);
  }
  openDialog(action: string, courseId: number): void {
    const dialogRef = this.dialog.open(LessonDialogComponent, {
      width: '400px', // רוחב הדיאלוג
      height: '300px', // גובה הדיאלוג
      data: { title: '', content: '', action }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(`${action} קורס:`, result);
        if (action == 'Add') {
          this.lessonService.addLesson(result, courseId).subscribe(() => {
            this.coursesService.getCourses(); // עדכון הקורסים לאחר הוספת שיעור
          });
        }
        else if (action == 'Update') {
          this.lessonService.updateLesson(result, courseId).subscribe(() => {
            this.coursesService.getCourses(); // עדכון הקורסים לאחר הוספת שיעור
          });
        }
        else if (action == 'Delete') {
          this.lessonService.deleteLesson(result.idLesson, courseId).subscribe(() => {
            this.coursesService.getCourses(); // עדכון הקורסים לאחר הוספת שיעור
          });
        }
      }
    });
  }
  joinCourse(courseId: number) {
    this.coursesService.joinCourse(courseId)
  }

  leaveCourse(courseId: number) {
    this.coursesService.leaveCourse(courseId)
  }
}

