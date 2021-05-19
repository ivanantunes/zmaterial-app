import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ZTranslateService } from '../services';

export let matDateTimeIntlFactory = (tService: ZTranslateService) => {
  return tService.getDateTimeLocale();
};

export let MatDateTimeIntlProvider = {
  provide: MAT_DATE_LOCALE,
  useFactory: matDateTimeIntlFactory,
  deps: [ZTranslateService]
};
