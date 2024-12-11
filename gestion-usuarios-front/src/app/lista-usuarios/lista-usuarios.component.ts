import { Component, OnInit } from '@angular/core';
import { Usuario, ApiResponse } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Usuario[] | null;

  constructor(private userService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    /* this.usuarios = [
      {
        id: 1,
        identificacion: 123456,
        primer_nombre: 'juan',
        segundo_nombre: 'beniot',
        primer_apellido: 'suarez',
        segundo_apellido: 'perez',
        telefono: '1234',
        direccion: 'cra 1',
        ciudad_residencia: 'bogota',
      },
    ]; */
    this.obtenerUsuarios();
  }

  actualizarUsuario(id: number) {
    this.router.navigate(['actualizar-usuario', id]);
  }

  eliminarUsuario(id: number) {
    this.userService.eliminarUsuario(id).subscribe({
      next: (data) => {
        console.log(data);
        this.obtenerUsuarios();
      },
      error: (err) => {
        console.error('Error al eliminar el usuario:', err);
      },
    });
  }

  verDetallesUsuario(id: number) {
    this.router.navigate(['usuario-detalles', id]);
  }

  
  private obtenerUsuarios() {
    this.userService.obtenerListadeUsuarios().subscribe({
      next: (response: ApiResponse<Usuario[]>) => {
        if (response.status === 200) {
          this.usuarios = response.data;
        } else {
          console.error('Error al obtener usuarios:', response.error);
        }
      },
      error: (err) => {
        console.error('Error en la solicitud:', err);
      },
    });
  }
}
