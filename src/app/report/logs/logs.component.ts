import { ZReportConfig, ZReportDefinition, ZReportProvider } from 'zmaterial';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
}

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent extends ZReportProvider<PeriodicElement> implements OnInit {

  public ELEMENT_DATA: PeriodicElement[] = [
    {position: '1', name: 'Hydrogen', weight: '1.0079', symbol: 'H'},
    {position: '2', name: 'Helium', weight: '4.0026', symbol: 'He'},
    {position: '3', name: 'Lithium', weight: '6.941', symbol: 'Li'},
    {position: '4', name: 'Beryllium', weight: '9.0122', symbol: 'Be'},
    {position: '5', name: 'Boron', weight: '10.811', symbol: 'B'},
    {position: '6', name: 'Carbon', weight: '12.0107', symbol: 'C'},
    {position: '7', name: 'Nitrogen', weight: '14.0067', symbol: 'N'},
    {position: '8', name: 'Oxygen', weight: '15.9994', symbol: 'O'},
    {position: '9', name: 'Fluorine', weight: '18.9984', symbol: 'F'},
    {position: '10', name: 'Neon', weight: '20.1797', symbol: 'Ne'}
  ];

  constructor() { super(); }

  ngOnInit(): void {
  }

  public getReportDefinition(): ZReportDefinition<any>[] {
    return [
      {
        key: 'position',
        header: 'Posição',
        order: 1,
        cell: (element: PeriodicElement) => {
          return element.position ;
        }
      },
      {
        key: 'name',
        header: 'Nome',
        order: 2,
        cell: (element: PeriodicElement) => {
          return element.name;
        }
      },
      {
        key: 'weight',
        header: 'Peso',
        order: 3,
        cell: (element: PeriodicElement) => {
          return element.weight;
        }
      },
      {
        key: 'symbol',
        header: 'Simbolo',
        order: 4,
        cell: (element: PeriodicElement) => {
          return element.symbol;
        }
      }
    ];
  }

  public getReportConfig(): ZReportConfig {
    return {
      title: 'IFSP - Boituva',
      img: 'assets/no-profile.jpeg',
      reportTitle: 'Relatório de Ultimo Acesso',
      filters: [
        {title: 'Usuário', value: 'Ivan Antunes'},
        {title: 'Curso', value: 'Analise e Desenvolvimento de Sistemas'},
        {title: 'Disciplina', value: 'Programação para Web'},
      ],
      actions: {
        pdf: true,
        xlsx: true,
        csv: true
      }
    };
  }

  public getReportData(): Observable<any[]> {
    return of(this.ELEMENT_DATA);
  }

}
