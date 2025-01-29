export interface Card {
  name: string;
  pros: string[];
  neutral: string[];
  cons: string[];
  link: string;
  buttonText?: string;
  types: string[];
  unc?: string;
  lastEditedBy?: string;
  lastEditedByImage?: string;
  warning?: boolean;
  warningText?: string;
  buylink?: string;
  buytext?: string;
  glow?: string;
  expires?: string;
  hide?: boolean;
}