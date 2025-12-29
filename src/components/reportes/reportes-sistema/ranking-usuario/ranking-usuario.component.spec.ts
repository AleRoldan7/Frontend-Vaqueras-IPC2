import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingUsuarioComponent } from './ranking-usuario.component';

describe('RankingUsuarioComponent', () => {
  let component: RankingUsuarioComponent;
  let fixture: ComponentFixture<RankingUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
