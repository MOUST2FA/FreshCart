import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, FormControlOptions } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  isLoading: boolean = false;
  msg: string = ''

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,}$/)]),
    rePassword: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}/)]),
  }, { validators: [this.changePassword] } as FormControlOptions)

  changePassword(group: FormGroup): void {
    const password = group.get('password')
    const rePassword = group.get('rePassword')

    if (rePassword?.value == '') {
      rePassword?.setErrors({ required: true })
    }

    else if (password?.value !== rePassword?.value) {
      rePassword?.setErrors({ mismatch: true })
    }
  }

  handelForm(): void {
    this.isLoading = true
    const userData = this.registerForm.value
    if (this.registerForm.valid == true) {
      this._AuthService.register(userData).subscribe({
        next: (response) => {

          this.isLoading = false
          if (response.message == 'success') {
            this._Router.navigate(['/login'])
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
