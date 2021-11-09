import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ZMenuProfile, ZModalService, ZMenuItems, ZTranslateService, ZMenuProvider } from 'zmaterial';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements ZMenuProvider {

  public currentProfile: ZMenuProfile = {
    descriptions: [
      {icon: 'email', text: 'example@gmail.com'},
    ]
  };

  public currentMenus: ZMenuItems[] = [
    {
      category: 'Cadastro',
      icon: 'add',
      itens: [
        { label: 'Usuário', link: 'register/user', icon: 'home' },
        { label: 'Curso', link: 'register/course' }
      ]
    },
    {
      category: 'Relatório',
      icon: 'table_chart',
      itens: [
        { label: 'Logs', link: 'report/logs' },
      ]
    },
    {
      category: 'Metadata',
      icon: 'build',
      itens: [
        { label: 'Exemplo', link: 'metadata/METADATA_EXEMPLO' }
      ]
    }
  ];

  constructor(private zModal: ZModalService) {

  }
  get menus(): Observable<ZMenuItems[]> {
    return of(this.currentMenus);
  }
  get profile(): Observable<ZMenuProfile> {
    return of(this.currentProfile);
  }

  public logout(event: boolean): void {
    console.log(event);
  }
}
