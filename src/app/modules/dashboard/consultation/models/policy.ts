export interface Policy {
  id: number;
  clientName: string;
  product: string;
  insuredQuantity: number;
  validityDate: string;
  paymentState: string;
  totalBalance: number;
}

export interface PolicyFilter {
  id?: number;
  clientName?: string;
  paymentState?: string;
  initialDate?: string;
  endDate?: string;
  insuranceType?: string;
}
