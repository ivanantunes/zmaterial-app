import { ZReportInput } from './z-report-input';

export interface ZReportForm {
  title: string;
  subtitle?: string;
  submitText: string;
  inputs: ZReportInput[];
}
