import { TestBed } from '@angular/core/testing';

import { ComentarioCalificacionService } from './comentario-calificacion-service';

describe('ComentarioCalificacionService', () => {
  let service: ComentarioCalificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComentarioCalificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
