import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { name: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/tecnoal/login`, credentials).pipe(
      tap((response: any) => {
        const token = response.token;
        localStorage.setItem('token', token);
        const userId = response.id;
        localStorage.setItem('Nombre_Empleado', response.Nombre_Empleado);
        localStorage.setItem('userId', userId);
        console.log('Autenticación exitosa:', response);
        this.router.navigate(['/layout']);
      }),
      catchError((error) => {
        console.error('Error en la autenticación:', error);
        throw error;
      }),
    );
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/tecnoal/logout`, {}, { headers }).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('Nombre_Empleado');
        console.log('Sesión cerrada exitosamente');
        this.router.navigate(['/login']);
      }),
      catchError((error) => {
        console.error('Error al cerrar sesión:', error);
        throw error;
      }),
    );
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
