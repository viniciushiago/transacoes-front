import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  Inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { Transacao } from '../../../models/transacao.model';
import { TransacaoService } from '../transacoes.service';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../categorias/categorias.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CategoriaSelectComponent } from '../../categorias/CategoriaSelect/categoriaSelect.component';

@Component({
  selector: 'app-transacao-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CategoriaSelectComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './transacao-form.component.html',
  styleUrls: ['./transacao-form.component.css']
})
export class TransacaoForm implements OnInit {
  @Output() transacaoSalva = new EventEmitter<Transacao>();

  categorias$!: Observable<Categoria[]>;

  transacaoForm: Partial<Transacao> & {
    data: string | Date;
    categoriaId: number | null;
  } = {
    descricao: '',
    valor: 0,
    data: new Date(),
    categoriaId: null
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { transacao?: Transacao },
    private dialogRef: MatDialogRef<TransacaoForm>,
    private transacaoService: TransacaoService,
    private categoriaService: CategoriaService,
    private snackBar: MatSnackBar
  ) {
    if (data?.transacao) {
      this.transacaoForm = { ...data.transacao };
    }
  }

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.categorias$;
  }

  salvarTransacao(): void {
    const rawData = this.transacaoForm.data;
    const dataNormalizada =
      typeof rawData === 'string' ? new Date(rawData) : rawData ?? new Date();

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (dataNormalizada > hoje) {
      this.snackBar.open('A data não pode ser superior a data atual.', 'Fechar', {
        duration: 3000,
        panelClass: ['toast-aviso']
      });
      return;
    }

    const payload: Transacao = {
      id: (this.transacaoForm as any).id,
      descricao: this.transacaoForm.descricao ?? '',
      valor: this.transacaoForm.valor ?? 0,
      data: dataNormalizada,
      categoriaId: this.transacaoForm.categoriaId ?? null
    } as Transacao;

    const operacao = payload.id
      ? this.transacaoService.updateTransacao(payload)
      : this.transacaoService.addTransacao(payload);

    operacao.subscribe({
      next: () => {
        this.transacaoSalva.emit(payload);
        this.dialogRef.close(payload);
      },
      error: (err) => console.error('Erro ao salvar transação', err)
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}