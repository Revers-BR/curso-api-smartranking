import { Document } from 'mongoose';

export interface IJogador extends Document {
  readonly telefoneCelular: string;
  readonly email: string;
  ranking: string;
  nome: string;
  posicaoRanking: number;
  urlFoto: string;
}
