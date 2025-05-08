import { Component, Input } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Presupuesto } from '../../models/models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-presupuesto-pdf',
  template: `<button mat-raised-button color="warn" (click)="generarPDF()">Descargar PDF</button>`,
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule
  ]
})
export class PresupuestoPdfComponent {
  @Input() presupuesto!: Presupuesto;

  generarPDF() {
    const doc: any = new jsPDF();
    doc.setFontSize(18);
    doc.text('Presupuesto de Taller Mecánico NARVAJA', 14, 20);

    doc.setFontSize(12);
    doc.text(`Cliente: ${this.presupuesto.cliente.nombre}`, 14, 30);
    doc.text(`Vehículo: ${this.presupuesto.cliente.vehiculo.marca} ${this.presupuesto.cliente.vehiculo.modelo}`, 14, 36);
    doc.text(`Fecha: ${new Date(this.presupuesto.fecha).toLocaleDateString()}`, 14, 42);

    const rows = this.presupuesto.servicios.map(serv => [serv.descripcion, `${serv.precio.toFixed(2)}`]);
    const total = this.presupuesto.servicios.reduce((acc, s) => acc + s.precio, 0);

    autoTable(doc, {
      head: [['Descripción', 'Precio']],
      body: rows,
      startY: 50,
    });

    doc.text(`Total: ${total.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save(`presupuesto_${this.presupuesto.cliente.nombre}_${new Date(this.presupuesto.fecha).toLocaleDateString()}.pdf`);
  }
}
