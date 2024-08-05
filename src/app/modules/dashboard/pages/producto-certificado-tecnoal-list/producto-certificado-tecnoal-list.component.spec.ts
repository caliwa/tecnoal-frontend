import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoCertificadoTecnoalListComponent } from './producto-certificado-tecnoal-list.component';

describe('ProductoCertificadoTecnoalListComponent', () => {
  let component: ProductoCertificadoTecnoalListComponent;
  let fixture: ComponentFixture<ProductoCertificadoTecnoalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoCertificadoTecnoalListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoCertificadoTecnoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
