import { IsEmail, IsNotEmpty } from 'class-validator';

export class CriarJogadorDto {
  @IsNotEmpty()
  readonly nome: string;

  @IsNotEmpty()
  readonly telefoneCelular: string;

  @IsEmail()
  readonly email: string;
}
