import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesPermisosTecnoalComponent } from './roles-permisos-tecnoal.component';

describe('RolesPermisosTecnoalComponent', () => {
  let component: RolesPermisosTecnoalComponent;
  let fixture: ComponentFixture<RolesPermisosTecnoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesPermisosTecnoalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesPermisosTecnoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
