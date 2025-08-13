// src/app/features/relatorios/relatorios-dialog.component.ts
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import {
  RelatorioService,
  RelatorioResumoResponse,
  RelatorioPorCategoriaItem
} from './relatorio.service';

@Component({
  selector: 'app-relatorios-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule
  ],
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent {
  inicio?: string;
  fim?: string;
  aba = 0;
  carregando = false;
  erro: string | null = null;
  resumo?: RelatorioResumoResponse;
  porCategoria: RelatorioPorCategoriaItem[] = [];

  constructor(
    private dialogRef: MatDialogRef<RelatorioComponent>,
    private relatorioService: RelatorioService,
    private cdRef: ChangeDetectorRef
  ) {}

  fechar(): void {
    this.dialogRef.close();
  }

  atualizar(): void {
    this.erro = null;
    this.carregando = true;

    if (this.aba === 0) {
      this.relatorioService.obterResumo(this.inicio, this.fim).subscribe({
        next: (data) => {
          this.resumo = data;
          this.carregando = false;
          this.cdRef.detectChanges(); // força atualização segura
        },
        error: (err) => {
          this.erro = 'Falha ao carregar o resumo.';
          console.error(err);
          this.carregando = false;
          this.cdRef.detectChanges();
        }
      });
    } else {
      this.relatorioService.obterPorCategoria(this.inicio, this.fim).subscribe({
        next: (data) => {
            console.log('Dados recebidos:', data);
          this.porCategoria = data;
          this.carregando = false;
          this.cdRef.detectChanges();
        },
        error: (err) => {
          this.erro = 'Falha ao carregar o relatório por categoria.';
          console.error(err);
          this.carregando = false;
          this.cdRef.detectChanges();
        }
      });
    }
  }

  onAbaChange(index: number): void {
    this.aba = index;
  }

  get intervaloValido(): boolean {
    if (!this.inicio || !this.fim) return true;
    return new Date(this.inicio) <= new Date(this.fim);
  }
}