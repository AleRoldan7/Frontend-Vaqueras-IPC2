import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioCalificacionComponent } from './comentario-calificacion.component';

describe('ComentarioCalificacionComponent', () => {
  let component: ComentarioCalificacionComponent;
  let fixture: ComponentFixture<ComentarioCalificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentarioCalificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentarioCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
