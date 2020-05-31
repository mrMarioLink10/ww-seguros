export interface Policy {
  id: string;
  clientName: string;
  product: string;
  insuredQuantity: number;
  validityDate: string;
  paymentState: string;
  totalBalance: number;
  category: string;
}

export interface PolicyFilter {
  id?: string;
  clientName?: string;
  paymentState?: string;
  initialDate?: string;
  endDate?: string;
  insuranceType?: string;
}
