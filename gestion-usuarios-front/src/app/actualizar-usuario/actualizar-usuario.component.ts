import { Component, OnInit } from '@angular/core';
import { ApiResponse, Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css'],
})
export class ActualizarUsuarioComponent implements OnInit {
  id: number;
  usuario: Usuario = new Usuario();

  constructor(
    private userService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.userService.buscarUsuarioporId(this.id).subscribe({
      next: (response: ApiResponse<Usuario>) => {
        if (response.status === 200 && response.data) {
          this.usuario = response.data;
          console.log(this.usuario);
        } else {
          console.error('Error al obtener el usuario:', response.error);
        }
      },
      error: (err) => {
        console.error('Error en la solicitud:', err);
      },
    });
  }

  irListaUsuarios() {
    this.router.navigate(['/usuarios']);
  }

  onSubmit() {
    this.userService.actualizarUsuario(this.id, this.usuario).subscribe({
      next: (response: ApiResponse<Usuario>) => {
        if (response.status === 200) {
          console.log('Usuario actualizado con éxito:', response.data);
          this.irListaUsuarios();
        } else {
          console.error('Error al actualizar el usuario:', response.error);
        }
      },
      error: (err) => {
        console.error('Error al actualizar el usuario:', err);
      },
    });
  }
}
