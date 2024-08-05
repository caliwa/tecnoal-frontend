import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PermissionsService } from 'src/app/core/services/permissions.service';
import { RolesService } from 'src/app/core/services/roles.service';
import { RegistrarpermisosComponent } from './registrarpermisos/registrarpermisos.component';
import { EditarpermisosComponent } from './editarpermisos/editarpermisos.component';
import { RegistrarrolesComponent } from './registrarroles/registrarroles.component';
import { EditarrolesComponent } from './editarroles/editarroles.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles-permisos-tecnoal',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatTooltipModule],
  templateUrl: './roles-permisos-tecnoal.component.html',
  styleUrl: './roles-permisos-tecnoal.component.scss',
})
export class RolesPermisosTecnoalComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'guard_name', 'created_at', 'updated_at', 'actions'];
  columnAliases: { [key: string]: string } = {
    id: 'ID',
    name: 'Nombre',
    guard_name: 'Guardia',
    created_at: 'Fecha de Creación',
    updated_at: 'Fecha de Actualización',
    actions: 'Acciones',
  };
  permisosDataSource = new MatTableDataSource<any>();
  rolesDataSource = new MatTableDataSource<any>();
  permisos: any[] = [];
  roles: any[] = [];
  cargandoRoles: boolean = false;

  constructor(
    private permisosService: PermissionsService,
    private rolesService: RolesService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.obtenerPermisos();
    this.obtenerRoles();
  }

  obtenerPermisos() {
    this.permisosService.obtenerPermisos().subscribe(
      (permisos: any[]) => {
        this.permisos = permisos;
        this.permisosDataSource.data = permisos;
      },
      (error) => {
        console.error('Error al obtener los permisos:', error);
      },
    );
  }

  obtenerRoles() {
    this.cargandoRoles = true;
    this.rolesService.obtenerRoles().subscribe(
      (roles: any[]) => {
        this.cargandoRoles = false;
        this.roles = roles;
        this.rolesDataSource.data = roles;
      },
      (error) => {
        console.error('Error al obtener roles:', error);
        this.cargandoRoles = false;
      },
    );
  }

  getCellValue(item: any, column: string): string {
    return item[column];
  }

  openRegistrarPermisosModal() {
    const dialogRef = this.dialog.open(RegistrarpermisosComponent, {
      width: '400px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerPermisos();
      }
    });
  }

  openEditarPermisosModal(id: number) {
    const dialogRef = this.dialog.open(EditarpermisosComponent, {
      width: '400px',
      data: { permissionId: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerPermisos();
      }
    });
  }

  openRegistrarRolesModal() {
    const dialogRef = this.dialog.open(RegistrarrolesComponent, {
      width: '400px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.obtenerRoles();
    });
  }

  openEditarRolesModal(id: number) {
    const role = this.roles.find((role) => role.id === id);
    const dialogRef = this.dialog.open(EditarrolesComponent, {
      width: '400px',
      data: { role, permissions: role.permissions },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.obtenerRoles();
    });
  }

  eliminarRol(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este rol.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolesService.eliminarRol(id).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Rol eliminado exitosamente',
            });
            this.obtenerRoles();
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al eliminar el rol',
            });
          },
        );
      }
    });
  }
}
