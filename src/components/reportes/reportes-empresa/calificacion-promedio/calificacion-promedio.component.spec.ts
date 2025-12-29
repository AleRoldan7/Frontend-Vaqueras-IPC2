import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionPromedioComponent } from './calificacion-promedio.component';

describe('CalificacionPromedioComponent', () => {
  let component: CalificacionPromedioComponent;
  let fixture: ComponentFixture<CalificacionPromedioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalificacionPromedioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificacionPromedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
