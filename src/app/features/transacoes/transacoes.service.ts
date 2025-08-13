import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Transacao } from "../../models/transacao.model";

@Injectable({
    providedIn: 'root'
})

export class TransacaoService{
    private apiUrl = 'http://localhost:5000/api/transacoes';

    constructor(private http: HttpClient){ }

    getTransacoes(): Observable<Transacao[]>{
        return this.http.get<Transacao[]>(this.apiUrl)
    }

    addTransacao(transacao: Omit<Transacao, 'id'>) : Observable<Transacao>{
        return this.http.post<Transacao>(this.apiUrl, transacao)
    }

    updateTransacao(transacao: Transacao): Observable<Transacao>{
        return this.http.put<Transacao>(`${this.apiUrl}/${transacao.id}`, transacao)
    }

    deleteTransacao(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}