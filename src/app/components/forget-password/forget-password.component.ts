import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ForgetPassService } from 'src/app/service/forget-pass.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {


  constructor(private _ForgetPassService: ForgetPassService , private _Router:Router) { }

  step1: boolean = true
  step2: boolean = false
  step3: boolean = false
  email: string = ''
  isMsg: string = ''

  forgetCodePassword: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })


  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{4,8}$/)])
  })

  resetCodePassword: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required , Validators.pattern(/^[A-Za-z0-9]{6,}/)])
  })

  passwordForget(): void {
    let forgetPassword = this.forgetCodePassword.value;
    this.email = forgetPassword.email
    this._ForgetPassService.forgotPasswords(forgetPassword).subscribe({
      next: (response) => {
        this.isMsg = response.message
        this.step1 = false
        this.step2 = true
      }, error: (err) => {
        this.isMsg = err.error.message
      }
    })
  }
  passwordReset(): void {
    let resetCode = this.resetCodeForm.value;
    this._ForgetPassService.resetCode(resetCode).subscribe({
      next: (response) => {
        this.isMsg = response.status
        this.step2 = false
        this.step3 = true
      }, error: (err) => {
        this.isMsg = err.error.status
      }
    })
  }
  passwordCodeForget(): void {
    let resetPassword = this.resetCodePassword.value;
    resetPassword.email = this.email
    this._ForgetPassService.resetPassword(resetPassword).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('token',response.token)
          this._Router.navigate(['/home'])
        }

      }, error: (err) => {
        this.isMsg = err.error.message
      }
    })
  }

}
