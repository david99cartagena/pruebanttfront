import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  usuario: Usuario = new Usuario();

  constructor(
    private userService: UsuarioService, 
    private router: Router,
  ) { }

  onSubmit() {
    this.buscarUsuario();
  }
  
  buscarUsuario() {
    if (this.usuario.tipoDocumento && this.usuario.identificacion) {
      this.userService.consultarPorDocumento(this.usuario.tipoDocumento, this.usuario.identificacion.toString())
        .subscribe(
          (data) => {
            if (data.status === 200 && data.data) {
              this.usuario = data.data; // Asignamos el usuario desde el archivo JSON
              console.log(this.usuario);
              if (this.usuario.id) { // Asegurarnos de que el id esté presente
                this.router.navigate(['/usuario-detalles', this.usuario.id]);
              } else {
                console.error('ID de usuario no encontrado');
              }
            } else {
              console.error('Usuario no encontrado', data.error);
            }
          },
          (error) => {
            console.error('Error al obtener los datos del usuario', error);
          }
        );
    } else {
      console.log('Por favor, ingrese todos los datos');
    }
  }

}
