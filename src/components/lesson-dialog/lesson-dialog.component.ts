import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export interface DialogData {
  title: string;
  content: string;
  action: string
  idLesson: number
}
@Component({
  selector: 'lesson-dialog',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, FormsModule, MatDialogClose],
  templateUrl: './lesson-dialog.component.html',
  styleUrl: './lesson-dialog.component.css'
})
export class LessonDialogComponent {
  constructor(public dialogRef: MatDialogRef<LessonDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
