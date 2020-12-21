import { ZModalType } from './z-modal-type';

export interface ZModalBase {
  title: string;
  description: string;
  btnCloseTitle: string;
  isDisableClose?: boolean | true;
  width?: string | 'auto';
  height?: string | 'auto';
}
