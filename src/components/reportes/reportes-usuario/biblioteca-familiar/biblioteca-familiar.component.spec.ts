import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaFamiliarComponent } from './biblioteca-familiar.component';

describe('BibliotecaFamiliarComponent', () => {
  let component: BibliotecaFamiliarComponent;
  let fixture: ComponentFixture<BibliotecaFamiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliotecaFamiliarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibliotecaFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
