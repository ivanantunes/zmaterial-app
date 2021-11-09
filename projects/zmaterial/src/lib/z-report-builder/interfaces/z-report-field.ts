export interface ZReportField {
  key: string;
  label: string;
  type: 'number' | 'string' | 'date' | 'boolean' | 'blob' | 'time' | 'dateTime';
  required: boolean;
  relation?: {
    tableName: string,
    fieldName: string,
    fieldDescription: string
  };
  order?: number;
  between?: {
    fieldName: string;
    value?: string | number | boolean;
  };
  groupable: boolean;
  checked?: boolean;
  grouped?: boolean;
}

