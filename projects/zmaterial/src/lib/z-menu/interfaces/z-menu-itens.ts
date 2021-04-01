export interface ZMenuItens {
  category: string;
  icon: string;
  itens: {
    label: string;
    link: string;
    icon?: string;
    disabled?: boolean;
  }[];
}
