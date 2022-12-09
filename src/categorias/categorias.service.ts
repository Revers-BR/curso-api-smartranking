import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interface/categoria.interface';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria')
    private readonly categoriaModel: Model<Categoria>,

    private readonly jogadoresService: JogadoresService,
  ) {}

  async criar(criarCategoriaDto: CriarCategoriaDto) {
    const { categoria } = criarCategoriaDto;

    const categoriaEncontrado = await this.categoriaModel.findOne({
      categoria,
    });

    if (categoriaEncontrado)
      throw new BadRequestException(`Categoria ${categoria} já existe!`);

    const novaCategoria = new this.categoriaModel(criarCategoriaDto);
    return await novaCategoria.save();
  }

  async atualizar(
    categoria: string,
    atualizarCategoriaDto: AtualizarCategoriaDto,
  ) {
    const categoriaEncontrado = this.categoriaModel.findOne({ categoria });

    if (!categoriaEncontrado)
      throw new NotFoundException(`Categoria ${categoria} não encontrado!`);

    await this.categoriaModel.findOneAndUpdate(
      { categoria },
      atualizarCategoriaDto,
    );
  }

  async consultarPelaCategoria(categoria: string) {
    const categoriaEncontrado = await this.categoriaModel.findOne({
      categoria,
    });

    if (!categoriaEncontrado)
      throw new NotFoundException(`Categoria ${categoria} não encontrado!`);

    return categoriaEncontrado;
  }

  async consultarTodos() {
    return await this.categoriaModel.find().populate('jogadores');
  }

  async atribuirCategoriaJogador(params: string[]) {
    const categoria = params['categoria'];
    const idJogador = params['idJogador'];

    const categoriaEncontrado = await this.categoriaModel.findOne({
      categoria,
    });

    await this.jogadoresService.consultarJogadorPeloId(idJogador);

    const jogadorCadastradoCategoria = await this.categoriaModel
      .find({ categoria })
      .where('jogadores')
      .in(idJogador);

    if (!categoriaEncontrado)
      throw new BadRequestException(`Categoria ${categoria} não cadastrado!`);

    if (jogadorCadastradoCategoria.length > 0)
      throw new BadRequestException(
        `Jogador id ${idJogador} já cadastrado na categoria ${categoria}!`,
      );

    categoriaEncontrado.jogadores.push(idJogador);
    await this.categoriaModel.findOneAndUpdate(
      { categoria },
      categoriaEncontrado,
    );
  }
}
