import * as xlsx from 'xlsx';
import { ZReportConfig, ZReportDefinition } from '../interfaces';

export function zXlsxGenerator(config: ZReportConfig, definition: ZReportDefinition<any>[], data: any[]): void {
  const currentDate = new Date();
  const excel = xlsx.utils.book_new();

  excel.Props = {
    Title: config.reportTitle,
    Author: config.title,
    CreatedDate: new Date()
  };

  const excelData = [[...definition.map((f) => f.header)], ...data.map((row) => definition.map((f) => row[f.key]))];

  const workSheet = xlsx.utils.aoa_to_sheet(excelData);

  xlsx.utils.book_append_sheet(excel, workSheet, config.reportTitle);

  const workAbout = xlsx.write(excel, {bookType: 'xlsx', type: 'binary'});

  const buffer = new ArrayBuffer(workAbout.length);
  const view = new Uint8Array(buffer);

  for (let i = 0; i < workAbout.length; i++) {
    // tslint:disable-next-line: no-bitwise
    view[i] = workAbout.charCodeAt(i) & 0xFF;
  }

  const blob = new Blob([view], { type: 'application/octet-stream' });

  const a = document.createElement('a');
  a.style.setProperty('display', 'none');
  document.body.appendChild(a);
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = `${config.reportTitle}_${currentDate.toLocaleString()}.xlsx`;
  a.click();
  window.URL.revokeObjectURL(url);

}
