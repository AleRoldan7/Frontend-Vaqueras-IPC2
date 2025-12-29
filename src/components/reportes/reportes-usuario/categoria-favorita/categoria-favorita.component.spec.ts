import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaFavoritaComponent } from './categoria-favorita.component';

describe('CategoriaFavoritaComponent', () => {
  let component: CategoriaFavoritaComponent;
  let fixture: ComponentFixture<CategoriaFavoritaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaFavoritaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaFavoritaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
