import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { RolesService } from 'src/app/core/services/roles.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registrarusuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],

  templateUrl: './registrarusuarios.component.html',
  styleUrl: './registrarusuarios.component.scss',
})
export class RegistrarusuariosComponent {
  user: any = {};
  registrousuario: boolean = false; // Variable para controlar el estado del spinner
  roles: any[] = []; // Arreglo para almacenar los roles

  constructor(
    private usuariosService: UsuariosService,
    private rolesService: RolesService, // Inyecta el servicio de roles
    private dialogRef: MatDialogRef<RegistrarusuariosComponent>,
  ) {}

  ngOnInit(): void {
    // Cuando se inicializa el componente, se obtienen los roles
    this.obtenerRoles();
  }

  obtenerRoles() {
    // Lógica para obtener los roles utilizando el servicio de roles
    this.rolesService.obtenerRoles().subscribe(
      (roles: any[]) => {
        // Cuando se obtienen los roles con éxito, se asignan al arreglo roles
        this.roles = roles;
      },
      (error) => {
        console.error('Error al obtener roles:', error);
        // Aquí puedes agregar lógica adicional para manejar el error, como mostrar un mensaje al usuario
      },
    );
  }
  registerUser() {
    // Activa el spinner
    this.registrousuario = true;

    // Lógica para registrar el usuario
    this.usuariosService
      .registerUsuario(this.user)
      .subscribe(
        (response) => {
          // Muestra una alerta de éxito utilizando SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario registrado exitosamente',
          });
          // Cierra el modal
          this.dialogRef.close();
        },
        (error) => {
          // Muestra una alerta de error utilizando SweetAlert2
          let errorMessage = '';
          if (error.error.errors) {
            // Assert the type of error.error.errors as Record<string, string[]>
            const errors = error.error.errors as Record<string, string[]>;

            Object.values(errors).forEach((errorMessages) => {
              // Here, TypeScript will know that errorMessages is of type string[]
              errorMessages.forEach((message) => {
                errorMessage += `${message}\n`;
              });
            });
          } else {
            errorMessage = error.error.message;
          }

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
          });
        },
      )
      .add(() => {
        // Desactiva el spinner al completar la operación (tanto si tiene éxito como si falla)
        this.registrousuario = false;
      });
  }

  onCancel() {
    // Función para cerrar el modal sin realizar ninguna acción
    this.dialogRef.close();
  }
}
