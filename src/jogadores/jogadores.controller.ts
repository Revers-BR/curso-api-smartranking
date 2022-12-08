import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { JogadorValidacaoParametroPipe } from './pipes/jogador-validacao-parametro.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criar(
    @Body()
    criarJogadorDto: CriarJogadorDto,
  ) {
    return await this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizar(
    @Param('_id', JogadorValidacaoParametroPipe)
    _id: string,

    @Body()
    atualizarJogadorDto: AtualizarJogadorDto,
  ) {
    await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto);
  }

  @Get('/:_id')
  async consultarJogador(
    @Param('_id', JogadorValidacaoParametroPipe)
    _id: string,
  ) {
    return await this.jogadoresService.consultarJogadorPeloId(_id);
  }

  @Get()
  async consultarTodos() {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Delete('/:_id')
  async deletar(
    @Param('_id', JogadorValidacaoParametroPipe)
    _id: string,
  ) {
    await this.jogadoresService.deletarJogador(_id);
  }
}
