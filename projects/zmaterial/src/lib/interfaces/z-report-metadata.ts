import { ZReportConfig } from '../z-report';
import { ZReportField } from './z-report-field';
import { ZReportForm } from './z-report-form';

export interface ZReportMetadata {
  screen: string;
  reportHeader: ZReportConfig;
  fields: ZReportField[];
  form: ZReportForm;
}
