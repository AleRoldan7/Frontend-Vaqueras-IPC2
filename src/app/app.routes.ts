import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegistroUsuarioComponent } from '../components/usuario/registro-usuario/registro-usuario.component';
import { RegistroEmpresaComponent } from '../components/empresa/registro-empresa/registro-empresa.component';
import { CrearVideojuegoComponent } from '../components/empresa/crear-videojuego/crear-videojuego.component';
import { PaginaPrincipalEmpresaComponent } from '../pages/admin-empresa/pagina-principal-empresa.component';
import { VideojuegosCreadosComponent } from '../components/empresa/videojuegos-creados/videojuegos-creados.component';
import { CrearCategoriaComponent } from '../components/categoria/crear-categoria/crear-categoria.component';
import { PaginaPrincipalSistemaComponent } from '../pages/admin-sistema/pagina-principal-sistema.component';
import { authGuard as autoGuard } from '../guards/auth-guard';
import { ActualizarEliminarCategoriaComponent } from '../components/categoria/actualizar-eliminar-categoria/actualizar-eliminar-categoria.component';
import { PaginaPrincipalUsuarioComponent } from '../pages/usuario-comun/pagina-principal-usuario.component';
import { UnirVideojuegoCategoriaComponent } from '../components/empresa/union-videojuego-categoria/unir-videojuego-categoria.component';
import { SolicitudCategoriasComponent } from '../components/sistema/solicitud-categorias/solicitud-categorias.component';
import { TiendaVideojuegosComponent } from '../components/tienda/tienda-videojuegos.component';
import { ActualizarEmpresaComponent } from '../components/empresa/actualizar-empresa/actualizar-empresa.component';
import { CrearGrupoComponent } from '../components/grupo-familiar/crear-grupo/crear-grupo.component';
import { ListaGruposComponent } from '../components/grupo-familiar/lista-grupos/lista-grupos.component';
import { InvitacionGrupoComponent } from '../components/grupo-familiar/invitaciones-grupo/invitacion-grupo.component';
import { ListarUsuariosComponent } from '../components/sistema/listar-usuario/listar-usuarios.component';
import { BibliotecaUsuarioComponent } from '../components/biblioteca/biblioteca-usuario.component';
import { CompraVideojuegoComponent } from '../components/usuario/compra-videojuego/compra-videojuego.component';
import { PorcentajeComisionComponent } from '../components/comisones/porcentaje-comision.component';
import { IngresoEmpresaComponent } from '../components/reportes/reportes-sistema/ingreso-empresa/ingreso-empresa.component';
import { InvitarUsuarioComponent } from '../components/grupo-familiar/invitar-usuarios/invitar-usuario.component';
import { GruposCreadosUsuarioComponent } from '../components/grupo-familiar/grupos-usuario/grupos-creados-usuario.component';
import { MiembrosGrupoComponent } from '../components/grupo-familiar/miembros-grupo/miembros-grupo.component';
import { BibliotecaGrupoComponent } from '../components/grupo-familiar/biblioteca-grupo/biblioteca-grupo.component';
import { ComentarioCalificacionComponent } from '../components/comentario-calificacion/comentario-calificacion.component';
import { BuzonEmpresaComponent } from '../components/empresa/buzon-empresa/buzon-empresa.component';
import { PerfilUsuarioComponent } from '../components/usuario/perfil-usuario/perfil-usuario.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'registro-usuario-comun', component: RegistroUsuarioComponent },

  {
    path: 'registro-empresa',
    component: RegistroEmpresaComponent,
    canActivate: [autoGuard],
    data: { roles: ['ADMIN_SISTEMA'] }
  },

  {
    path: 'usuario-comun',
    canActivate: [autoGuard],
    data: { roles: ['USUARIO_COMUN'] },
    children: [
      { path: '', component: PaginaPrincipalUsuarioComponent },
      { path: 'tienda', component: TiendaVideojuegosComponent },
      { path: 'biblioteca', component: BibliotecaUsuarioComponent },
      { path: 'perfil', component: PerfilUsuarioComponent },
      { path: 'buscar-videojuego', component: CompraVideojuegoComponent },
      { path: 'reseña-videojuegos', component: ComentarioCalificacionComponent },

      { path: 'crear-grupo-familiar', component: CrearGrupoComponent },
      { path: 'invitaciones', component: InvitacionGrupoComponent },
      { path: 'lista-mis-grupos-usuario', component: GruposCreadosUsuarioComponent },
      { path: 'miembros-grupo-familiar', component: MiembrosGrupoComponent },
      { path: 'biblioteca-grupo', component: BibliotecaGrupoComponent },
      { path: 'grupo/:idGrupo/invitar-usuario', component: InvitarUsuarioComponent },
    ]
  },

  {
    path: 'admin-empresa',
    canActivate: [autoGuard],
    data: { roles: ['ADMIN_EMPRESA'] },
    children: [
      { path: '', component: PaginaPrincipalEmpresaComponent },
      { path: 'videojuegos', component: VideojuegosCreadosComponent },
      { path: 'crear-videojuego', component: CrearVideojuegoComponent },
      { path: 'videojuego/:id/categorias', component: UnirVideojuegoCategoriaComponent },
      { path: 'actualizar-empresa', component: ActualizarEmpresaComponent },
      { path: 'buzon', component: BuzonEmpresaComponent },
    ]
  },

  {
    path: 'admin-sistema',
    canActivate: [autoGuard],
    data: { roles: ['ADMIN_SISTEMA'] },
    children: [
      { path: '', component: PaginaPrincipalSistemaComponent },
      { path: 'solicitudes', component: SolicitudCategoriasComponent },
      { path: 'categorias', component: ActualizarEliminarCategoriaComponent },
      { path: 'usuarios', component: ListarUsuariosComponent },
      { path: 'comisiones', component: PorcentajeComisionComponent },
      { path: 'reportes/ingresos', component: IngresoEmpresaComponent },
      { path: 'crear-categoria', component: CrearCategoriaComponent }, // Movida aquí para consistencia
    ]
  },
];