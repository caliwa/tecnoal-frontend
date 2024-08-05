// src/app/modules/dashboard/dashboard.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProductoCertificadoTecnoalListComponent } from './pages/producto-certificado-tecnoal-list/producto-certificado-tecnoal-list.component';

@NgModule({
  declarations: [
    // ... otros componentes
    ProductoCertificadoTecnoalListComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // ... otros módulos necesarios
  ],
})
export class DashboardModule {}
