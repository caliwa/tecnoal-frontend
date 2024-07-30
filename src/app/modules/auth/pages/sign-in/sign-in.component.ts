import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf} from '@angular/common';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthService } from './../../../../core/services/auth-service/auth.service';

import { ButtonComponent } from '../../../../shared/components/button/button.component';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgClass, NgIf, ButtonComponent],
  providers: [AuthService],
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  authenticating: boolean = false;
  errorMessage: string = ''; // Variable para almacenar el mensaje de error del servidor

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private authService: AuthService,
  ) {}

  onClick() {
    console.log('Button clicked');
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.authenticating = true; // Establece authenticating en true cuando se hace clic en el botón
      this.submitted = true;
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: (response) => {
          // Manejar la respuesta exitosa aquí
          console.log('Login exitoso:', response);
          // Aquí puedes agregar la lógica para redireccionar o actualizar el estado de la aplicación
        },
        error: (error) => {
          console.log('Error en el inicio de sesión:', error);
        this.authenticating = false;

          let errorMessage = '';

          if (error.status === 401) {
            errorMessage = 'Credenciales inválidas, verifica e intenta nuevamente';
          } else if (error.status === 403) {
            errorMessage = 'Tu cuenta está inactiva. Por favor, contacta al administrador';
          } else {
            errorMessage = 'Error en la autenticación. Por favor, inténtalo de nuevo.';
          }

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
          });

          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        },
        complete: () => {
          this._router.navigate(['/layout']);

          console.log('Login attempt completed');
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // getNombreEmpleado(): string {
  //   return localStorage.getItem('Nombre_Empleado');
  // }

  // getUserId(): string {
  //   return localStorage.getItem('userId');
  // }
}
