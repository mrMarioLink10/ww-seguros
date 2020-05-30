export interface PolicyDetail {
  paymentCicle: string;
  currency: string;
  deductible: string;
  product: string;
  branch: string;
  initialDate: string;
  endDate: string;
  certificates: number;
  insured: Insured[];
}

export interface Insured {
  insuredId: number;
  certificates: number;
  fullName: string;
  validityDate: string;
  kinship: string;
}
