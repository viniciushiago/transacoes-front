import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule }           from '@angular/material/button';
import { MatIconModule }             from '@angular/material/icon';
import { Transacao }       from '../../models/transacao.model';
import { TransacaoService }from './transacoes.service';
import { Categoria }       from '../../models/categoria.model';
import { CategoriaService }from '../categorias/categorias.service';
import { TransacaoForm }      from './transacao-form/transacao-form.component';
import { CategoriaFormComponent }
  from '../categorias/categoria-form/categoria-form.component';
import { RelatorioComponent }
  from '../relatorios/relatorio.component';

@Component({
  selector: 'app-transacoes',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    TransacaoForm,
    CategoriaFormComponent,
    RelatorioComponent
  ],
  templateUrl: './transacoes.html',
  styleUrls: ['./transacoes.css']
})
export class TransacoesComponent implements OnInit {

  transacoes$!: Observable<Transacao[]>;

  constructor(
    private transacoesService: TransacaoService,
    private categoriaService: CategoriaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.carregarTransacoes();
  }

  carregarTransacoes(): void {
    this.transacoes$ = this.transacoesService.getTransacoes();
  }

  abrirModalTransacao(transacao?: Transacao): void {
    this.dialog.open(TransacaoForm, {
      panelClass: 'modal-grande',
      data: { transacao }
    }).afterClosed().subscribe(resultado => {
      if (!resultado) return;

      const operacao = transacao
        ? this.transacoesService.updateTransacao(resultado)
        : this.transacoesService.addTransacao(resultado);

      operacao.subscribe({
        next: () => this.carregarTransacoes(),
        error: err => console.error('Erro ao salvar transação', err)
      });
    });
  }

  abrirModalCategoria(): void {
    this.dialog.open(CategoriaFormComponent, {
      panelClass: 'modal-grande'
    }).afterClosed().subscribe(resultado => {
      if (!resultado) return;

      const categoria: Categoria = { ...resultado, ativo: true };
      this.categoriaService.criar(categoria).subscribe({
        next: () => console.log('Categoria criada!'),
        error: err => console.error('Erro ao criar categoria', err)
      });
    });
  }

  abrirModalRelatorios(): void {
    this.dialog.open(RelatorioComponent, {
      panelClass: 'modal-grande'
    });
  }

  excluirTransacao(id: number): void {
    if (!confirm('Tem certeza que deseja excluir esta transação?')) return;

    this.transacoesService.deleteTransacao(id).subscribe({
      next: () => this.carregarTransacoes(),
      error: err => console.error('Erro ao excluir transação', err)
    });
  }
}