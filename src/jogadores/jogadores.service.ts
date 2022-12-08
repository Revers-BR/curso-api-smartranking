import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador')
    private readonly jogadorModel: Model<IJogador>,
  ) {}

  async criarJogador(criarJogadorDto: CriarJogadorDto) {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email });

    if (jogadorEncontrado)
      throw new BadRequestException(`Jogador com email ${email} ja existe!`);

    const novoJogador = new this.jogadorModel(criarJogadorDto);
    return await novoJogador.save();
  }

  async atualizarJogador(
    _id: string,
    atualizarJogadorDto: AtualizarJogadorDto,
  ) {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id });

    if (!jogadorEncontrado)
      throw new NotFoundException(`Jogador com id ${_id} não encontrado!`);

    await this.jogadorModel.findOneAndUpdate({ _id }, atualizarJogadorDto);
  }

  async consultarTodosJogadores() {
    return await this.jogadorModel.find();
  }

  async deletarJogador(_id: string) {
    await this.jogadorModel.deleteOne({ _id });
  }

  consultarJogadorPeloId(_id: string) {
    const jogadorEncontrado = this.jogadorModel.findOne({ _id });

    if (!jogadorEncontrado)
      throw new NotFoundException(`Jogador com id  ${_id} não encontrado!`);

    return jogadorEncontrado;
  }
}
