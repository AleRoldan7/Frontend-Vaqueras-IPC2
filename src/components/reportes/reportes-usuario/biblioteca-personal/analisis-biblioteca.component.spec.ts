import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisBibliotecaComponent } from './analisis-biblioteca.component';

describe('AnalisisBibliotecaComponent', () => {
  let component: AnalisisBibliotecaComponent;
  let fixture: ComponentFixture<AnalisisBibliotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalisisBibliotecaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalisisBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
