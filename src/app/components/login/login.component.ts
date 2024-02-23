import { Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _AuthService: AuthService, private _Router:Router) { }

  isLoading: boolean = false;
  msg: string = ''

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,}$/)]),
  })

  handelForm(): void {
    this.isLoading = true

    const userData = this.loginForm.value
    if (this.loginForm.valid == true) {
      this._AuthService.login(userData).subscribe({
        next: (response) => {
          this.isLoading = false
          if (response.message == 'success') {
            localStorage.setItem('token' ,response.token)
            this._Router.navigate(['/home'])
          }

        },
        error: (err) => {
          this.msg = err.error.message
          this.isLoading = false
        }
      })
    }

  }

}
