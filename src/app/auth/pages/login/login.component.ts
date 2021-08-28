import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//
import { AuthService } from '../../services/auth.service';
//
import Swal from 'sweetalert2';
import { AuthResponse } from '../../interfaces/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  myAuthForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initMyForm();
  }

  initMyForm() {
    this.myAuthForm = this.fb.group({
      email: ['test1@test.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    console.log(this.myAuthForm.value);
    // Extract Email & Password from myAuthForm Value
    const { email, password } = this.myAuthForm.value;
    this.authService.login(email, password).subscribe((ok) => {
      console.log(ok);
      if (ok === true) {
        this.router.navigateByUrl('/dashboard');
      } else {
        // Swal = SweetAlert package
        Swal.fire('error', ok, 'error');
      }
    });
    // this.authService.validateToken().subscribe((res) => console.log(res));
  }
}
