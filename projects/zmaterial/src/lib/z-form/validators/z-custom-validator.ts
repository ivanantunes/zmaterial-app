import { Observable, of } from 'rxjs';
import { ZFormInputSelect } from './../form-inputs/z-form-input-select';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map } from 'rxjs/operators';

export function zCfpValidator(control: AbstractControl): ValidationErrors | null {
  let cpf: string = control.value;

  if (!cpf) {
    return null;
  }

  const cpfError = {
    invalidCPF: 'invalid-cpf'
  };

  cpf = cpf.replace(/[\s.-]*/igm, '');

  if (
    !cpf ||
    cpf.length !== 11 ||
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  ) {
    return cpfError;
  }

  let soma = 0;
  let resto: number;

  for (let i = 1; i <= 9; i++) {
    soma = soma + Number(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if ((resto === 10) || (resto === 11)) { resto = 0; }
  if (resto !== Number(cpf.substring(9, 10))) { return cpfError; }

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma = soma + Number(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;

  if ((resto === 10) || (resto === 11)) { resto = 0; }
  if (resto !== Number(cpf.substring(10, 11))) { return cpfError; }

  return null;
}

export function zCnpjValidar(control: AbstractControl): ValidationErrors | null {

  const cnpj = control.value;

  if (!cnpj) {
    return null;
  }

  const strCNPJ = cnpj.replace(/[^\d]+/g, '');

  const cnpjError = {
    invalidCNPJ: 'invalid-cnpj'
  };

  if (
    strCNPJ === '00000000000000' ||
    strCNPJ === '11111111111111' ||
    strCNPJ === '22222222222222' ||
    strCNPJ === '33333333333333' ||
    strCNPJ === '44444444444444' ||
    strCNPJ === '55555555555555' ||
    strCNPJ === '66666666666666' ||
    strCNPJ === '77777777777777' ||
    strCNPJ === '88888888888888' ||
    strCNPJ === '99999999999999' ||
    strCNPJ.length !== 14
  ) {
    return cnpjError;
  }

  let tamanho = strCNPJ.length - 2;
  let numeros = strCNPJ.substring(0, tamanho);
  const digitos = strCNPJ.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  if (resultado !== Number(digitos.charAt(0))) {
    return cnpjError;
  }

  tamanho = tamanho + 1;
  numeros = strCNPJ.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let k = tamanho; k >= 1; k--) {
    soma += numeros.charAt(tamanho - k) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  if (resultado !== Number(digitos.charAt(1))) {
    return cnpjError;
  }

  return null;
}

export function zSelectValidator(input: ZFormInputSelect<any, any>): AsyncValidatorFn {

  return (control: AbstractControl): Observable<ValidationErrors | null> => {

    if (!control.value) {
      return of(null);
    }

    if (input.valueProperty && input.getSingleItem) {
      return input.getSingleItem(control.value).pipe(
        map((res) => res ? null : { invalidOption: { value: control.value } } )
      );
    }

    if (typeof control.value !== 'object') {
      return of({ invalidOption: { value: control.value } });
    }

    return of(null);

  };

}
