// src/app/modules/dashboard/services/producto-certificado-tecnoal.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ProductoCertificadoTecnoal } from '../models/producto-certificado-tecnoal.model';

@Injectable({
  providedIn: 'root',
})
export class ProductoCertificadoTecnoalService {
  private apiUrl: string = `${environment.apiUrl}/productos-certificados-tecnoal`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductoCertificadoTecnoal[]> {
    return this.http.get<ProductoCertificadoTecnoal[]>(this.apiUrl);
  }

  createMassive(productos: ProductoCertificadoTecnoal[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/massive`, productos);
  }

  getActive(): Observable<ProductoCertificadoTecnoal[]> {
    return this.http.get<ProductoCertificadoTecnoal[]>(`${this.apiUrl}/active`);
  }

  get(id: number): Observable<ProductoCertificadoTecnoal> {
    return this.http.get<ProductoCertificadoTecnoal>(`${this.apiUrl}/${id}`);
  }

  create(producto: ProductoCertificadoTecnoal): Observable<ProductoCertificadoTecnoal> {
    return this.http.post<ProductoCertificadoTecnoal>(this.apiUrl, producto);
  }

  update(id: number, producto: ProductoCertificadoTecnoal): Observable<ProductoCertificadoTecnoal> {
    return this.http.put<ProductoCertificadoTecnoal>(`${this.apiUrl}/${id}`, producto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
