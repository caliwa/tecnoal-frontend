import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restablecercontrasena',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './restablecercontrasena.component.html',
  styleUrls: ['./restablecercontrasena.component.scss'],
})
export class RestablecercontrasenaComponent {
  user: any = {};
  confirmPassword: string = '';
  updatingUser: boolean = false;
  validationErrorMessage: string = ''; // Variable para almacenar el mensaje de error de validación

  constructor(
    public dialogRef: MatDialogRef<RestablecercontrasenaComponent>,
    private usuariosService: UsuariosService,
    @Inject(MAT_DIALOG_DATA) public data: any, // Injecta los datos del diálogo
  ) {
    if (data && data.userId) {
      this.user.id = data.userId; // Obtiene el ID del usuario desde los datos del diálogo
    }
  }

  resetPassword() {
    if (this.isPasswordValid()) {
      const payload = {
        password: this.user.password,
        password_confirmation: this.confirmPassword,
      };

      this.updatingUser = true;

      // Llama al método del servicio para restablecer la contraseña, pasando el ID del usuario
      this.usuariosService.resetPassword(this.user.id, payload).subscribe(
        (response: any) => {
          console.log(response);
          // Restablecimiento de contraseña exitoso
          Swal.fire('Éxito', response.message, 'success'); // Muestra una alerta de éxito
          this.updatingUser = false;
          this.dialogRef.close();
        },
        (error) => {
          console.error(error);
          // Manejo de errores
          if (error.error && error.error.errors && error.error.errors.password) {
            this.validationErrorMessage = error.error.errors.password[0]; // Captura el mensaje de error de validación
          } else {
            this.validationErrorMessage = 'Error al restablecer la contraseña'; // Mensaje de error predeterminado
          }
          Swal.fire('Error', this.validationErrorMessage, 'error'); // Muestra una alerta de error
          this.updatingUser = false;
        },
      );
    }
  }

  isPasswordValid(): boolean {
    return this.user.password && this.confirmPassword && this.user.password === this.confirmPassword;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
