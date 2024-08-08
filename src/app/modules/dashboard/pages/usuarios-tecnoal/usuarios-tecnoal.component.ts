import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RegistrarusuariosComponent } from './registrarusuarios/registrarusuarios.component';
import { EditarusuariosComponent } from './editarusuarios/editarusuarios.component';
import { RestablecercontrasenaComponent } from './restablecercontrasena/restablecercontrasena.component';

import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { RolesService } from 'src/app/core/services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-tecnoal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RegistrarusuariosComponent,
    EditarusuariosComponent,
    RestablecercontrasenaComponent,
  ],
  templateUrl: './usuarios-tecnoal.component.html',
  styleUrl: './usuarios-tecnoal.component.scss',
})
export class UsuariosTecnoalComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'Nombre_Empleado', 'email', 'roles', 'actions'];
  columnAliases: { [key: string]: string } = {
    id: 'ID',
    name: 'Usuario',
    Nombre_Empleado: 'Nombre Empleado',
    email: 'Correo Electrónico',
    roles: 'Role',
    actions: 'Acciones',
  };
  dataSource = new MatTableDataSource<any>();
  usuarios: any[] = [];
  updatingUser: boolean = false;

  constructor(
    private usuariosService: UsuariosService,
    private dialog: MatDialog,
    private rolesService: RolesService,
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.usuariosService.usuarioRegistrado$.subscribe(() => {
      this.obtenerUsuarios();
    });
  }

  obtenerUsuarios(): void {
    this.updatingUser = true;
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (usuarios: any[]) => {
        this.usuarios = usuarios;
        this.dataSource.data = usuarios;
        this.updatingUser = false;
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
        this.updatingUser = false;
      },
    });
  }

  openRegistrarUsuariosModal(): void {
    this.dialog.open(RegistrarusuariosComponent, {
      width: '600px',
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearFilter(): void {
    this.dataSource.filter = '';
  }

  editarUsuario(usuario: any): void {
    this.rolesService.obtenerRoles().subscribe({
      next: (roles: any[]) => {
        const userRole = usuario.roles[0].name;
        console.log('Rol del usuario a editar:', userRole);
        const dialogRef = this.dialog.open(EditarusuariosComponent, {
          data: {
            user: usuario,
            roles: roles,
            userRole: userRole,
          },
        });
        dialogRef.afterClosed().subscribe(() => {
          this.obtenerUsuarios();
        });
      },
      error: (error) => {
        console.error('Error al obtener roles:', error);
      },
    });
  }

  restablecerContrasena(usuario: any): void {
    this.dialog.open(RestablecercontrasenaComponent, {
      data: { userId: usuario.id },
    });
  }

  inactivarUsuario(usuario: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas inactivar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, inactivar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.updatingUser = true;
        this.usuariosService.inactivarUsuario(usuario.id).subscribe({
          next: (response: any) => {
            this.updatingUser = false;
            this.obtenerUsuarios();
            Swal.fire({
              icon: 'success',
              title: 'Usuario inactivado',
              text: response.message,
            });
          },
          error: (error: any) => {
            console.error('Error al inactivar usuario:', error);
            this.updatingUser = false;
            let errorMessage = '';
            if (error.error.errors) {
              const errors = error.error.errors as Record<string, string[]>;
              Object.values(errors).forEach((errorMessages) => {
                errorMessages.forEach((message) => {
                  errorMessage += `${message}\n`;
                });
              });
            } else {
              errorMessage = error.error.message;
            }
            Swal.fire({
              icon: 'error',
              title: 'Error al inactivar usuario',
              text: errorMessage,
            });
          },
        });
      }
    });
  }
}
