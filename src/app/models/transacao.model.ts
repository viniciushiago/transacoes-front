export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  data: string | Date;
  categoriaId: number;
  categoriaNome: string;
  observacoes: string;
  dataCriacao: string; // ou Date
}