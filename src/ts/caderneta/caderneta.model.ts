export interface ICaderneta {
  $key?: string;

  nome: string;
  datanascimento: string;
  sexo: string;
  dosesTomadas: any;
}

export class Caderneta implements ICaderneta {

  dosesTomadas: any = {};

  constructor(public nome: string, public datanascimento: string, public sexo: string) {
  }

}
