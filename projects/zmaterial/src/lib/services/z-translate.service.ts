import { Inject, Injectable } from '@angular/core';
import i18next, { TFunction } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { from, Observable, Subject } from 'rxjs';

export interface ZLanguageData {
  pt: any;
  en: any;
}

@Injectable({
  providedIn: 'root'
})

export class ZTranslateService {
  constructor(@Inject('langConfig') private configs?: ZLanguageData) {

    if (!configs) {
      throw Error('Falta Paremetos no .forRoot() do ZModule');
    }

    const pt = {
      translation: {
        ...this.configs.pt
      }
    };

    const en = {
      translation: {
        ...this.configs.en
      }
    };

    i18next.use(LanguageDetector).init({
      debug: false,
      fallbackLng: 'pt',
      detection: {
        order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
        lookupQuerystring: 'lng',
        lookupCookie: 'i18next',
        lookupLocalStorage: 'i18nextLng',
        excludeCacheFor: ['cimode'],
        htmlTag: document.documentElement
      },
      resources: {
        pt,
        en,
        'pt-BR': pt
      }
    }, (err, t) => {
      this.t = t;
    });

  }

  public t: TFunction;

  public getCurrentLanguage(): string {
    return i18next.language;
  }

  public setCurrentLanguage(lng: string): Observable<any> {
    return from(i18next.changeLanguage(lng));
  }
}
