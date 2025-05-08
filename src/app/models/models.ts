export interface Servicio {
  descripcion: string;
  precio: number;
}

export interface Vehiculo {
  marca: string;
  modelo: string;
  anio: number;
  placas: string;
}

export interface Cliente {
  nombre: string;
  telefono: string;
  correo: string;
  vehiculo: Vehiculo;
}

export interface Presupuesto {
  cliente: Cliente;
  servicios: Servicio[];
  fecha: Date;
}
