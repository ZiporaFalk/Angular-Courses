import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { UserRegister } from '../../models/UserRegister';

@Component({
  selector: 'register',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  userRegister!: UserRegister;
  successMessage: string = ' '

  constructor(private fb: FormBuilder, private authService: AuthService) { }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      role: ['', Validators.required],
    });
  }
  get user(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.userRegister = this.registerForm.value

      this.authService.register(this.userRegister).subscribe({
        next: (response) => {
          this.successMessage = 'ההרשמה הצליחה!';
        },
        error: (error) => {
          this.successMessage = 'הייתה שגיאה בהרשמה. נסה שוב מאוחר יותר.';
        }
      });
    }
  }
}
