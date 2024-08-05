import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolesService } from 'src/app/core/services/roles.service';
import { PermissionsService } from 'src/app/core/services/permissions.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-editarroles',
  templateUrl: './editarroles.component.html',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule],
  styleUrls: ['./editarroles.component.scss'],
})
export class EditarrolesComponent implements OnInit {
  role: any = {};
  permissions: any[] = [];
  selectedPermissions: any[] = [];
  registrorol = false; // Bandera para controlar la visibilidad del spinner

  constructor(
    private rolesService: RolesService,
    private permissionsService: PermissionsService,
    public dialogRef: MatDialogRef<EditarrolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.role = { ...data.role };

    // Inicializa role.estadorol con el valor proporcionado en los datos y ajusta su tipo a string
    this.role.estadorol = this.role.estadorol === '1' ? 'Activo' : 'Inactivo';
  }

  ngOnInit(): void {
    this.obtenerPermisos();
  }

  obtenerPermisos() {
    this.permissionsService.obtenerPermisos().subscribe(
      (permisos: any[]) => {
        this.permissions = permisos;
        // Marcar los permisos que tiene el rol seleccionado
        this.selectedPermissions = this.role.permissions.map((rolePermission: { id: any }) => rolePermission.id);
      },
      (error) => {
        console.error('Error al obtener permisos:', error);
      },
    );
  }

  updateRole() {
    // Convierte el valor de role.estadorol a true o false antes de enviarlo al servidor
    this.role.estadorol = this.role.estadorol === 'Activo';

    if (!this.role.name || !this.role.permissions || this.role.permissions.length === 0) {
      console.error('Nombre y permisos son campos requeridos.');
      return;
    }
    // Mostrar el spinner
    this.registrorol = true;

    // Actualizar los permisos del rol con los nuevos permisos seleccionados
    this.role.permissions = this.selectedPermissions.map((id) => ({ id }));
    this.rolesService.actualizarRol(this.role.id, this.role).subscribe(
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
        // Detener el spinner en caso de error
        this.registrorol = false;

        // Muestra una alerta de error utilizando SweetAlert2
        let errorMessage = '';
        if (error.error && error.error.errors) {
          Object.values(error.error.errors).forEach((errorMessages: unknown) => {
            if (Array.isArray(errorMessages)) {
              errorMessages.forEach((message: string) => {
                errorMessage += `${message}\n`;
              });
            }
          });
        } else {
          errorMessage = error.error.message;
        }

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage as string,
        });
      },
    );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
