export interface Bill {
  policyId: number;
  billId: number;
  clientName: string;
  paymentState: string;
  totalBalance: number;
  expirationDate: string;
  creationDate: string;
}

export interface BillFilter {
  policyId?: string;
  billId?: string;
  clientName?: string;
  paymentState?: string;
  initialDate?: string;
  endDate?: string;
}
