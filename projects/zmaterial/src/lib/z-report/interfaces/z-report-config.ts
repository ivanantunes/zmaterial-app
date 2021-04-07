export interface ZReportConfig {
  title: string;
  reportTitle: string;
  img?: string;
  filters?: {
    title: string;
    value: string;
  }[];
  actions?: {
    pdf?: boolean;
    csv?: boolean;
    xlsx?: boolean;
  };
}
