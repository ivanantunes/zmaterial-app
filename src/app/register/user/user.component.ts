import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { ZFormInputBase, ZFormInputText, ZFormProvider, ZFormInputSelect, ZSearchResult } from 'zmaterial';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends ZFormProvider implements OnInit {

  private itens = [{
    valor: 1,
    nome: 'Alicea'
  }, {
    valor: 2,
    nome: 'Nicholas'
  }, {
    valor: 3,
    nome: 'Derril'
  }, {
    valor: 4,
    nome: 'Doralynn'
  }, {
    valor: 5,
    nome: 'Smitty'
  }, {
    valor: 6,
    nome: 'Mart'
  }, {
    valor: 7,
    nome: 'Lenci'
  }, {
    valor: 8,
    nome: 'Gwennie'
  }, {
    valor: 9,
    nome: 'Helaina'
  }, {
    valor: 10,
    nome: 'Selie'
  }, {
    valor: 11,
    nome: 'Sibyl'
  }, {
    valor: 12,
    nome: 'Wyatan'
  }, {
    valor: 13,
    nome: 'Charley'
  }, {
    valor: 14,
    nome: 'Maddie'
  }, {
    valor: 15,
    nome: 'Hali'
  }, {
    valor: 16,
    nome: 'Elbert'
  }, {
    valor: 17,
    nome: 'Sapphire'
  }, {
    valor: 18,
    nome: 'Becca'
  }, {
    valor: 19,
    nome: 'Lillian'
  }, {
    valor: 20,
    nome: 'Ax'
  }];

  public currentValue: any = {};

  constructor() { super(); }

  ngOnInit(): void {
  }

  getInputs(): Observable<ZFormInputBase<any>[]> {
    return of([
      new ZFormInputText({
        label: 'Campo de Texto',
        key: 'text',
        type: 'text',
        required: true,
        layout: {
          cols: 50
        }
      }),
      new ZFormInputText({
        label: 'Campo de Senha',
        key: 'password',
        type: 'password',
        required: true,
        layout: {
          cols: 50
        }
      }),
      new ZFormInputText({
        label: 'Campo de E-mail',
        key: 'email',
        type: 'email',
        required: true,
        layout: {
          cols: 50
        }
      }),
      new ZFormInputText({
        label: 'Campo de IP',
        key: 'ip',
        type: 'ip',
        required: true,
        layout: {
          cols: 50
        }
      }),
      new ZFormInputText({
        label: 'Campo de CPF',
        key: 'CPF',
        type: 'CPF',
        required: true,
        layout: {
          cols: 50
        }
      }),
      new ZFormInputText({
        label: 'Campo de CNPJ',
        key: 'CNPJ',
        type: 'CNPJ',
        required: true,
        layout: {
          cols: 50
        }
      }),
      new ZFormInputText({
        label: 'Campo de CPF/CNPJ',
        key: 'CPF/CNPJ',
        type: 'CPF/CNPJ',
        required: true,
        layout: {
          cols: 50
        }
      }),
      new ZFormInputText({
        label: 'Campo de Placa',
        key: 'vehiclePlate',
        type: 'vehiclePlate',
        required: true,
        layout: {
          cols: 50
        }
      }),
      new ZFormInputSelect<string, any>({
        label: 'Selector',
        key: 'selector',
        required: true,
        maxItens: 5,
        typeWhileSerching: false,
        debounceTime: 1500,
        valueProperty: 'valor',
        getSingleItem: (value: any): Observable<any> => {
          return of(this.itens.find(i => i.valor === value));
        },
        searchItens: (value: string, numberOfItens: number): Observable<ZSearchResult<any>> => {

          const search = (value || '');

          return of(this.itens.filter(i => i.nome.includes(search))).pipe(
            switchMap((res) => {
              return of({
                totalItems: res.length,
                items: res.slice(0, numberOfItens)
              });
            }),
            delay(100)
          );
        },
        firstDisplaySelect: (element: any) => {
          if (element) {
            return element.nome;
          } else {
            return '';
          }
        },
        secondaryDisplaySelect: (element: any) => {
          if (element) {
            return element.valor;
          } else {
            return '';
          }
        }
      })
    ]);
  }


  public saveData(value: any): void {
    console.log('Valores: ', value);
    this.currentValue = value;
  }

}
