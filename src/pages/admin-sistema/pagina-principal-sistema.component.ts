import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pagina-principal-sistema',
  imports: [RouterModule],
  templateUrl: './pagina-principal-sistema.component.html',
  styleUrl: './pagina-principal-sistema.component.css',
})
export class PaginaPrincipalSistemaComponent {

  constructor(private router: Router) {}
  
  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

}
