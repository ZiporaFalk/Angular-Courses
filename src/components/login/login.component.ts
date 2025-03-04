import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { UserLogin } from '../../models/UserLogin';

@Component({
  selector: 'login',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userLogin!: UserLogin
  successMessage: string = ' '

  constructor(private fb: FormBuilder, private authService: AuthService) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    }); 

  }
  get user(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.userLogin = this.loginForm.value
      console.log(this.userLogin);
      this.authService.login(this.userLogin).subscribe({
        next: (response) => {
          // טיפול בהצלחה
          this.successMessage = 'התחברת בהצלחה';
          // כאן תוכל להוסיף קוד נוסף, כמו ניתוב לדף אחר
        },
        error: (error) => {
          // טיפול בשגיאה
          this.successMessage = 'אירעה שגיאה במהלך ההתחברות'

        }
      });
    }
  }

}
