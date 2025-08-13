import { Routes } from '@angular/router';
import { TransacoesComponent } from './features/transacoes/transacoes.component';
import { ListarComponent } from './features/categorias/listar/listar';

export const routes: Routes = [
    { path: '', redirectTo: 'transacoes', pathMatch: 'full' },
    { path: 'transacoes', component: TransacoesComponent },
    { path: 'categorias', component: ListarComponent }
];
