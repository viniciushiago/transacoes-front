import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RelatorioResumoResponse {
  saldoTotal: number;
  totalReceitas: number;
  totalDespesas: number;
}

export interface RelatorioPorCategoriaItem {
  categoriaNome: string;
  totalReceitas: number;
  totalDespesas: number;
}

@Injectable({ providedIn: 'root' })
export class RelatorioService {
  private apiUrl = 'https://localhost:5001/api/Relatorio';

  constructor(private http: HttpClient) {}

  obterResumo(inicio?: string, fim?: string): Observable<RelatorioResumoResponse> {
    let params = new HttpParams();
    if (inicio) params = params.set('inicio', inicio);
    if (fim) params = params.set('fim', fim);
    return this.http.get<RelatorioResumoResponse>(`${this.apiUrl}/resumo`, { params });
  }

  obterPorCategoria(inicio?: string, fim?: string): Observable<RelatorioPorCategoriaItem[]> {
    let params = new HttpParams();
    if (inicio) params = params.set('inicio', inicio);
    if (fim) params = params.set('fim', fim);
    return this.http.get<RelatorioPorCategoriaItem[]>(`${this.apiUrl}/por-categoria`, { params });
  }
}