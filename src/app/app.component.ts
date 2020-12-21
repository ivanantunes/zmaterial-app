import { Component } from '@angular/core';
import { ZModalService } from 'zcomponents';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private zModal: ZModalService) {



  }
}
