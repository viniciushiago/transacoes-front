import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Categoria } from "../../models/categoria.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private readonly apiUrl = 'https://localhost:5001/api/Categoria';

  private categoriasSubject = new BehaviorSubject<Categoria[]>([]);
  categorias$ = this.categoriasSubject.asObservable();

  constructor(private http: HttpClient) {
    this.listar().subscribe();
  }

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl).pipe(
      tap(cats => this.categoriasSubject.next(cats))
    );
  }

  criar(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria).pipe(
      tap(() => this.listar().subscribe()) // atualiza a lista automaticamente
    );
  }
}