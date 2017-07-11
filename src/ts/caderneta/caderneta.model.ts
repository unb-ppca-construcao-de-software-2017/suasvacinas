export class Caderneta {

  $key?: string;

  doses: any = {};

  constructor(public nome: string, public sexo: string, public datanascimento?: string) {
  }

}

export function cadernetaDosesTomadas(caderneta: Caderneta) {
  let dosesTomadas = Object.keys(caderneta.doses || {}).length;
  if (dosesTomadas === 0) {
    return 'Nenhuma dose tomada';
  }
  return dosesTomadas + ' doses tomadas';
}

export function idadeEmMeses(yyyymmdd: string): number {
  if (!yyyymmdd || !yyyymmdd.trim()) {
    return 9999;
  }
  let hoje = new Date();
  let dataPedida = new Date(yyyymmdd);

  let anoDiff = hoje.getFullYear() - dataPedida.getFullYear();
  let mesDiff = hoje.getMonth() - dataPedida.getMonth();
  let diaDiff = hoje.getDate() - dataPedida.getDate();

  if (mesDiff < 0 || (mesDiff === 0 && diaDiff < 0)) --anoDiff;
  if (mesDiff < 0) mesDiff += 12;
  if (diaDiff < 1) {
    --mesDiff;
  }

  if (mesDiff < 0) {
    return 0;
  }
  return mesDiff + anoDiff * 12;
}

export function mesesPorExtenso(meses: number): string {
  let prefixo = '';
  let sufixo = ' de idade';
  if (meses < 0) {
    prefixo = 'Nascerá em ';
    sufixo = '';
    meses *= -1;
  }
  if (meses === 0) {
    return 'Nascerá em menos de um mês';
  }
  if (meses >= 9999) {
    return 'Sem idade';
  }
  let age = [];

  let anoDiff = Math.floor(meses / 12);
  let mesDiff = meses % 12;

  if (anoDiff > 0) age.push(anoDiff + (anoDiff > 1 ? ' anos' : ' ano'));
  if (mesDiff > 0) age.push(mesDiff + (mesDiff > 1 ? ' meses' : ' mês'));
  if (age.length > 1) age.splice(age.length - 1, 0, ' e ');
  return prefixo + age.join('') + sufixo;
}

export function idadeEmMesesPorExtenso(yyyymmdd: string): string {
  return mesesPorExtenso(idadeEmMeses(yyyymmdd));
}
