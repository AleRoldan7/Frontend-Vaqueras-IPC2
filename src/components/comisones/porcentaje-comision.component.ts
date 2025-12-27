import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SistemaService } from '../../services/sistema-service/sistema-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmpresaService } from '../../services/empresa-service/empresa-service';

interface EmpresaComision {
  idEmpresa: number;
  nombreEmpresa: string;
  comisionActual: number;
}

@Component({
  selector: 'app-porcentaje-comision',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './porcentaje-comision.component.html',
  styleUrl: './porcentaje-comision.component.css',
})
export class PorcentajeComisionComponent implements OnInit {

  porcentajeGlobal: number = 0;
  empresas: EmpresaComision[] = [];
  porcentajeEmpresas: { [id: number]: number } = {};

  loading = false;
  loadingEmpresas = false;

  constructor(private comisionService: SistemaService, private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.loading = true;
    this.loadingEmpresas = true;

    this.comisionService.getGlobal().subscribe({
      next: (res) => {
        this.porcentajeGlobal = res.porcentaje;
        this.loading = false;
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar la comisión global', 'error');
        this.loading = false;
      }
    });

    this.empresaService.listarEmpresas().subscribe({
      next: (data) => {
        this.empresas = [];
        const requests = data.map(empresa =>
          this.comisionService.getEmpresa(empresa.idEmpresa).toPromise()
        );

        Promise.all(requests).then(responses => {
          data.forEach((empresa, index) => {
            const comisionActual = responses[index]?.porcentaje || this.porcentajeGlobal;
            this.empresas.push({
              idEmpresa: empresa.idEmpresa,
              nombreEmpresa: empresa.nombreEmpresa,
              comisionActual: comisionActual
            });
            this.porcentajeEmpresas[empresa.idEmpresa] = comisionActual;
          });
          this.loadingEmpresas = false;
        }).catch(() => {
          this.loadingEmpresas = false;
          Swal.fire('Error', 'Error al cargar comisiones de empresas', 'error');
        });
      },
      error: () => {
        this.loadingEmpresas = false;
        Swal.fire('Error', 'No se pudieron cargar las empresas', 'error');
      }
    });
  }

  actualizarGlobal() {
    if (this.porcentajeGlobal < 0 || this.porcentajeGlobal > 100) {
      Swal.fire('Error', 'El porcentaje debe estar entre 0 y 100', 'error');
      return;
    }

    this.loading = true;
    this.comisionService.updateGlobal(this.porcentajeGlobal).subscribe({
      next: () => {
        Swal.fire('¡Éxito!', `Comisión global actualizada al ${this.porcentajeGlobal}%`, 'success');
        this.cargarDatos(); 
      },
      error: (err) => {
        Swal.fire('Error', err.error?.error || 'No se pudo actualizar', 'error');
        this.loading = false;
      }
    });
  }

  actualizarEmpresa(idEmpresa: number) {
    const porcentaje = this.porcentajeEmpresas[idEmpresa];

    if (porcentaje === undefined || porcentaje < 0 || porcentaje > this.porcentajeGlobal) {
      Swal.fire('Error', `El porcentaje debe estar entre 0 y ${this.porcentajeGlobal}`, 'error');
      return;
    }

    this.comisionService.updateEmpresa(idEmpresa, porcentaje).subscribe({
      next: () => {
        Swal.fire('¡Éxito!', 'Comisión de la empresa actualizada', 'success');
        const emp = this.empresas.find(e => e.idEmpresa === idEmpresa);
        if (emp) emp.comisionActual = porcentaje;
      },
      error: (err) => {
        Swal.fire('Error', err.error?.error || 'No se pudo actualizar', 'error');
      }
    });
  }
}