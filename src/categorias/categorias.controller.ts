import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criar(
    @Body()
    criarCategoriaDto: CriarCategoriaDto,
  ) {
    return this.categoriasService.criar(criarCategoriaDto);
  }

  @Get()
  async todos() {
    return await this.categoriasService.consultarTodos();
  }

  @Get('/:categoria')
  async consultar(
    @Param('categoria')
    categoria: string,
  ) {
    return await this.categoriasService.consultarPelaCategoria(categoria);
  }

  @Put('/:categoria')
  async atualizar(
    @Param('categoria')
    categoria: string,

    @Body()
    atualizarCategoriaDto: AtualizarCategoriaDto,
  ) {
    await this.categoriasService.atualizar(categoria, atualizarCategoriaDto);
  }

  @Post('/:categoria/jogadores/:idJogador')
  async atribuirCategoriaJogador(
    @Param()
    params: string[],
  ) {
    await this.categoriasService.atribuirCategoriaJogador(params);
  }
}
