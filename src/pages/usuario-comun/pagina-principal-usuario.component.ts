import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagina-principal-usuario',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './pagina-principal-usuario.component.html',
  styleUrl: './pagina-principal-usuario.component.css',
})
export class PaginaPrincipalUsuarioComponent implements OnInit {

  nombreUsuario: string = 'Usuario Común';
  nickname: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    const usuarioData = localStorage.getItem('usuario');

    if (usuarioData) {
      const usuario = JSON.parse(usuarioData);
      this.nickname = usuario.nickname || '';
      this.nombreUsuario = this.nickname || usuario.nombre || 'Usuario Común';
    } else {
      this.router.navigate(['/login']);
    }
  }

 
  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

}
