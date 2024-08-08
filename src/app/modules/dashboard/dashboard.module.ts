// src/app/modules/dashboard/dashboard.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProductoCertificadoTecnoalListComponent } from './pages/producto-certificado-tecnoal-list/producto-certificado-tecnoal-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // ... otros componentes
    ProductoCertificadoTecnoalListComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    // ... otros módulos necesarios
  ],
})
export class DashboardModule {}
