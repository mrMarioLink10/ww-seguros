export interface RefundDiagnostic {
    id: number;
    category: string;
    description: string;
    diagnostic: string;
    place: string;
    date: Date;
    files: any;
    amount: number;
    provider: string;
    claimCurrencyType: string;
    status: number;
  }