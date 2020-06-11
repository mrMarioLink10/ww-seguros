export interface PolicyDetail {
  paymentCicle: string;
  currency: string;
  deductible: string;
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
