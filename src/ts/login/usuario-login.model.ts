
export class UsuarioLogin {

  static readonly USUARIO_NAO_AUTENTICADO: UsuarioLogin = new UsuarioLogin("Visitante", false);

  readonly nome: string;
  readonly processado = true;

  constructor(readonly nomeCompleto: string, readonly logado: boolean = true) {
    this.nome = nomeCompleto.split(" ")[0];
  }

}
