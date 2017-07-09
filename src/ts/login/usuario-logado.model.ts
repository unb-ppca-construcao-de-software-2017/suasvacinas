export class UsuarioLogado {
  readonly nome: string;
  readonly logado = true;
  readonly naoLogado = false;

  constructor(readonly nomeCompleto: string) {
    this.nome = nomeCompleto.split(" ")[0];
  }
}
