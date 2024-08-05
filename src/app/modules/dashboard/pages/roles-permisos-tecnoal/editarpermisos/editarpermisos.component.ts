import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PermissionsService } from 'src/app/core/services/permissions.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editarpermisos',
  templateUrl: './editarpermisos.component.html',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule],
  styleUrls: ['./editarpermisos.component.scss'],
})
export class EditarpermisosComponent {
  permission: any; // Define una propiedad para almacenar el permiso a editar

  constructor(
    public dialogRef: MatDialogRef<EditarpermisosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private permissionsService: PermissionsService,
  ) {
    // Obtén el permiso pasado como dato al abrir el diálogo
    this.permission = { ...data.permission };
  }

  // Función para actualizar el permiso
  actualizarpermiso(): void {
    this.permissionsService.actualizarPermiso(this.permission.id, this.permission).subscribe(
      (response) => {
        console.log('Permiso actualizado:', response);
        this.dialogRef.close(this.permission); // Cierra el diálogo con el permiso actualizado como resultado
      },
      (error) => {
        console.error('Error al actualizar el permiso:', error);
        // Aquí puedes manejar el error de acuerdo a tus necesidades
      },
    );
  }

  // Agrega una función para cancelar la edición y cerrar el diálogo sin resultado
  onCancel(): void {
    this.dialogRef.close();
  }
}
