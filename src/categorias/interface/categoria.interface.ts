import { Document } from 'mongoose';
import { IJogador } from 'src/jogadores/interfaces/jogador.interface';

export interface Categoria extends Document {
  readonly categoria: string;
  descricao: string;
  eventos: Array<Evento>;
  jogadores: Array<IJogador>;
}

export interface Evento {
  nome: string;
  operacao: string;
  valor: number;
}
