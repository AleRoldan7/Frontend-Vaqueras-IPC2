import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposCreadosUsuarioComponent } from './grupos-creados-usuario.component';

describe('GruposCreadosUsuarioComponent', () => {
  let component: GruposCreadosUsuarioComponent;
  let fixture: ComponentFixture<GruposCreadosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposCreadosUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruposCreadosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
