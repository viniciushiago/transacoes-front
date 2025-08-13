import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../../models/categoria.model';
import { TipoCategoria } from '../../../models/tipo-categoria.enum';
import { CategoriaService } from '../categorias.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar.html',
  styleUrl: './listar.css'
})
export class ListarComponent implements OnInit {
  categorias$!: Observable<Categoria[]>;

  novaCategoria: Categoria = {
    id: 0,
    nome: '',
    tipo: TipoCategoria.Receita,
    ativo: true
  }

  tipos = Object.values(TipoCategoria);

  constructor(private categoriasService: CategoriaService) { }

  ngOnInit() {
    this.carregarCategorias();
  }
  
  carregarCategorias(): void {
    this.categorias$ = this.categoriasService.listar();
  }

  criarCategorias(): void {
    this.categoriasService.criar(this.novaCategoria).subscribe(() => {
      this.novaCategoria = {
        id: 0,
        nome: '',
        tipo: TipoCategoria.Receita,
        ativo: true
      };
      this.carregarCategorias(); // Recarrega a lista após o sucesso
    });
  }
}
