import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarpermisosComponent } from './editarpermisos.component';

describe('EditarpermisosComponent', () => {
  let component: EditarpermisosComponent;
  let fixture: ComponentFixture<EditarpermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarpermisosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarpermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
