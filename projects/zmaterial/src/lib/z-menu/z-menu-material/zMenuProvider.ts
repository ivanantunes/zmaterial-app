import { Observable } from 'rxjs';
import { ZMenuItems, ZMenuProfile } from '../interfaces';

export abstract class ZMenuProvider {

  constructor() { }

  public abstract get menus(): Observable<ZMenuItems[]>;

  public abstract get profile(): Observable<ZMenuProfile>;

}
