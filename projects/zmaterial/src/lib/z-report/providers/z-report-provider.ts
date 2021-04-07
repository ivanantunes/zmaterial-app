import { Observable } from 'rxjs';
import { ZReportConfig, ZReportDefinition } from '../interfaces';

export abstract class ZReportProvider<X> {

  public abstract getReportDefinition(): ZReportDefinition<X>[];

  public abstract getReportConfig(): ZReportConfig;

  public abstract getReportData(): Observable<X[]>;

}
