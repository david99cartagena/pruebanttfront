import { Component, OnInit } from '@angular/core';
import { ApiResponse, Usuario } from '../usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-detalles',
  templateUrl: './usuario-detalles.component.html',
  styleUrls: ['./usuario-detalles.component.css'],
})
export class UsuarioDetallesComponent implements OnInit {
  usuario: Usuario = new Usuario(); // Inicializa el usuario

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsuarioService
  ) { }

  ngOnInit(): void {
    // Obtén el ID del usuario desde la URL
    const usuarioId = this.route.snapshot.paramMap.get('id');

    if (usuarioId) {
      this.userService.buscarUsuarioporId(Number(usuarioId)).subscribe(
        (data) => {
          if (data.status === 200 && data.data) {
            this.usuario = data.data; // Asigna los datos del usuario
            console.log(this.usuario);
          } else {
            console.error('No se encontró el usuario', data.error);
          }
        },
        (error) => {
          console.error('Error al obtener los detalles del usuario', error);
        }
      );
    } else {
      console.error('No se proporcionó un ID de usuario');
    }
  }
  onSubmit() {
    this.regresar();
  }

  regresar() { 
    this.router.navigate(['/usuarios/consultar-por-documento/:tipodoc/:id']);
  }
}
