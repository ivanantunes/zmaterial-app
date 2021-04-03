import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ZFormInputBase, ZFormInputText, ZFormProvider } from 'zmaterial';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends ZFormProvider implements OnInit {

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
    ]);
  }


  public saveData(value: any): void {
    console.log('Valores: ', value);
    this.currentValue = value;
  }

}
