import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaGrupoComponent } from './biblioteca-grupo.component';

describe('BibliotecaGrupoComponent', () => {
  let component: BibliotecaGrupoComponent;
  let fixture: ComponentFixture<BibliotecaGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliotecaGrupoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibliotecaGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
