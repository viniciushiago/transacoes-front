import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../../../models/categoria.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-categoria-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './categoriaSelect.component.html'
})
export class CategoriaSelectComponent {
  @Input() categoriaSelecionada: number | null = null;
  @Output() categoriaSelecionadaChange = new EventEmitter<number | null>();

  @Input() categorias$!: Observable<Categoria[]>;
}