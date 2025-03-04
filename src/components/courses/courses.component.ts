import { Component, Input, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
// import { OneCourseComponent } from '../one-course/one-course.component';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule, MatToolbarRow } from '@angular/material/toolbar';

@Component({
  selector: 'app-courses',
  imports: [RouterOutlet,RouterLink, RouterLinkActive, MatButtonModule, MatToolbarModule, RouterModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent  {

}
