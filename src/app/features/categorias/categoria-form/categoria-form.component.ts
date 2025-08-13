import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TipoCategoria } from '../../../models/tipo-categoria.enum';

export interface CategoriaPayload {
  id?: number;
  nome: string;
  tipo: TipoCategoria;
  ativo: boolean
}

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent {
  categoria: CategoriaPayload = {
    nome: '',
    tipo: TipoCategoria.Receita,
    ativo: true
  };

  tipo = TipoCategoria
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { categoria?: CategoriaPayload },
    private dialogRef: MatDialogRef<CategoriaFormComponent>
  ) {
    if (data?.categoria) {
      this.categoria = { ...data.categoria };
    }
  }

  salvar(): void {
    console.log('FORM ->', this.categoria);
    this.dialogRef.close(this.categoria);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
