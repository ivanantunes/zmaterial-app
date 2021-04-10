import { ZTranslateService } from './../services/z-translate.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zTranslate'
})
export class ZTranslationPipe implements PipeTransform {

  constructor(private tService: ZTranslateService) { }

  public transform(text: string, value?: any): string {
    return this.tService.t(text, value);
  }

}
