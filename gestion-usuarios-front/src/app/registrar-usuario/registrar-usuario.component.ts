import { Component } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
})
export class RegistrarUsuarioComponent {
  usuario: Usuario = new Usuario();

  constructor(private userService: UsuarioService, private router: Router) { }

  ngOnInit(): void { }

  guardaUsuario() {
    this.userService.registrarUsuario(this.usuario).subscribe(
      (data) => {
        console.log(data);
        this.irListaUsuarios();
      },
      (error) => console.log(error)
    );
  }

  irListaUsuarios() {
    this.router.navigate(['/usuarios']);
  }

  onSubmit() {
    console.log(this.usuario);
    this.guardaUsuario();
  }
}
