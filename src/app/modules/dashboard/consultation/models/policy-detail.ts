export interface PolicyDetail {
  ramo: string;
  paymentCicle: string;
  currency: string;
  deductible: string;
  category: string,
  product: string;
  branch: string;
  initialDate: string;
  endDate: string;
  certificates: number;
  cantidadAsegurados: number,
  clientName: string,
  insured: Insured[];
}

export interface Insured {
  insuredId: string;
  certificates: number;
  fullName: string;
  validityDate: string;
  kinship: string;
}
