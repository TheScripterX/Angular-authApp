import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//
import { AuthService } from '../../services/auth.service';
//
import Swal from 'sweetalert2';
import { AuthResponse } from '../../interfaces/interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
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
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    const { name, email, password } = this.myAuthForm.value;
    this.authService.register(name, email, password).subscribe((ok) => {
      if (ok === true) {
        this.router.navigateByUrl('/dashboard');
      } else {
        console.log(ok);
        // Swal = SweetAlert package
        Swal.fire('error', ok, 'error');
      }
    });
  }
}
