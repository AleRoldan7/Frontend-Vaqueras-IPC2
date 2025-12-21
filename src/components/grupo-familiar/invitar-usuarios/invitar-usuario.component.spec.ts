import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitarUsuarioComponent } from './invitar-usuario.component';

describe('InvitarUsuarioComponent', () => {
  let component: InvitarUsuarioComponent;
  let fixture: ComponentFixture<InvitarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitarUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
