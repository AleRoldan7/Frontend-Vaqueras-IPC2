import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaPropiaComponent } from './venta-propia.component';

describe('VentaPropiaComponent', () => {
  let component: VentaPropiaComponent;
  let fixture: ComponentFixture<VentaPropiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaPropiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaPropiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
