import { Component } from '@angular/core';
import { ZMenuProfile, ZModalService, ZMenuItems, ZTranslateService } from 'zmaterial';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public currentProfile: ZMenuProfile = {
    descriptions: [
      {icon: 'email', text: 'ivanantnes75@gmail.com'},
    ]
  };

  public currentMenus: ZMenuItems[] = [
    {
      category: 'Cadastro',
      icon: 'add',
      itens: [
        { label: 'Usuário', link: 'register/user' },
        { label: 'Curso', link: 'register/course' }
      ]
    },
    {
      category: 'Relatório',
      icon: 'table_chart',
      itens: [
        { label: 'Logs', link: 'report/logs' }
      ]
    }
  ];

  constructor(private zModal: ZModalService) {

  }

  public logout(event: boolean): void {
    console.log(event);
  }
}
