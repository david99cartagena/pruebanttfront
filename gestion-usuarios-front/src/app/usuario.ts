export class Usuario {
  id: number;
  identificacion: number;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  telefono: string;
  direccion: string;
  ciudad_residencia: string;
  tipoDocumento: string;

  /* id: number = 23445322;
    identificacion: number = 1234;
    primer_nombre: string = 'David';
    segundo_nombre: string = 'Prueba';
    primer_apellido: string = 'Cartagena';
    segundo_apellido: string = 'Navarro';
    telefono: string = '314';
    direccion: string = 'Cra 1';
    ciudad_residencia: string = 'Bog DC'; */
}

export class ApiResponse<T> {
  status: number;
  data: T | null;  // Los datos pueden ser un objeto o null
  error: string | null;
}

