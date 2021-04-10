import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ZReportConfig, ZReportDefinition } from '../interfaces';

function pdfHeaderGenerator(author: string, title: string): any {
  return [
    [
      {
        content: author,
        colSpan: 1,
        styles: {
          fontStyle: 'bold',
          fontSize: 18,
          font: 'times',
          valign: 'middle',
          halign: 'left'
        }
      }
    ],
    [
      {
        content: title,
        colSpan: 1,
        styles: {
          fontStyle: 'normal',
          fontSize: 14,
          font: 'times',
          valign: 'middle',
          halign: 'left'
        }
      }
    ],
  ];
}

function pdfSectionGenerator(title: string, color?: { text: string, line: string }): any {
  return [
    [{
      content: title,
      colSpan: 1,
      styles: {
        fontStyle: 'bold',
        fontSize: 12,
        font: 'times',
        textColor: color ? color.text : '000000',
        valign: 'middle',
        halign: 'left',
        margin: 0,
        cellHeight: 0,
        cellPadding: {
          top: 0,
          right: 0,
          bottom: 1,
          left: 0
        }
      }
    }],
    [{
      content: ' ',
      colSpan: 1,
      styles: {
        fontStyle: 'bold',
        fontSize: 4,
        font: 'times',
        fillColor: color ? color.line : '000000',
        valign: 'middle',
        halign: 'left',
        margin: 2,
        cellHeight: 0,
        cellPadding: 0
      }
    }]
  ];
}

function pdfTableStyle(config: ZReportConfig): any {
  return {
    theme: config.color ? config.color.theme : 'striped',
    headStyles: {
      fontSize: 11,
      fontStyle: 'bold',
      font: 'times',
      fillColor: config.color ? config.color.header : '000000',
      textColor: config.color ? config.color.headerText : 'ffffff',
      halign: 'center',
      valign: 'middle'
    },
    bodyStyles: {
      fontSize: 9,
      fontStyle: 'bold',
      fillColor: config.color ? config.color.body : 'ffffff',
      textColor: config.color ? config.color.bodyText : '000000',
      font: 'times',
      halign: 'center',
      valign: 'middle'
    },
    footStyles: {
      fontSize: 11,
      fontStyle: 'bold',
      font: 'times',
      fillColor: config.color ? config.color.footer : '000000',
      textColor: config.color ? config.color.footerText : 'ffffff',
    },
  };
}

function pdfCreatedAndTotalRows(date: Date, totalItems: number): any {
  return [
    [
      {
        content: 'Criado em',
        colSpan: 1,
        styles: {
          fontStyle: 'bold',
          fontSize: 10,
          font: 'times',
          valign: 'middle',
          halign: 'left'
        }
      },
      {
        content: 'Total de Registros',
        colSpan: 1,
        styles: {
          fontStyle: 'bold',
          fontSize: 10,
          font: 'times',
          valign: 'middle',
          halign: 'left'
        }
      }
    ],
    [
      {
        content: `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`,
        colSpan: 1,
        styles: {
          fontStyle: 'bold',
          fontSize: 8,
          font: 'times',
          valign: 'middle',
          halign: 'left'
        }
      },
      {
        content: totalItems,
        colSpan: 1,
        styles: {
          fontStyle: 'bold',
          fontSize: 8,
          font: 'manrope',
          valign: 'middle',
          halign: 'left'
        }
      }
    ]
  ];
}

export function zPdfGenerator(config: ZReportConfig, definition: ZReportDefinition<any>[], data: any[]): void {

  // TODO: Talvez precise colocar os filtros no pdf

  const documentPdf = new jsPDF.jsPDF('landscape');
  const pageWidth = documentPdf.internal.pageSize.width;
  const pageHeight = documentPdf.internal.pageSize.height;
  const currentDate = new Date();


  // ? Set Config PDF

  documentPdf.setProperties({
    title: config.reportTitle,
    author: config.title,
    creator: new Date().toLocaleString()
  });

  // ? Set Header PDF

  (documentPdf as any).autoTable({
    theme: 'plain',
    bodyStyles: {
      halign: 'left',
      valign: 'middle',
      cellHeight: 0,
      cellPadding: 0
    },
    body: pdfHeaderGenerator(config.title, config.reportTitle)
  });

  // ? PDF Logo

  if (config.image) {

    documentPdf.addImage(config.image.image, config.image.type, pageWidth - 31, 14, 16, 16);

  }

  // ? PDF Section Analysis

  (documentPdf as any).autoTable({
    theme: 'plain',
    bodyStyles: {
      halign: 'left',
      valign: 'middle'
    },
    body: pdfSectionGenerator('Análises')
  });

  // ? PDF Analysis

  (documentPdf as any).autoTable({
    theme: 'plain',
    tableWidth: 'wrap',
    margin: 0,
    bodyStyles: {
      halign: 'left',
      valign: 'middle',
      cellHeight: 0,
      cellPadding: {
        top: 0,
        right: 6,
        bottom: 0,
        left: 0
      }
    },
    body: pdfCreatedAndTotalRows(currentDate, data.length)
  });

  // ? PDF Section Results
  (documentPdf as any).autoTable({
    theme: 'plain',
    bodyStyles: {
      halign: 'left',
      valign: 'middle'
    },
    body: pdfSectionGenerator('Resultados')
  });

  // ? PDF Table

  (documentPdf as any).autoTable({
    ...pdfTableStyle(config),
    valign: 'middle',
    head: [[...definition.map((f) => f.header)]],
    body: [...data.map((rows) => definition.map((f) => rows[f.key]))]
  });

  // ? Count Page PDF

  const pageCount = (documentPdf as any).internal.getNumberOfPages();

  // ? Define PDF Page Number

  for (let j = 1; j <= pageCount; j++) {

    documentPdf.setPage(j);
    documentPdf.setFontSize(8);
    documentPdf.setFont('times', 'bold');
    documentPdf.setTextColor(config.color ? config.color.text : '000000');
    documentPdf.text(`Pág ${String(j)} de ${String(pageCount)}`, pageWidth - 14, pageHeight - 10, { align: 'right' });

  }

  // ? Open Preview in new window
  // documentPdf.output('dataurlnewwindow');

  // ? Save PDF

  documentPdf.save(
    `${config.reportTitle}_${currentDate.toLocaleString()}.pdf`.replace(/\//g, '_')
  );
}
