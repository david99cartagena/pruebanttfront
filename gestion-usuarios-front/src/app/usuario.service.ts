import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Usuario, ApiResponse } from './usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private api = 'http://localhost:8090/api/v1/usuarios';
  private apiJson = 'assets/usuario.json';

  constructor(private httpClient: HttpClient) { }

  obtenerListadeUsuarios(): Observable<ApiResponse<Usuario[]>> {
    return this.httpClient.get<ApiResponse<Usuario[]>>(`${this.api}`);
  }

  registrarUsuario(usuario: Usuario): Observable<ApiResponse<Usuario>> {
    return this.httpClient.post<ApiResponse<Usuario>>(`${this.api}`, usuario);
  }

  actualizarUsuario(
    id: number,
    usuario: Usuario
  ): Observable<ApiResponse<Usuario>> {
    return this.httpClient.put<ApiResponse<Usuario>>(
      `${this.api}/${id}`,
      usuario
    );
  }

  /* buscarUsuarioporId(id: number): Observable<ApiResponse<Usuario>> {
    return this.httpClient.get<ApiResponse<Usuario>>(`${this.api}/${id}`);
  } */

  buscarUsuarioporId(id: number): Observable<ApiResponse<Usuario>> {
    return this.httpClient.get<ApiResponse<Usuario>>(this.apiJson).pipe(
      map((response) => {
        if (response.data && response.data.id === id) {
          return { status: 200, data: response.data, error: null }; // Aquí asignamos `null` a error
        } else {
          return { status: 404, error: 'Usuario no encontrado', data: null }; // También asignamos `null` a data
        }
      })
    );
  }

  eliminarUsuario(id: number): Observable<ApiResponse<Object>> {
    return this.httpClient.delete<ApiResponse<Object>>(`${this.api}/${id}`);
  }

  // Método para obtener los datos del archivo JSON
  // Método para obtener los datos desde el archivo JSON
  consultarPorDocumento(tipoDocumento: string, identificacion: string): Observable<ApiResponse<Usuario>> {
    console.log(`Consulta con tipoDocumento=${tipoDocumento} e identificacion=${identificacion}`);
    return this.httpClient.get<ApiResponse<Usuario>>(this.apiJson);
  }
}
