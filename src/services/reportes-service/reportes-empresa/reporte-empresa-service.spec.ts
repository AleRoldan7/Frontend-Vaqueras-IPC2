import { TestBed } from '@angular/core/testing';

import { ReporteEmpresaService } from './reporte-empresa-service';

describe('ReporteEmpresaService', () => {
  let service: ReporteEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
