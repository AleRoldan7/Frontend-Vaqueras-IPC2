import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top5juegosComponent } from './top5juegos.component';

describe('Top5juegosComponent', () => {
  let component: Top5juegosComponent;
  let fixture: ComponentFixture<Top5juegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Top5juegosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top5juegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
