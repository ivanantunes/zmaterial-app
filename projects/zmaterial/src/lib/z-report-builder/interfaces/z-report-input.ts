export interface ZReportInput {
  key: string;
  label: string;
  icon?: string;
  hint?: string;
  layout?: {
    cols: number;
    colSmall?: number;
  };
  inputType: 'textbox' | 'dateTime' | 'selector';
  texboxType?: 'text' | 'number' | 'email' | 'ip' | 'password' | 'CPF' | 'CNPJ' | 'CPF/CNPJ' | 'vehiclePlate';
  value?: string | number | boolean;
  required?: boolean;
  relation?: {
    tableName: string;
    fieldName: string;
    fieldDescription: string;
    secondaryField?: string;
    imageField?: string;
  };
  maxlength?: number;
  minlength?: number;
  minDate?: string;
  maxDate?: string;
  // multiple?: boolean;
}
