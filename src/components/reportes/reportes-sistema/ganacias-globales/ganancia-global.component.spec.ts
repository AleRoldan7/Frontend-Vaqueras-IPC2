import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GananciaGlobalComponent } from './ganancia-global.component';

describe('GananciaGlobalComponent', () => {
  let component: GananciaGlobalComponent;
  let fixture: ComponentFixture<GananciaGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GananciaGlobalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GananciaGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
