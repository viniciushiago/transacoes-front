import { TipoCategoria } from "./tipo-categoria.enum";

export interface Categoria {
    id: number;
    nome: string;
    tipo: TipoCategoria;
    ativo: boolean;
}
