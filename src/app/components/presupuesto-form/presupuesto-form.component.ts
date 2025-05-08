import { Component } from '@angular/core';
import { Cliente, Servicio, Presupuesto } from '../../models/models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PresupuestoPdfComponent } from '../presupuesto-pdf/presupuesto-pdf.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-presupuesto-form',
  standalone: true,
  templateUrl: './presupuesto-form.component.html',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    PresupuestoPdfComponent,
    MatListModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask()
  ]
  // styleUrls: ['./presupuesto-form.component.scss']
})
export class PresupuestoFormComponent {
  cliente: Cliente = {
    nombre: '',
    telefono: '',
    correo: '',
    vehiculo: {
      marca: '',
      modelo: '',
      anio: new Date().getFullYear(),
      placas: ''
    }
  };

  servicios: Servicio[] = [];
  descripcion = '';
  precio = 0;

  presupuesto?: Presupuesto;

  agregarServicio() {
    if (this.descripcion && this.precio > 0) {
      this.servicios.push({ descripcion: this.descripcion, precio: this.precio });
      this.descripcion = '';
      this.precio = 0;
    }
  }

  generarPresupuesto() {
    this.presupuesto = {
      cliente: this.cliente,
      servicios: this.servicios,
      fecha: new Date()
    };
  }
}
