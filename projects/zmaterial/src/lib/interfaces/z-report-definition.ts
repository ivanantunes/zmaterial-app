export interface ZReportDefinition<X> {
  key: string;
  header: string;
  order: number;
  cell: (element: X) => string;
}
