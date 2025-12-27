import { TestBed } from '@angular/core/testing';

import { BibliotecaGrupoService } from './biblioteca-grupo-service';

describe('BibliotecaGrupoService', () => {
  let service: BibliotecaGrupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BibliotecaGrupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
