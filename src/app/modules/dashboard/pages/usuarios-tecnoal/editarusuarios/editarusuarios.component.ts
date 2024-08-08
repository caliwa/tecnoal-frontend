import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import Swal from 'sweetalert2';
import { IUsuarios } from 'src/app/Interface/Usuarios/iusuarios';

@Component({
  selector: 'app-editarusuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './editarusuarios.component.html',
  styleUrls: ['./editarusuarios.component.scss'],
})
export class EditarusuariosComponent implements OnInit {
  user!: IUsuarios;
  updatingUser: boolean = false;
  roles: any[] = [];
  selectedRole!: string; // Variable para almacenar el rol seleccionado por el usuario

  @Output() usuarioActualizado: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<EditarusuariosComponent>,
    private usuariosService: UsuariosService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data && data.user) {
      this.user = { ...data.user };
      this.roles = data.roles;

      // Utilizamos directamente data.userRole como el rol actual del usuario
      this.selectedRole = data.userRole;
      console.log('Rol del usuario a editar:', this.selectedRole); // Agrega este log para verificar el rol recibido
    }
  }

  ngOnInit(): void {
    // No necesitamos buscar el rol actual del usuario aquí ya que ya lo asignamos en el constructor
  }

  updateUser() {
    // Activa el spinner
    this.updatingUser = true;

    // Asigna el nuevo rol seleccionado al usuario
    this.user.rol = this.selectedRole;

    // Lógica para actualizar el usuario
    this.usuariosService
      .actualizarUsuario(this.user)
      .subscribe(
        (response) => {
          // Muestra una alerta de éxito utilizando SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario actualizado exitosamente',
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
              // TypeScript knows errorMessages is string[]
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
        // Desactiva el spinner después de la operación (tanto si tiene éxito como si falla)
        this.updatingUser = false;
      });
  }

  onCancel() {
    // Función para cerrar el modal sin realizar ninguna acción
    this.dialogRef.close();
  }
}
