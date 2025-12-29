import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeorCalificacionComponent } from './peor-calificacion.component';

describe('PeorCalificacionComponent', () => {
  let component: PeorCalificacionComponent;
  let fixture: ComponentFixture<PeorCalificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeorCalificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeorCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
