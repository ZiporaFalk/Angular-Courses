import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { CoursesService } from '../../services/courses/courses.service';
import { ListCoursesComponent } from '../list-courses/list-courses.component';
import { Observable } from 'rxjs';
import { Course } from '../../models/Course';

@Component({
  selector: 'course-management',
  imports: [MatButtonModule, ListCoursesComponent],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent implements OnInit {
  Message: string = ''
  allCourses$: Observable<Course[]>;

  constructor(public http: HttpClient, private coursesService: CoursesService, public dialog: MatDialog) {
    this.coursesService.getCourses()
    this.allCourses$ = this.coursesService.courses$
  }
  ngOnInit(): void {
    this.coursesService.getCourses()
  }

  openDialog(action: string): void {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      width: '400px', // רוחב הדיאלוג
      height: '300px', // גובה הדיאלוג
      data: { title: '', description: '', action }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (action == 'Add') {
          this.coursesService.addCourse(result)
        }
        else if (action == 'Update') {
          this.coursesService.updateCourse(result)

        }
        else if (action == 'Delete') {
          this.coursesService.deleteCourse(result.idCourse)

        }
      }
    });
  }
}


