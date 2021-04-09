export interface ZReportConfig {
  title: string;
  reportTitle: string;
  image?: {
    image: string;
    type: 'PNG' | 'JPG' | 'JPEG' | 'SVG'
  };
  filters?: {
    title: string;
    value: string;
  }[];
  actions?: {
    pdf?: boolean;
    csv?: boolean;
    xlsx?: boolean;
  };
  color?: {
    text: string;
    line: string;
    theme: 'striped'| 'grid' | 'plain' | 'css',
    header: string;
    headerText: string;
    body: string;
    bodyText: string;
    footer: string;
    footerText: string;
  };
}
