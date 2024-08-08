import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'; // Importa catchError desde 'rxjs/operators'
import { Observable, Subject, throwError } from 'rxjs'; // Importa throwError desde 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  usuarioActualizado$: Subject<void> = new Subject<void>(); // Evento para notificar la actualización de usuarios

  private apiUrl = environment.apiUrl;
  private usuarioRegistradoSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  obtenerUsuarios() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`, { headers });
  }

  registerUsuario(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/register`, userData, { headers }).pipe(
      tap(() => {
        this.usuarioRegistradoSubject.next(); // Emitir evento de usuario registrado
      }),
      catchError((error) => {
        // Captura todos los errores del servidor y los relanza
        return throwError(error);
      })
    );
  }

  get usuarioRegistrado$() {
    return this.usuarioRegistradoSubject.asObservable();
  }

  resetPassword(userId: string, payload: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/reset-password/${userId}`, payload, { headers });
  }

  actualizarUsuario(usuario: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('el rol que se esta enviando es: ', usuario.rol);
    return this.http.put<any>(`${this.apiUrl}/usuarios/actualizar/${usuario.id}`, usuario, { headers }).pipe(
      tap(() => this.usuarioActualizado$.next()) // Emitir evento de actualización exitosa
    );
  }

  // Nuevo método para inactivar un usuario
  inactivarUsuario(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .put<any>(`${this.apiUrl}/usuarios/inactivar/${userId}`, null, { headers })
      .pipe(tap(() => this.usuarioActualizado$.next()));
  }
}
