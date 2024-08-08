import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosTecnoalComponent } from './usuarios-tecnoal.component';

describe('UsuariosTecnoalComponent', () => {
  let component: UsuariosTecnoalComponent;
  let fixture: ComponentFixture<UsuariosTecnoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosTecnoalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosTecnoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
