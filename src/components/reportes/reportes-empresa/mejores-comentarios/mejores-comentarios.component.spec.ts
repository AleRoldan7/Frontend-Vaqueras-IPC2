import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MejoresComentariosComponent } from './mejores-comentarios.component';

describe('MejoresComentariosComponent', () => {
  let component: MejoresComentariosComponent;
  let fixture: ComponentFixture<MejoresComentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MejoresComentariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MejoresComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
