// src/app/modules/dashboard/dashboard-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import { PodcastComponent } from './pages/podcast/podcast.component';
import { ProductoCertificadoTecnoalListComponent } from './pages/producto-certificado-tecnoal-list/producto-certificado-tecnoal-list.component';
import { RolesPermisosTecnoalComponent } from './pages/roles-permisos-tecnoal/roles-permisos-tecnoal.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'menu-principal', pathMatch: 'full' },
      { path: 'menu-principal', component: NftComponent },
      { path: 'producto-certificado', component: ProductoCertificadoTecnoalListComponent },
      { path: 'roles-permisos', component: RolesPermisosTecnoalComponent },
      { path: 'podcast', component: PodcastComponent },
      // { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
