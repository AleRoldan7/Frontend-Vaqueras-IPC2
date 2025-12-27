import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuzonEmpresaComponent } from './buzon-empresa.component';

describe('BuzonEmpresaComponent', () => {
  let component: BuzonEmpresaComponent;
  let fixture: ComponentFixture<BuzonEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuzonEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuzonEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
