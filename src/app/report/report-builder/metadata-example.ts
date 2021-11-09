import { ZReportMetadata } from 'zmaterial';

export const MetadataExemplo: ZReportMetadata = {
  screen: 'METADATA_EXEMPLO',
  reportHeader: {
    reportTitle: 'Exemplo de Relatorio por Metadata',
    title: 'Exemplo',
    filters: [],
    actions: {
      pdf: true,
      xlsx: true,
      csv: true
    }
  },
  fields: [
    {
      key: 'position',
      label: 'Posição',
      required: true,
      type: 'string',
      order: 1,
      groupable: true,
    },
    {
      key: 'name',
      label: 'Nome',
      required: true,
      type: 'string',
      order: 2,
      groupable: true,

    },
    {
      key: 'weight',
      label: 'Peso',
      required: true,
      type: 'string',
      order: 3,
      groupable: true,

    },
    {
      key: 'symbol',
      label: 'Simbulo',
      required: true,
      type: 'string',
      order: 4,
      groupable: true,

    }
  ],
  form: {
    title: 'Filtro do Relatorio',
    submitText: 'Filtrar',
    inputs: [
      {
        key: 'position_example',
        inputType: 'selector',
        label: 'Posição',
        required: false,
        relation: {
          fieldName: 'position',
          fieldDescription: 'name',
          tableName: 'table',
        }
      }
    ]
  }
};
